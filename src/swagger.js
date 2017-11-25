import express from 'express'
import path from 'path'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

import npmMeta from '../package.json'

const router = express.Router()

const swaggerSpec = swaggerJsDoc({
  swaggerDefinition: {
    info: {
      title: 'Library',  // required
      description: 'Example documentation of Express API',
      version: npmMeta.version,  // required
      license: {
        name: 'Unlicense',
        url: 'http://unlicense.org/UNLICENSE'
      }
    }
  },
  apis: [ `./api/*` ]
})

/**
 * @swagger
 * /api/swagger/spec.json:
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
 * /api/swagger/docs:
 *   get:
 *     description: Renders the Swagger UI for this API
 *     produces: text/html
 *     responses:
 *     200:
 *       description: Yay!
 */
router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default router;
