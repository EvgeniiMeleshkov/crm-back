import Project from '../../models/Project.js'
import User from '../../models/User.js'
import { ok, badRequest, forbiddenPage } from '../../utils/responseFactory.js'

export default async function getCustomers (req, res) {
  try {
    if (req.admin) {
      const users = await User.find({ customer: true })
      const usersToSend = await Promise.all(users.map( async (x, idx) => {
        const projects = await Project.find({customer: x._id})
        return {
          firstName: x.firstName,
          lastName: x.lastName,
          email: x.email,
          projects,
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
