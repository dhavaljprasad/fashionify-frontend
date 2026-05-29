"use client"

import { useRouter } from "next/navigation"
import { ButtonPrimary } from "@/components/modular/button"
import { ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const markdownContent = `
# Refund Policy

_Last updated: May 28, 2026_

## No Refunds

All payments made to FashionifyAI are final and non-refundable.

By purchasing a subscription or using paid services, you acknowledge and agree to this refund policy.

## Subscription Cancellation

Users may cancel their subscriptions at any time.

Cancellation will prevent future renewal charges but will not result in a refund for any current or previous billing period.

## Digital Services

FashionifyAI provides digital, AI-powered services and generated content.

Due to the immediate nature of digital service delivery, refunds are not provided once a purchase has been completed.

## Abuse & Violations

Accounts that are suspended, restricted, or terminated due to violations of our Terms & Conditions are not eligible for refunds.

This includes, but is not limited to:

- Fraudulent activity
- Abuse of platform resources
- Unauthorized access attempts
- Violation of applicable laws
- Attempts to bypass platform security

## Contact

For questions regarding this Refund Policy, please contact:

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
