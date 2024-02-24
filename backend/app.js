const express = require('express')
const session = require('express-session')
const store = new session.MemoryStore()
const dotenv = require('dotenv')
const cors = require('cors')
const {
  getUsers,
  getUser,
  getUserByName,
  createUser,
  getHabits,
  deleteHabit,
  addHabit,
  doneHabit,
} = require('./modules/database-connection.js')

dotenv.config()

const app = express()
const port = process.env.LISTENING_PORT || 3000
app.use(
  session({
    resave: false,
    secret: 'some secret',
    cookie: {
      maxAge: 30000,
    },
    saveUninitialized: false,
    store: store,
  }),
)
app.use(cors())
app.use(express.json())

app.post('/login', async (req, res) => {
  console.log(req.sessionID)
  console.log(req.body)
  const { username, hashedPass } = req.body
  if (username && hashedPass) {
    if (req.session.authenticated) {
      res.json(res.session)
      console.log('already authenticated')
    } else {
      const user_data = await getUserByName(username)
      console.log(user_data)
      if (hashedPass === user_data?.pass_hash) {
        req.session.authenticated = true
        req.session.user = {
          username: username,
          id: user_data.id,
          points: user_data.points,
        }
        console.log('Authenticated')
        res.status(201).send(req.session)
      } else {
        console.log('Bad credentials')
        res.status(403).json({ msg: 'Bad Credentials' })
      }
    }
  } else {
    console.log('Bad credentials')
    res.status(403).json({ msg: 'Bad Credentials' })
  }
})

app.post('/register', async (req, res) => {
  console.log(req.body)
  const { username, hashedPass, email } = req.body
  if (username && hashedPass && email) {
    if (req.session.authenticated) {
      res.json(res.session)
    } else {
      const response = await createUser(username, hashedPass, email)
      if (response.success) {
        res.send('Ok')
      } else {
        res.status(503).send('Server-side error!')
      }
    }
  } else {
    res.status(300).send('idk man')
  }
})

app.get('/users', async (req, res) => {
  const users = await getUsers()
  res.send(users)
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id
  const user = await getUser(id)
  res.send(user)
})

app.post('/users', async (req, res) => {
  const { user, email, hash } = req.body
  const note = await createUser(user, email, hash)
  res.status(201).send(note)
})

app.post('/habits', async (req, res) => {
  const { user_id } = req.body
  const habits = await getHabits(user_id)
  res.send(habits)
})

app.post('/addHabit', async (req, res) => {
  console.log(req.body)
  const {
    user_id,
    habit_name,
    habit_frequency,
    habit_time,
    habit_days,
    point_value,
  } = req.body
  const habits = await addHabit(
    user_id,
    habit_name,
    habit_frequency,
    habit_time,
    habit_days,
    point_value,
  )
  res.send(habits)
})

app.post('/deleteHabit', async (req, res) => {
  const { habit_id } = req.body
  const habits = await deleteHabit(habit_id)
  res.send('ok')
})

app.post('/doneHabit', async (req, res) => {
  const { habit_id, user_id } = req.body
  const habits = await doneHabit(habit_id, user_id)
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
