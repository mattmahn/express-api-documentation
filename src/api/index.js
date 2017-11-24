import express from 'express'

import books from './books'
import users from './users'

const router = express.Router()

router.use('/books', books)
router.use('/users', users)

export default router;
