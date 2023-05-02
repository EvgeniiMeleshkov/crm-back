import User from '../../models/User.js'
import { ok, badRequest, forbiddenPage } from '../../utils/responseFactory.js'

export default async function getCompetitors (req, res) {
  try {
    if (req.admin) {
      const users = await User.find({customer: true})
      return ok(users)(res)
    }
    if (req.customer) {
      return forbiddenPage(res)
    }
  } catch (err) {
    badRequest('Неудалось получить список заказчиков')(res)
  }
}
