import path from 'path'

import { Mailer } from '@redwoodjs/mailer-core'
import { FileMailHandler } from '@redwoodjs/mailer-handler-file'
import { ResendMailHandler } from '@redwoodjs/mailer-handler-resend'

// Handlers are how your mail gets sent. You can have multiple handlers to suit your unique needs.
// Each handler must be identified by a unique name and you can specify a default handler in the config
// to your Mailer.

const handlers = {
  file: new FileMailHandler({
    outputDir: path.join(__dirname, '../../../_mail'),
  }),
  resend: new ResendMailHandler({ token: process.env.RESEND_TOKEN }),
}
// TODO: ^ I want to type this such that "string": "some subclass of MailHandler" - I don't know how to do this yet...

//
export const mailer = new Mailer(handlers, {
  defaultHandler: 'file',
  defaultRenderFormat: 'html',
  defaultFrom: 'onboarding@resend.dev',
})
