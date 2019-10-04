const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// app.use(express.json())

app.get('/error', (req, res, next) => {
  res.json({ msg: 'hit me baby' })
})

app.use(notFound)
app.use(errorHandler)

function notFound(request, response, next) {
  response.status(403).send('403: access denied.');
  return;
}

function errorHandler(err, request, response, next) {
  console.error('ERROR', err.message);
  const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined;
  response.status(500).send({ error: err.message, stack, url: request.originalUrl });
}

app.listen(port, () => console.log(`Server running on port: ${port}`))