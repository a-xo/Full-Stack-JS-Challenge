const { userService } = require('../services/user.service')

const { getUser } = userService


const userController = async (req, res, next) => {
  const user = req.body
  try {
    await getUser(user)
    res.sendStatus(200)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

module.exports = {
  userController
}