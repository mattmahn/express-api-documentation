import express from 'express'
import uuidv4 from 'uuid/v4'

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: >
 *     All about /books
 */
const router = express.Router()
/**
 * @swagger
 * definitions:
 *   NewBook:
 *     type: object
 *     required: [ author, title, published ]
 *     properties:
 *       author: { type: string }
 *       title: { type: string }
 *       published: { type: integer }
 *   Book:
 *     allOf:
 *       - $ref: '#/definitions/NewBook'
 *       - required: [ id ]
 *       - properties:
 *           id: { type: string, format: uuid }
 */
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

/**
 * @swagger
 * /api/books:
 *   post:
 *     description: Create a new book
 *     tags: [ Books ]
 *     parameters:
 *       - name: New book object
 *         description: New book object
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/NewBook'
 *     responses:
 *       201:
 *         description: >
 *           A new book has been created and can be retrieved at the URL
 *           in the Location header
 *         headers:
 *           Location:
 *              description: URL of the created book
 *              type: string
 */
router.post('/', (req, res) => {
  let newBook = {
    ...req.body,
    id: uuidv4()
  }
  books.push(newBook)
  res.location(`${req.baseUrl}/${newBook.id}`).status(201).end()
})

/**
 * @swagger
 * /api/books/all:
 *   get:
 *     description: Retrieve all books
 *     tags: [ Books ]
 *     produces: application/json
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items: { $ref: '#/definitions/Book' }
 */
router.get('/all', (req, res) => {
  res.send(books)
})

router.route('/:id')
  /**
   * @swagger
   * /api/books/{id}:
   *   get:
   *     description: Return the specified book
   *     tags: [ Books ]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: the ID of the book
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         schema:
   *           $ref: '#/definitions/Book'
   */
  .get((req, res) => {
    res.send(books.find(book => book.id === req.params.id))
  })
  /**
   * @swagger
   * /api/books/{id}:
   *   put:
   *     description: Update the specified book
   *     tags: [ Books ]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: the ID of the book
   *         schema: { type: string }
   *     responses:
   *       204:
   *         description: >
   *           The book has been updated.
   */
  .put((req, res) => {
    let origBook = books.find(book => book.id === req.params.id)
    Object.assign(origBook, req.body, { id: origBook.id })
    res.status(204).end()
  })

export default router
