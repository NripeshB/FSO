const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
  req.token = authorization.substring(7)
} else {
  req.token = null
}

  next()
}

const userExtractor = (req, res, next) => {
  try {
    if (!req.token) {
      return res.status(401).json({ error: 'token missing' })
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    req.user = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' })
  }
}

module.exports = { tokenExtractor, userExtractor }
