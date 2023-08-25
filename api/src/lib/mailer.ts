import { Mailer } from '@redwoodjs/mailer-core'
import { InMemoryMailHandler } from '@redwoodjs/mailer-handler-in-memory'
import { NodemailerMailHandler } from '@redwoodjs/mailer-handler-nodemailer'
import { StudioMailHandler } from '@redwoodjs/mailer-handler-studio'
import { MJMLReactRenderer } from '@redwoodjs/mailer-renderer-mjml-react'
import { ReactEmailRenderer } from '@redwoodjs/mailer-renderer-react-email'

import { logger } from './logger'

const handlers = {
  inMemory: new InMemoryMailHandler(),
  studio: new StudioMailHandler(),
  prod: new NodemailerMailHandler({
    // This is the connection info for the studio mail server
    transport: {
      host: 'localhost',
      port: 4319,
      secure: false,
    },
  }),
}

const renderers = {
  reactEmail: new ReactEmailRenderer(),
  mjml: new MJMLReactRenderer(),
}

export const mailer = new Mailer({
  handling: {
    handlers,
    default: 'prod',
  },

  rendering: {
    renderers,
    default: 'reactEmail',
    options: {
      reactEmail: {
        outputFormat: 'both',
        pretty: true,
      },
      // mjml: {
      //   outputFormat: 'html',
      // },
    },
  },

  defaults: {
    replyTo: 'noreply@example.com',
    attachments: [
      {
        content: 'Hello world!',
        filename: 'hello_defaultSendOptions.txt',
      },
    ],
  },

  test: {
    handler: 'inMemory',
    when: () => process.env.NODE_ENV === 'test',
  },

  development: {
    handler: 'studio',
    when: process.env.NODE_ENV !== 'production',
  },

  logger,
})
