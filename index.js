const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const app = express()

const dbPath = path.join(__dirname, 'goodreads.db')
let db = null
const intilizeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
intilizeDBAndServer()
app.get('/books/', async (request, response) => {
  const getbooksQuery = `SELECT * FROM book ORDER BY book_id`
  const bookArray = await db.all(getbooksQuery)
  response.send(bookArray)
})
