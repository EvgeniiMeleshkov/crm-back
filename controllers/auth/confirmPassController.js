import { ok, userNotFound, unAuthorized } from '../../utils/responseFactory.js'
import { verify } from '../../utils/crypto.js'
import User from '../../models/User.js'

export default async function confirmPass (req, res) {
  const token = req.query
  if (!token) return unAuthorized(res)

  const email = verify(token)
  const userId = await User.findOne({ email }).select(['_id'])
  if (!userId) return userNotFound(res)

  req.userId = userId

  ok(userId)(res)
}
