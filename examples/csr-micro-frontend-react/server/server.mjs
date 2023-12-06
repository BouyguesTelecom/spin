import path from 'node:path'

import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

const PORT = process.env.PORT ?? 80

const buildPath = path.resolve(path.resolve(), '../dist')

const server = express()

server.use(cors({ origin: '*' }))
server.use(morgan('dev'))
server.use('/', express.static(buildPath))

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
