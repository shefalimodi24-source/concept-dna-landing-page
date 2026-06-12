import { Navbar } from "@/components/navbar"
import { AssessmentClient } from "./assessment-client"

export const metadata = {
  title: "STEM DNA Assessment — Concept DNA",
  description:
    "Answer a few questions and let AI map your STEM understanding and generate your personalized knowledge profile.",
}

export default function AssessmentPage() {
  return (
    <>
      <Navbar />
      <main>
        <AssessmentClient />
      </main>
    </>
  )
}
