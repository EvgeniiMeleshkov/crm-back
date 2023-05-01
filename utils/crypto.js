import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { __JWT_SECRET__ } = process.env

function compare (x, y) { return bcrypt.compareSync(x, y) }

function makeSalt () {
  return bcrypt.genSaltSync(10)
}

function makeHash (value, salt) {
  return bcrypt.hashSync(value, salt)
}

function verify (value) {
  return jwt.verify(value, __JWT_SECRET__)
}

function sign (obj) {
  return jwt.sign(obj, __JWT_SECRET__, { expiresIn: '10d' })
}

function genSaltAndHash (value) {
  const salt = makeSalt()
  return makeHash(value, salt)
}

export {
  compare,
  sign,
  genSaltAndHash,
  makeSalt,
  makeHash,
  verify
}
