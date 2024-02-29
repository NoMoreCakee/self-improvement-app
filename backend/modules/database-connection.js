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
  if (rows.length > 0) {
    rows[0].habit_time =
      rows[0].habit_time.split(':')[0] + ':' + rows[0].habit_time.split(':')[1]
  }
  return rows
}

async function getHabit(habit_id) {
  const [rows] = await pool.query('SELECT * FROM habits WHERE habit_id = ?', [
    habit_id,
  ])
  // if (rows.length > 0) {
  //   rows[0].habit_time =
  //     rows[0].habit_time.split(':')[0] + ':' + rows[0].habit_time.split(':')[1]
  // }
  return rows
}

async function addHabit(user_id, name, repetition, time, days, points) {
  const result = await pool.query(
    `
    INSERT INTO habits (user_id, habit_name, habit_frequency, habit_time, habit_days, point_value)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [user_id, name, repetition, time, days, points],
  )
  result.success = true

  return result
}

async function deleteHabit(id) {
  const result = await pool.query('DELETE FROM habits WHERE habit_id = ?', [id])
  return result
}

async function doneHabit(id, user_id) {
  const result = await pool.query(
    'UPDATE habits SET last_appeared = ? WHERE habit_id = ?',
    [new Date(), id],
  )
  await updatePoints(user_id, id)
  return result
}

async function updatePoints(user_id, habit_id) {
  const habit = await getHabit(habit_id)
  const points = await getUser(user_id)
  const new_points = points.points + habit[0].point_value
  console.log(new_points)
  const result = await pool.query('UPDATE users SET points = ? WHERE id = ?', [
    new_points,
    user_id,
  ])
  const result2 = await pool.query(
    'UPDATE habits SET last_appeared = ? WHERE habit_id = ?',
    [new Date(), habit_id],
  )
  console.log('added')
  return result
}

async function getGoals(user_id) {
  const result = await pool.query('SELECT * FROM goals WHERE user_id = ?', [
    user_id,
  ])
  return result
}

module.exports = {
  getUsers,
  getUser,
  getUserByName,
  createUser,
  getHabits,
  deleteHabit,
  addHabit,
  doneHabit,
  getGoals,
}
