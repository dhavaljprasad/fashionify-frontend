"use client"

import { useRouter } from "next/navigation"
import { ButtonPrimary } from "@/components/modular/button"
import { ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const markdownContent = `
# About FashionifyAI

FashionifyAI is an AI-powered fashion visualization platform built to bridge the gap between imagination and reality in clothing and styling.

The idea behind FashionifyAI came from a simple problem: clothes often look different on different body types, models, and styling combinations.

Many people also struggle to visualize how unstitched fabrics might look once tailored or styled.

FashionifyAI helps users generate realistic visual previews of stitched and unstitched clothing items without physically trying them on.

Whether you're a fashion enthusiast, tailor, designer, garment business, or fabric store owner, the platform is designed to simplify fashion visualization and experimentation.

Our goal is to make fashion more accessible, personalized, and creative through AI.

## Founder

FashionifyAI was created and is independently operated by Dhaval J Prasad.

## Contact

- Instagram: @dhavaljprasad
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
