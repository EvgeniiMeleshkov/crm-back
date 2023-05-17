import { ok, badRequest, notFound } from '../../utils/responseFactory.js'
import Ticket from '../../models/Ticket.js'
import Project from '../../models/Project.js'

export default async function create (req, res) {
  try {
    const project = await Project.findById({ _id : req.body.id })
    if (!project) return notFound('Проект не найден')(res)

    const ticket = new Ticket({
      name: req.body.ticketName,
      project: req.body.id,
      description: req.body.description ? req.body.description : req.body.ticketName,
      step: 0
    })

    const doc = await ticket.save()

    return ok(doc)(res)
  } catch (err) {
    badRequest('Неудалось создать задачу')(res)
  }
}
