import React from "react"
import Unsplash from "react-unsplash-wrapper"

import Layout from "../components/layout"
// wT5VXP92jFA
class ValueComponent extends React.Component {
  render() {
    return (
        <Layout location={this.props.location} title="Values">
          <div style={{position: 'relative', width: '100%', height: 400, margin: 'auto', marginBottom: 60}}>
            <Unsplash expand keywords="worship" />
          </div>
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
