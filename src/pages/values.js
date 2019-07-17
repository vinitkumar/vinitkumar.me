import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class ValueComponent extends React.Component {
  render() {
    return (
        <Layout location={this.props.location} title="Values">
            <ul>
              <li>
                  Fast learner who can grasp new tech quickly and apply them to on-going projects.
              </li>

              <li>
                Dedicated to the improvement of self, others, and involved processes.

              </li>
              <li>
                Proven ability in working alone or as part of a distributed remote team.

              </li>
              <li>
                 Developed problem-solving and analytical skills.
              </li>
              <li>
                Resourceful and efficient, with a talent for improvisation.
              </li>
              <li>
                Strong written and verbal English competency.
              </li>
              <li>
                Empathetic and ethical in personal and professional contexts.
              </li>
         </ul>
        </Layout>
    )
  }
}

export default ValueComponent
