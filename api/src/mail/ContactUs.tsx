import React from 'react'

import {
  Html,
  Text,
  Hr,
  Body,
  Head,
  Tailwind,
  Preview,
  Container,
  Section,
  Img,
  Heading,
  Link,
} from '@react-email/components'

export function ContactUsEmail({
  name,
  email,
  message,
  when,
}: {
  name: string
  email: string
  message: string
  when: string
}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Message from: {email}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] rounded border border-solid border-gray-200 p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={'https://redwoodjs.com/images/logo.svg'}
                width="40"
                height="37"
                alt="RedwoodJS"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              New Message Received
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              A user &ldquo;{name}&rdquo; has sent the following message:
            </Text>
            <Container className="mx-0 my-0 bg-gray-100 px-4">
              <Text className="text-[14px] text-black">{message}</Text>
            </Container>
            <Text className="text-[14px] leading-[24px] text-black">
              They can be replied to by email at:{' '}
              <Link
                href={`mailto:${email}`}
                className="text-blue-600 no-underline"
              >
                {email}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Message sent on {when}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
