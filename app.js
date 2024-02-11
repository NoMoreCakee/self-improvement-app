const express = require('express')
const dotenv = require('dotenv')
const {
  getUsers,
  getUser,
  createUser,
} = require('./modules/database-connection.js')

dotenv.config()

const app = express()
const port = process.env.LISTENING_PORT || 3000
app.use(express.json())

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
