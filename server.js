const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// don't need bodyParser middleware any more
app.use(express.json())

app.get('/error', async (req, res, next) => {
  const promise = new Promise((resolve, reject)=> {
    setTimeout(function () {
      const error = new Error('aw shucks')
      reject(error)
    }, 500)
  })

  try {
    const result = await promise
    res.json({ msg: 'hit me baby', result: result })
  } catch (error) {
    error.message = 'something else'
    next(error)
  }
  
})

app.post('/post', (req, res, next) => {
  const body = req.body
  res.json({ msg: 'response sent', body })
})

app.use(notFound)
app.use(errorHandler)

function notFound(request, response, next) {
  response.status(403).send('403: access denied.')
}

function errorHandler(err, request, response, next) {
  console.error('ERROR', err.message)
  const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined
  response.status(500).send({ error: err.message, stack, url: request.originalUrl })
}

app.listen(port, () => console.log(`Server running on port: ${port}`))


// Making change to test rebase