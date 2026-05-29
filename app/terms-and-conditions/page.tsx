"use client"

import { useRouter } from "next/navigation"
import { ButtonPrimary } from "@/components/modular/button"
import { ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const markdownContent = `
# Terms & Conditions

_Last updated: May 28, 2026_

## 1. Eligibility

You must be at least **18 years old** to use FashionifyAI.

## 2. Account Registration

Users are required to sign in using supported Google authentication methods.

## 3. Services

FashionifyAI provides AI-generated fashion visualization services.

## 4. User Content

Users may upload:

- Images
- Garments
- Fabrics
- Related fashion content

for the purpose of generating visual previews and AI-generated outputs.

## 5. AI-Generated Content

All generated outputs are provided for visualization and creative purposes only.

Users are solely responsible for how they use, share, or rely upon generated content.

## 6. Prohibited Activities

The following activities are prohibited:

- Illegal or unlawful usage
- Abuse of platform resources
- Automated scraping
- Reverse engineering
- Fraudulent activity
- Security bypass attempts
- Unauthorized access attempts

## 7. Payments & Subscriptions

FashionifyAI operates on paid subscription plans.

Access to premium features may require an active subscription.

## 8. Refund Policy

All purchases and subscription payments are non-refundable unless otherwise required by applicable law.

## 9. Intellectual Property

All platform assets, branding, software, and related intellectual property remain the property of FashionifyAI.

## 10. Limitation of Liability

FashionifyAI is provided on an **"as is"** and **"as available"** basis without warranties of any kind.

## 11. Termination

FashionifyAI may suspend or terminate accounts that violate these Terms & Conditions or applicable laws.

## 12. Governing Law

These Terms & Conditions shall be governed by and interpreted in accordance with the laws of **India**.

## 13. Contact

For questions regarding these Terms & Conditions, please contact:

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
