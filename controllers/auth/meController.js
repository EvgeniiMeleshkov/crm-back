import User from '../../models/User.js'
import { ok, userNotFound } from '../../utils/responseFactory.js'

export default async function me (req, res) {

  const user = await User.findById(req.userId)
  
  if (!user) return userNotFound(res)

  const { ...userData } = user._doc
  ok(userData)(res)
}
