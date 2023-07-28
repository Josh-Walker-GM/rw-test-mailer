import { Mailer } from '@redwoodjs/mailer-core'
import { InMemoryMailHandler } from '@redwoodjs/mailer-handler-in-memory'
import { NodemailerMailHandler } from '@redwoodjs/mailer-handler-nodemailer'
import { ResendMailHandler } from '@redwoodjs/mailer-handler-resend'
// import { StudioMailHandler } from '@redwoodjs/mailer-handler-studio'

// Handlers are how your mail gets sent. You can have multiple handlers to suit your unique needs.
// Each handler must be identified by a unique name and you can specify a default handler in the config
// to your Mailer.

// TODO: I want to type this such that "string": "some subclass of MailHandler" - I don't know how to do this yet...
const handlers = {
  memory: new InMemoryMailHandler({}),
  resend: new ResendMailHandler({ token: process.env.RESEND_TOKEN }),
  nodemailer: new NodemailerMailHandler({
    transport: {
      host: 'localhost',
      port: 4319,
      secure: false,
    },
  }),
}

// Switch to use the StudioMailHandler in development
// if (process.env.NODE_ENV !== 'production') {
//   const existingHandlers = Object.keys(handlers)
//   for (const handlerName of existingHandlers) {
//     handlers[handlerName] = new StudioMailHandler({})
//   }
// }

// TODO: Do we support any other type of testing functionality?
//  - Keep original handlers but intercept all addresses and switch them to a test address?

//
export const mailer = new Mailer(handlers, {
  defaultHandler: 'memory',
  defaultRenderFormat: 'html',
  defaultFrom: 'onboarding@resend.dev',
})
