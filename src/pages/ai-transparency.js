import React from "react"
import Layout from "../components/layout"

const AITransparencyPage = ({ location }) => {
  return (
    <Layout location={location} title="AI Transparency">
      <h1>AI Transparency</h1>
      <p>
        I use AI tools in both writing and software development. This page
        explains where they help and where I draw the line.
      </p>

      <h2>Writing</h2>
      <p>
        The experiences, arguments, and editorial decisions in every article are
        mine. I may use tools such as ChatGPT, Claude, or Cursor to explore an
        idea, challenge a draft, proofread prose, or suggest a clearer
        structure. I review and revise every word before publication.
      </p>

      <h2>Code</h2>
      <p>
        AI assistants help me research APIs, test alternatives, review changes,
        and sometimes draft code. I remain responsible for understanding,
        testing, and maintaining everything I publish or deploy. Generated code
        receives the same review as code written by hand.
      </p>

      <h2>This Website</h2>
      <p>
        I have occasionally used AI coding assistants while debugging, styling,
        and implementing this Gatsby site. They are tools in the development
        process, not autonomous authors or maintainers.
      </p>

      <h2>My Standard</h2>
      <p>
        AI can extend human creativity and productivity, but it cannot inherit
        accountability. I keep editorial control, verify factual claims, and
        take responsibility for everything published under my name.
      </p>
    </Layout>
  )
}

export default AITransparencyPage
