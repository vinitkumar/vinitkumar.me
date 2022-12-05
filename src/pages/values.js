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
              Quickly adapts to new technologies and applies them to ongoing projects.
            </li>
            <li>
              Dedicated to personal and professional growth and improvement.
            </li>
            <li>
              Experienced in working independently or as part of a remote team.
            </li>
            <li>
              Strong problem-solving and analytical abilities.
            </li>
            <li>
              Resourceful and efficient, with a knack for improvisation.
            </li>
            <li>
              Excellent written and verbal English communication skills.
            </li>
            <li>
              Empathetic and ethical in all interactions.
            </li>
          </ul>
        </Layout>
    )
  }
}

export default ValueComponent
