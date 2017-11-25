import express from 'express'
import uuidv4 from 'uuid/v4'

const router = express.Router()
/**
 * @swagger
 * definitions:
 *   book:
 *     type: object
 *     required: [ id, title, author, published ]
 *     properties:
 *       title: { type: string }
 *       author: { type: string }
 *       published: { type: integer }
 *       id: { type: string }
 *   newBook:
 *     type: object
 *       required: [ title, author, published ]
 *       properties:
 *         title: { type: string }
 *         author: { type: string }
 *         published: { type: integer }
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
 * /api/books/:
 *   post:
 *     description: Create a new book
 *     responses:
 *       201:
 *         description: |
 *           A new book has been created and can be retrieved at the URL
 *           in the Location header
 *         parameters:
 *           - name: book
 *             description: Book object
 *             required: true
 *             in: body
 *             type: object
 *             schema: { $ref: '#/definitions/newBook' }
 *         headers:
 *           Location:
 *              description: URL of the created book
 *              schema: { type: string }
 */
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
  /**
   * @swagger
   * /api/books/{id}:
   *   parameters:
   *     - name: id
   *       in: path
   *       required: true
   *       description: the ID of the book
   *       schema: { type: string }
   *   get:
   *     description: Return the specified book
   *     responses:
   *       200:
   *         schema:
   *           $ref: '#/definitions/book'
   */
  .get((req, res) => {
    res.send(books.find(book => book.id === req.params.id))
  })
  .put((req, res) => {
    let origBook = books.find(book => book.id === req.params.id)
    Object.assign(origBook, req.body, { id: origBook.id })
    res.status(204).end()
  })

export default router
