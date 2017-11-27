import express from 'express'
import uuidv4 from 'uuid/v4'

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: >
 *     All about /users
 */
const router = express.Router()
/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required: [ name ]
 *     properties:
 *       name: { type: string }
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required: id
 *       - properties:
 *           id: { type: string, format: uuid }
 */
const users = [
  {
    id: uuidv4(),
    name: `John Jacob Jingleheimer-Schmidt`
  }
]

/**
 * @swagger
 * /api/users:
 *   post:
 *     description: Create a new user
 *     tags: [ Users ]
 *     produces: application/json
 *     parameters:
 *       - name: NewUser
 *         in: body
 *         required: true
 *         type: object
 *         schema: { $ref: '#/definitions/NewUser' }
 *     responses:
 *       200:
 *         schema: { type: object, $ref: '#/definitions/NewUser' }
 */
router.post('/', (req, res) => {
  let newUser = {
    ...req.body,
    id: uuidv4()
  }
  users.push(newUser)
  res.status(200).send(newUser)
})

router.route('/:id')
  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     tags: [ Users ]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         schema: { $ref: '#/definitions/User' }
   */
  .get((req, res) => {
    res.send(users.find(user => user.id === req.params.id))
  })
  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     tags: [ Users ]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       204:
   *         description: The user has been updated
   */
  .put((req, res) => {
    let origUser = users.find(user => user.id === req.params.id)
    Object.assign(origUser, req.body, { id: origUser.id })
    res.status(204).end()
  })

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     description: Retrieve all users
 *     tags: [ Users ]
 *     produces: application/json
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items: { $ref: '#/definitions/User' }
 */
router.get('/all', (req, res) => {
  res.send(users)
})

export default router
