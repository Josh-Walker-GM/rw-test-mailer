import { Mailer } from '@redwoodjs/mailer-core'
import { InMemoryMailHandler } from '@redwoodjs/mailer-handler-in-memory'
import { NodemailerMailHandler } from '@redwoodjs/mailer-handler-nodemailer'
import { ResendMailHandler } from '@redwoodjs/mailer-handler-resend'
import { StudioMailHandler } from '@redwoodjs/mailer-handler-studio'

import { logger } from './logger'

// TODO:
// - [ ] Be defensive about mailer send options

// Handlers are how your mail gets sent. You can have multiple handlers to suit your unique needs.
// Each handler must be identified by a unique name and you can specify a default handler in the config
// to your Mailer.

const handlers = {
  memory: new InMemoryMailHandler(),
  studio: new StudioMailHandler(),
  resend: new ResendMailHandler({ token: process.env.RESEND_TOKEN }),
  nodemailer: new NodemailerMailHandler({
    transport: {
      host: 'localhost',
      port: 4319,
    },
  }),
}

export const mailer = new Mailer(handlers, {
  logger,

  defaultHandler: 'nodemailer',
  defaultFrom: 'onboarding@resend.dev',

  isTest: process.env.NODE_ENV === 'test', // TODO: Optional will include a sensible default
  testHandler: 'memory', // TODO: Optional will include a sensible default

  isDev: () => process.env.NODE_ENV !== 'production', // TODO: Optional will include a sensible default
  devHandler: 'studio', // TODO: Optional will include a sensible default
})
