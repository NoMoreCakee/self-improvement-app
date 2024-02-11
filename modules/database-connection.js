const mysql = require('mysql2')
require('dotenv').config({ path: __dirname + '/./../.env' })

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise()

console.log(process.env.MYSQL_HOST)

async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM users')
  return rows
}

async function getUser(id) {
  const [rows] = await pool.query(
    `
  SELECT *
  FROM users
  WHERE id = ?
  `,
    [id],
  )
  return rows[0]
}

async function createUser(username, email, pass_hash) {
  const result = await pool.query(
    `
    INSERT INTO users (username, email, pass_hash)
    VALUES (?, ?, ?)
  `,
    [username, email, pass_hash],
  )
  return result
}

async function getHabits(user_id) {
  const [rows] = await pool.query('SELECT * FROM habits WHERE user_id = ?', [
    user_id,
  ])
  return rows
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  getHabits,
}
