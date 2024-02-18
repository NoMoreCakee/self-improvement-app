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

async function getUserByName(user_name) {
  const [rows] = await pool.query(
    `
  SELECT *
  FROM users
  WHERE username = ?
  `,
    [user_name],
  )
  return rows[0]
}

async function createUser(username, email, pass_hash) {
  const result = await pool.query(
    `
    INSERT INTO users (username, pass_hash, email)
    VALUES (?, ?, ?)
  `,
    [username, email, pass_hash],
  )
  result.success = true
  return result
}

async function getHabits(user_id) {
  const [rows] = await pool.query('SELECT * FROM habits WHERE user_id = ?', [
    user_id,
  ])
  console.log(rows)
  return rows
}

async function addHabit(user_id, name, repetition, time, days, points) {
  const [
    result,
  ] = await pool.query(
    `INSERT INTO habits (user_id, habit_name, habit_frequency, habit_days, habit_time, point_value) VALUES (?,?,?,?,?,?)`,
    [user_id, name, repetition, days, time, points],
  )
  result.success = true
  return result
}

async function deleteHabit(habit_id) {
  const result = await pool.query('DELETE FROM habits WHERE habit_id = ?', [
    habit_id,
  ])
  return result
}

module.exports = {
  getUsers,
  getUser,
  getUserByName,
  createUser,
  getHabits,
  addHabit,
  deleteHabit,
}
