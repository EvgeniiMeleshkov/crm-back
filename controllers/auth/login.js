import { ok, userNotFound, badRequest } from '../../utils/responseFactory.js'
import User from '../../models/User.js'
import { sign, verify } from '../../utils/crypto.js'

export default async function loginController (req, res) {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return userNotFound(res)
  const token = sign({ email: user.email })

  // const {secret} = verify(token)

  // if (user._doc.secret !== secret) {return badRequest('На ваш ящик отправлено письмо с токеном')(res)}

  return ok(token)(res)
}
