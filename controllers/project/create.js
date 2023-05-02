import { ok, userNotFound, badRequest } from '../../utils/responseFactory.js'
import Project from '../../models/Project.js'
import User from '../../models/User.js'

export default async function create (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.customer) return userNotFound(res)

    const project = new Project({
      customer: customer._id,
      step: 0
    })

    const doc = await project.save()

    return ok(doc)(res)
  } catch (err) {
    badRequest('Неудалось создать проект')(res)
  }
}
