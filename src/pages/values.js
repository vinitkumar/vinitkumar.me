import React from "react"
import Layout from "../components/layout"

const ValuesPage = ({ location }) => {
  return (
    <Layout location={location} title="Values">
      <h1>Values</h1>
      <p>
        These principles guide how I build software, work with people, and
        choose where to spend my attention.
      </p>
      <ul>
        <li>
          <strong>Stay adaptable.</strong> Learn new technologies when the
          problem calls for them, not merely because they are fashionable.
        </li>
        <li>
          <strong>Keep growing.</strong> Treat expertise as a responsibility to
          remain curious, seek feedback, and revise old assumptions.
        </li>
        <li>
          <strong>Make remote work visible.</strong> Communicate context, write
          decisions down, and give colleagues what they need to move without
          waiting.
        </li>
        <li>
          <strong>Solve the real problem.</strong> Understand the constraints
          before choosing tools or optimizing the implementation.
        </li>
        <li>
          <strong>Prefer resourcefulness to ceremony.</strong> Use the simplest
          process that produces safe, maintainable work.
        </li>
        <li>
          <strong>Write to be understood.</strong> Clear communication is part
          of the engineering, not an activity that follows it.
        </li>
        <li>
          <strong>Act with empathy and integrity.</strong> The way we treat
          people matters more than being the smartest person in the room.
        </li>
      </ul>
    </Layout>
  )
}

export default ValuesPage
