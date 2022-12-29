const User = require('../models/user')
const Crypto25 = require('crypto-js')
const jsonweboken = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { password } = req.body
  try {
    req.body.password = Crypto25.AES.encrypt(
      password,
      password.env.PASSWORD_SECRET_KEY
    )

    const user = await User.create(req.body)
    const token = jsonweboken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    )
    res.status(200).json({ user, token })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.login = async (req, res) => {
  const { Username, password } = req.body
}