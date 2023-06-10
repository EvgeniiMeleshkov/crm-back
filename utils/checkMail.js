import Imap from 'imap'
import {simpleParser} from 'mailparser'
import Message from '../models/Message.js'
import User from '../models/User.js'
import Ticket from '../models/Ticket.js'
import { ok, userNotFound, badRequest } from '../utils/responseFactory.js'

const { __MAILER_LOGIN__, __MAILER_PASS__, __MAILER_HOST__, __MAILER_PORT__ } = process.env

const imapConfig = {
  user: "emeleshkov@mail.ru",
  password: "1t3qW8KbiaXCcVWtDKCi",
  host: "imap.mail.ru",
  port: "993",
  tls: true
};


const getEmails = () => {
  try {
    const imap = new Imap(imapConfig);
    imap.once('ready', () => {
      imap.openBox('INBOX', false, () => {
        imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
          try {
            const f = imap.fetch(results, {bodies: ''});

            f.on('message', msg => {

              msg.on('body', stream => {

                simpleParser(stream, async (err, parsed) => {
                  const {from, subject, textAsHtml, text} = parsed;
                  
                  
                  const str = from.text.substring(from.text.indexOf('<') + 1, from.text.indexOf('>'));

                  
                  let message = {
                    from: str,
                    subject: subject ? subject.replace('Re: ','') : subject,
                    text: text.replace('/n', '')
                  }
                  
                  if (message) {
                    const ticket = await Ticket.findOne({name: message.subject})
                    if (!ticket) return badRequest('Правка не существует')


                    const user = await User.findOne({email: message.from})
                    if (!user) return userNotFound(res)

                    const newMessage = new Message({
                      text: message.text,
                      ticket: ticket._id,
                      customer: user._id,
                      isMy: false
                    })

                    //console.log(newMessage)
                    
                    const compare = await Message.find({text: newMessage.text})

                    if(!compare) await newMessage.save()

                    else console.log('такое сообщение уже есть')
                    //const doc = await newMessage.save()
                  }
                  /* Make API call to save the data
                     Save the retrieved data into a database.
                     E.t.c
                  */
                });
  
              });
              msg.once('attributes', attrs => {
                const {uid} = attrs;
                imap.addFlags(uid, ['\\Seen'], () => {
                  // Mark the email as read after reading it
                  console.log('Marked as read!');
                });
              });
            });
            f.once('error', ex => {
              return Promise.reject(ex);
            });
            f.once('end', () => {
              console.log('Done fetching all messages!');
              imap.end();
            });
          } catch(err) {
            console.log(err.message)
          }

        });
      });
    });

    imap.once('error', err => {
      console.log(err);
    });

    imap.once('end', () => {
      console.log('Connection ended');
    });

    imap.connect();
  } catch (ex) {
    console.log('an error occurred');
  }
};
//const interval = setInterval(getEmails, 300000)
getEmails();