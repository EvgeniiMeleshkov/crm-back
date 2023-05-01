import mailer from 'nodemailer'

const { __MAILER_LOGIN__, __MAILER_PASS__, __MAILER_HOST__, __MAILER_PORT__ } = process.env

const sendEmail = subject => format => message => async (to) => {
  try {
    const transport = mailer.createTransport({
      host: __MAILER_HOST__,
      port: __MAILER_PORT__,
      secure: true,
      auth: {
        user: __MAILER_LOGIN__,
        pass: __MAILER_PASS__
      }
    })
    const preferences = {
      from: __MAILER_LOGIN__,
      to,
      subject
    } 
    preferences[format] = message
    
    await transport.sendMail(preferences)
  } 
  catch (err) {
    console.log(err)
  } 
}

const sendRecoveryMail = sendEmail('Восстановление доступа Rating Unicode')
const sendRecoveryMailHTML = sendRecoveryMail('text')
  
export {
  sendRecoveryMailHTML
}
