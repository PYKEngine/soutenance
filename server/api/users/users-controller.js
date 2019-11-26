const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const { generateJWT } = require("../../services/auth-service")
const User = require("../../models/Users")
const { validationResult } = require('express-validator')
const { sendEmail } = require("../../services/mailer")

const index = (req, res) => {
  return res.status(200).json({ message: 'Users controller' });
}

const registerUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists' }] })
    }
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })
    user = new User({
      name,
      email,
      avatar,
      password
    });
    const mailToAdmin = {
      to: "admin@pykengine.dev",
      subject: "New user registered",
      body: `<p>New user registered</p>
      <ul>
        <li>Name: ${user.name}</li>
        <li>Name: ${user.email}</li>
      </ul>`
    }
    const mailToUser = {
      to: user.email,
      subject: "Welcome on PYKEngine",
      body: `Bid you welcome`
    }
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    const token = generateJWT(user)
    sendEmail(mailToUser)
    sendEmail(mailToAdmin)
    return res.status(200).json({ token: token })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = { index, registerUser } 