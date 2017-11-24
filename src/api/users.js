import express from 'express'
import uuidv4 from 'uuid/v4'

const router = express.Router()
const users = [
  {
    id: uuidv4(),
    name: `John Jacob Jingleheimer-Schmidt`
  }
]

router.post('/', (req, res) => {
  let newUser = {
    ...req.body,
    id: uuidv4()
  }
  users.push(newUser)
  res.status(200).send(newUser)
})

router.route('/:id')
  .get((req, res) => {
    res.send(users.find(user => user.id === req.params.id))
  })
  .put((req, res) => {
    let origUser = users.find(user => user.id === req.params.id)
    Object.assign(origUser, req.body, { id: origUser.id })
    res.status(204).end()
  })

router.get('/all', (req, res) => {
  res.send(users)
})

export default router;
