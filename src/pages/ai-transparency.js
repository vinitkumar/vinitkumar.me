import React from "react"
import Layout from "../components/layout"

const AITransparencyPage = ({ location }) => {
  return (
    <Layout location={location} title="AI Transparency">
      <h1>AI Transparency</h1>
      <p>
        I believe in being transparent about the use of AI tools in my work and on this website.
      </p>

      <h2>Content Creation</h2>
      <p>
        All blog posts and articles on this site are written by me. I may use AI tools like
        Amp, ChatGPT, or Cursor Code to help with editing, proofreading, or brainstorming ideas,
        but the core ideas and writing are my own.
      </p>

      <h2>Code</h2>
      <p>
        I use AI-assisted coding tools (like Amp and Cursor Code) to help write code faster.
        All code is reviewed and tested by me before being published or deployed.
      </p>

      <h2>Website Development</h2>
      <p>
        This website is built with Gatsby and has been developed with occasional assistance from
        AI coding assistants for debugging, styling, and implementing features.
      </p>

      <h2>My Stance</h2>
      <p>
        I view AI as a tool that can augment human creativity and productivity when used responsibly.
        I always maintain editorial control over what gets published and take full responsibility
        for the content on this site.
      </p>
    </Layout>
  )
}

export default AITransparencyPage
