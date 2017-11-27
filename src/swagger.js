import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

import npmMeta from '../package.json'

const router = express.Router()

const swaggerSpec = swaggerJsDoc({
  swaggerDefinition: {
    info: {
      title: 'Library', // required
      description: 'Example documentation of Express API',
      version: npmMeta.version, // required
      license: {
        name: 'Unlicense',
        url: 'http://unlicense.org/UNLICENSE'
      }
    }
  },
  apis: [ // relative to Node start, not this file
    './src/**/*.js'
  ]
})

/**
 * @swagger
 * /swagger/spec.json:
 *   get:
 *     description: Returns the Swagger specification for this API
 *     produces: application/json
 *     responses:
 *       200:
 *         description: idunno
 */
router.get('/spec.json', (req, res) => {
  res.send(swaggerSpec)
})

/**
 * @swagger
 * /swagger/docs:
 *   get:
 *     description: Renders this Swagger UI for this API
 *     produces: text/html
 */
router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default router
