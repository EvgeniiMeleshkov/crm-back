import { ok, userNotFound, badRequest } from '../../utils/responseFactory.js'
import User from '../../models/User.js'
import Ticket from '../../models/Ticket.js'
import Message from '../../models/Message.js'
import { sendEmail } from '../../utils/sendMail.js'

export default async function create (req, res) {
  try {
    const user = await User.findById(req.body.customerId)
    if (!user) return userNotFound(res)
    const ticket = await Ticket.findById(req.body.ticketId)
    if (!ticket) return badRequest('Правка не существует')

    const message = new Message({
      text: req.body.text,
      ticket: req.body.ticketId,
      customer: req.body.customerId,
      isMy: req.body.isMy
    })
    
    sendEmail(ticket.name)('text')(message.text)(user.email)
    .then( async () => {
      const doc = await message.save()
      return ok(doc)(res)
    })

  } catch (err) {
    badRequest('Неудалось отправить сообщение')(res)
  }
}
