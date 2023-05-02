import { verify } from './crypto.js'
import User from '../models/User.js'
import { unAuthorized } from './responseFactory.js'

export default async (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const { email } = verify(token)

      const { admin, customer, _id } = await User.findOne({ email })
      req.userId = _id
      req.admin = admin
      req.customer = customer

      next()
    } catch (err) {
      return unAuthorized(res)
    }
  } else {
    return unAuthorized(res)
  }
}
