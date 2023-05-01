import { ok, serverFail, userNotFound } from '../../utils/responseFactory.js'

import { sign } from '../../utils/crypto.js'
import User from '../../models/User.js'
import { sendRecoveryMailHTML } from '../../utils/sendMail.js'
import createLink from '../../utils/createRecoverPassLink.js'


export default async function passRecoveryController (req, res) {
  try {
    console.log(req.body);
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return userNotFound(res)

    const token = await sign({ email: user.email })
    
    sendRecoveryMailHTML(createLink(token))(email)
    console.log(createLink(token))
    ok('success')(res)
  } catch (err) {
    serverFail(res)
  }
} 
