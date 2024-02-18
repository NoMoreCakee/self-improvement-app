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
  addHabit,
  deleteHabit,
} = require('./modules/database-connection.js')

dotenv.config()

const app = express()
const port = process.env.LISTENING_PORT || 3000
app.use(
  session({
    secret: 'some secret',
    cookie: {
      maxAge: 30000,
    },
    saveUninitialized: false,
  }),
)
app.use(cors())
app.use(express.json())

app.post('/login', async (req, res) => {
  const { username, hashedPass } = req.body
  if (username && hashedPass) {
    const user_data = await getUserByName(username)
    console.log(user_data)
    if (user_data && hashedPass === user_data.pass_hash) {
      // Initialize the session with authenticated and user properties
      req.session.user = {
        authenticated: true,
        username: username,
        id: user_data.id,
      }
      console.log('Authenticated')
      console.log(req.session)
      res.status(201).send(req.session)
    } else {
      console.log('Bad credentials')
      res.status(403).json({ msg: 'Bad Credentials' })
    }
  } else {
    console.log('Bad credentials')
    res.status(403).json({ msg: 'Bad Credentials' })
  }
})

// Define checkAuthorization middleware
function checkAuthorization(req, res, next) {
  console.log(req.session)
  if (req.session.user && req.body.user_id) {
    if (req.session.user.id !== req.body.user_id) {
      console.log('Unauthorized:', req.session.authenticated)
      return res.status(403).json({ msg: 'Unauthorized' })
    }
  }
  next()
}

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

app.post('/addHabit', checkAuthorization, async (req, res) => {
  console.log(req.body)
  const { user_id, name, repetition, time, days, points } = req.body
  if (name && repetition && time && points) {
    const result = await addHabit(user_id, name, repetition, time, days, points)
    res.status(200).send(result)
  } else {
    res.status(300)
  }
})

app.post('/deleteHabit', async (req, res) => {
  const { habit_id } = req.body
  if (habit_id) {
    const result = await deleteHabit(habit_id)
    res.status(200).send(result)
  } else {
    res.status(403)
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

app.post('/habits', checkAuthorization, async (req, res) => {
  const { user_id } = req.body
  console.log(req.body)
  const habits = await getHabits(user_id)
  res.send(habits)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
