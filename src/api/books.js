import express from 'express'
import uuidv4 from 'uuid/v4'

const router = express.Router()
const books = [
  {
    id: uuidv4(),
    title: `Ender's Game`,
    author: `Orson Scott Card`,
    published: 1985
  },
  {
    id: uuidv4(),
    title: `Ancillary Justice`,
    author: `Ann Leckie`,
    published: 2013
  },
  {
    id: uuidv4(),
    title: `Ancillary Sword`,
    author: `Ann Leckie`,
    published: 2014
  },
  {
    id: uuidv4(),
    title: `Ancillary Mercy`,
    author: `Ann Leckie`,
    published: 2015
  },
  {
    id: uuidv4(),
    title: `Ready Player One`,
    author: `Ernest Cline`,
    published: 2011
  }
]

router.post('/', (req, res) => {
  let newBook = {
    ...req.body,
    id: uuidv4()
  }
  books.push(newBook)
  res.location(`${req.baseUrl}/${newBook.id}`).status(201).end()
})

router.get('/all', (req, res) => {
  res.send(books)
})

router.route('/:id')
  .get((req, res) => {
    res.send(books.find(book => book.id === req.params.id))
  })
  .put((req, res) => {
    let origBook = books.find(book => book.id === req.params.id)
    Object.assign(origBook, req.body, { id: origBook.id })
    res.status(204).end()
  })

export default router
