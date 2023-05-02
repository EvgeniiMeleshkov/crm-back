import { badRequest, ok } from '../../utils/responseFactory.js'
import { validationResult } from 'express-validator'
import User from '../../models/User.js'
import { sign } from '../../utils/crypto.js'

export default async function register (req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return badRequest(errors.array()[0])(res)

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    })

    const doc = await user.save()

    const token = await sign({ email: doc.email })

    ok(token)(res)
  } catch (err) {
    badRequest('Неудалось зарегистрироваться')(res)
  }
}
