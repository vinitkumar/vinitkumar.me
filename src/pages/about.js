import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Unsplash from "react-unsplash-wrapper"

class AboutIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
      <SEO title="About - Vinit Kumar"></SEO>
        <div style={{position: 'relative', width: '100%', height: 400, margin: 'auto'}}>
          <Unsplash expand photoid="wT5VXP92jFA" />
        </div>
      <h1> About </h1>
      <p>
        Vinit Kumar is a Senior Engineer at Socialschools B.V with over 7 years of experience writing fast and scalable backend in Python (django & flask), Go and node.js. He has built services that use Postgres, RabbitMQ, Redis, ElasticSearch at scale.
      </p>
      <p>
        His speciality is coming up with simple solutions to difficult problems. He has an affinity towards writing quality code and admires code that shows good taste.

      </p>
      <p>
        He has plenty of experience writing beautiful and functional UI with React.
      </p>
      </Layout>
    );
  }
}


export default AboutIndex;
