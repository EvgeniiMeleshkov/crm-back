import Project from '../../models/Project.js'
import User from '../../models/User.js'
import Ticket from '../../models/Ticket.js'
import { ok, badRequest, forbiddenPage } from '../../utils/responseFactory.js'

export default async function getCustomers (req, res) {
  try {
    if (req.admin) {
      const users = await User.find({ customer: true })
      const usersToSend = await Promise.all(users.map( async (x, idx) => {
        const projects = await Project.find({customer: x._id})
        const projectsWithTickets = await Promise.all(projects.map( async (x, idx) => {
          const tickets = await Ticket.find({ project: x._id })
          return {
            name: x.name,
            customer: x.customer,
            step: x.step,
            tickets
          }
        }))

        return {
          firstName: x.firstName,
          lastName: x.lastName,
          email: x.email,
          projects: projectsWithTickets,
          _id: x._id,
          customer: x.customer,
          createdAt: x.createdAt,
          updatedAt: x.updatedAt,
          active: x.active,
          admin: x.admin
        }
      }))
     
      return ok(usersToSend)(res)
    }
    if (req.customer) {
      return forbiddenPage(res)
    }
  } catch (err) {
    badRequest('Неудалось получить список заказчиков')(res)
  }
}
