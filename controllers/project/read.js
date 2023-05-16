import { ok, userNotFound, badRequest } from '../../utils/responseFactory.js'
import Project from '../../models/Project.js'
import User from '../../models/User.js'
import Ticket from '../../models/Ticket.js'

export default async function create (req, res) {
  try {

    const user = await User.findById({ _id: req.userId })
    
    if (!user || !user.customer) return userNotFound(res)

    const projects = await Project.find({ customer: user._id })

    const projectsWithTickets = await Promise.all(projects.map( async (x, idx) => {
      const tickets = await Ticket.find({ project: x._id })
      return {
        name: x.name,
        customer: x.customer,
        step: x.step,
        tickets
      }
    }))

    console.log(projectsWithTickets)

    return ok(projectsWithTickets)(res)
  } catch (err) {
    badRequest('Неудалось получить проекты')(res)
  }
}
