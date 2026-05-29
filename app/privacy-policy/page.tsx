"use client"

import { useRouter } from "next/navigation"
import { ButtonPrimary } from "@/components/modular/button"
import { ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const markdownContent = `
# Privacy Policy

_Last updated: May 28, 2026_

## Information We Collect

We may collect the following information:

- Name
- Email address
- Google profile image
- Uploaded images and files
- Device information
- Browser information
- Usage analytics and platform interactions

## Authentication

FashionifyAI uses Google OAuth for account authentication and sign-in.

## Cookies & Sessions

Cookies and session technologies are used to:

- Authenticate users
- Maintain active sessions
- Improve platform functionality
- Enhance user experience

## AI Service Providers

FashionifyAI may use third-party AI providers to deliver certain features, including:

- OpenAI
- Google

User inputs and uploaded content may be processed by these providers as necessary to generate requested outputs.

## Payments

Payments and subscription processing are handled by Dodo Payments.

FashionifyAI does not directly store payment card information.

## Marketing Emails

Users may receive:

- Product updates
- Feature announcements
- Service notifications
- Marketing communications

Users may unsubscribe from marketing communications at any time where applicable.

## Data Retention

Certain information may be retained for:

- Security purposes
- Analytics
- Legal and regulatory compliance
- Fraud prevention
- Service improvement

Retention periods may vary depending on the type of data and applicable legal requirements.

## Contact

For privacy-related questions or requests, please contact:

- Email: dhavaljprasad@gmail.com
`

function Page() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen w-full flex-col p-4 sm:px-16">
      <ButtonPrimary
        text="Back"
        onClick={() => router.back()}
        icon={ArrowLeft}
      />
      <article className="prose prose-sm mt-8 max-w-none prose-slate sm:prose-base lg:prose-lg dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownContent}
        </ReactMarkdown>
      </article>
    </div>
  )
}

export default Page
