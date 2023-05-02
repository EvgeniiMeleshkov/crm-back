export default function createLink (token) {
  const { __BASE_URL__ } = process.env
  return `Для восстановления пароля пройдите по ссылке: http://127.0.0.1:5174/?token=${token}`
}
