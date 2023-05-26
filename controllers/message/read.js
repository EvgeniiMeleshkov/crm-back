import { ok, badRequest } from '../../utils/responseFactory.js'
import Ticket from '../../models/Ticket.js'
import Message from '../../models/Message.js'

export default async function read (req, res) {
  try {

    const ticket = await Ticket.findById(req.body.ticketId)
    
    if (!ticket) return badRequest('Нет такой правки')(res)

    const messages = await Message.find({ticket: ticket._id})

    return ok(messages)(res)
  } catch (err) {
    badRequest('Неудалось получить сообщения')(res)
  }
}
