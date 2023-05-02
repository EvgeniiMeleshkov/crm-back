const respond = status => body => res => res.status(status).send(body)

const ok = respond(200)
const fail = respond(500)
const notFound = respond(404)
const badRequest = respond(400)
const notAuth = respond(401)
const forbidden = respond(403)

const userNotFound = notFound('Пользователь не найден')
const markTypeNotFound = notFound('Тип оценки не найдена')
const badPassword = badRequest('Неверный пароль')
const unAuthorized = notAuth('Вы не авторизованы')
const serverFail = fail('Ошибка сервера')
const forbiddenPage = forbidden('Запрещено')

export {
  ok,
  fail,
  notFound,
  badRequest,

  userNotFound,
  markTypeNotFound,
  badPassword,
  unAuthorized,
  serverFail,
  forbiddenPage
}
