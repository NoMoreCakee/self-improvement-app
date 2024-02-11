const express = require('express')
const session = require('express-session')
const store = new session.MemoryStore()
const dotenv = require('dotenv')
const cors = require('cors')
const {
  getUsers,
  getUser,
  createUser,
  getHabits,
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

app.post('/login', (req, res) => {
  console.log(req.sessionID)
  console.log(req.body)
  const { username, password } = req.body
  if (username && password) {
    if (req.session.authenticated) {
      res.json(res.session)
      console.log('already authenticated')
    } else {
      if (password === 'pass') {
        req.session.authenticated = true
        req.session.user = {
          username,
          password,
        }
        console.log('Authenticated')
        res.send(req.session)
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
