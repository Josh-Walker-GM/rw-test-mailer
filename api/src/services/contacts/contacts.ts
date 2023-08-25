import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { mailer } from 'src/lib/mailer'
import { ContactUsEmail } from 'src/mail/ContactUs'
import { MJMLTest } from 'src/mail/MJMLTest'

export const contacts: QueryResolvers['contacts'] = () => {
  return db.contact.findMany()
}

export const contact: QueryResolvers['contact'] = ({ id }) => {
  return db.contact.findUnique({
    where: { id },
  })
}

export const createContact: MutationResolvers['createContact'] = async ({
  input,
}) => {
  logger.info('Creating contact', { input })
  const contact = await db.contact.create({
    data: input,
  })

  mailer.getTestHandler().clearInbox()
  await mailer.send(
    // Template component goes here...
    ContactUsEmail({
      name: input.name,
      email: input.email,
      message: input.message,
      when: new Date().toLocaleString(),
    }),
    // General options go here...
    {
      handler: 'prod',
      from: 'alice@example.com',
      to: [
        {
          address: 'bob@example.com',
          name: 'Bob Testinger',
        },
      ],
      // cc: { address: 'alice@example.com' },
      // bcc: 'eve@example.com',
      subject: 'React Email Test',
    },
    {
      dkim: undefined,
    }
  )

  console.log('Inbox:', mailer.getTestHandler().inbox.length)
  await mailer.send(
    // Template component goes here...
    MJMLTest(),
    // General options go here...
    {
      renderer: 'mjml',
      from: 'alice@example.com',
      to: {
        address: 'bob@example.com',
        name: 'Bob Testinger',
      },
      cc: { address: 'alice@example.com' },
      bcc: 'eve@example.com',
      subject: 'MJML React Test',
      attachments: [
        {
          content: 'Hello world - sendOptions!',
          filename: 'hello_sendOptions.txt',
        },
      ],
    }
  )
  console.log('Inbox:', mailer.getTestHandler().inbox.length)
  await mailer.sendWithoutRendering(
    // Template component goes here...
    {
      html: '<h1>Prerendered Email HTML</h1>',
      text: 'Prerendered Email Text',
    },
    // General options go here...
    {
      handler: 'prod',
      from: { address: 'alice@example.com', name: 'Alice McExampleton' },
      to: {
        address: 'bob@example.com',
        name: 'Bob Testinger',
      },
      cc: [
        {
          address: 'alice@example.com',
          name: 'Alice McExampleton',
        },
        { address: 'alice2@example.com' },
      ],
      bcc: 'eve@example.com',
      subject: 'Prerendered Test',
      attachments: [
        {
          content: 'Hello world - sendOptions!',
          filename: 'hello_sendOptions.txt',
        },
      ],
    },
    {
      attachments: [
        {
          content: 'Hello world - handlerOptions!',
          filename: 'hello_handlerOptions.txt',
        },
      ],
    }
  )
  console.log('Inbox:', mailer.getTestHandler().inbox.length)

  return contact
}

export const updateContact: MutationResolvers['updateContact'] = ({
  id,
  input,
}) => {
  return db.contact.update({
    data: input,
    where: { id },
  })
}

export const deleteContact: MutationResolvers['deleteContact'] = ({ id }) => {
  return db.contact.delete({
    where: { id },
  })
}
