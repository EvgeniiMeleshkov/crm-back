import User from '../../models/User.js'
import { genSaltAndHash } from '../../utils/crypto.js'
import { ok, fail } from '../../utils/responseFactory.js'

export default async function passUpdateController (req, res) {
  try {
    const { password } = req.body
    const hash = genSaltAndHash(password)
    await User.findByIdAndUpdate({ _id: req.userId }, { password: hash })
    ok('success')(res)
  } catch (err) {
    fail('Неудалось изменить пароль')(res)
  }
}
