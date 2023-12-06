const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = 3000
const jsonFormat = (tokens, req, res) => {
  req.headers['x-request-id'] = uuidv4().replace(/-/g, '')
  return JSON.stringify({
    req: {
      access_time: tokens.date(req, res, 'iso'),
      remote_addr: tokens['remote-addr'](req, res),
      method: tokens.method(req, res),
      http_version: tokens['http-version'](req, res),
      user_agent: tokens['user-agent'](req, res),
      request_url: tokens.url(req, res),
    },
    res: {
      response_code: tokens.status(req, res),
      duration: tokens['response-time'](req, res),
    },
    message: `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens['response-time'](
      req,
      res
    )} ms`,
    level: 'http',
    '@timestamp': tokens.date(req, res, 'iso'),
    'x-request-id': req.headers['x-request-id'] || '',
  })
}

const logger = morgan(jsonFormat, {
  skip: function (req) {
    const userAgent = req.headers['user-agent'] || ''
    return userAgent.includes('kube-probe')
  },
})

app.prepare().then(() => {
  createServer((req, res) => {
    logger(req, res, () => {})
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    if (pathname === '/') {
      app.render(req, res, '/', query)
    } else {
      handle(req, res, parsedUrl)
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
})
