import React from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"


class UsesComponent extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} title="Uses">
        <h1>My setup</h1>
        <h2>Hardware</h2>
        <h3>Peripherals & desk</h3>
        <StaticImage src="../../content/assets/IMG_2993.JPG" alt="My setup" />
        <div style={{marginTop: '20px'}}>
          <ul>
           <li>Monitor: BenQ 27 inch Full HD (1920x1080) IPS (Dual Monitor at work), Single at Home</li>
           <li>Keyboard: Keychron, Logitech Pebble </li>
           <li>Mouse: Lenovo Legion M500</li>
           <li> Headphones: Bose QC Ultra </li>
           <li> Desk: Custom Made </li>
           <li> Deskmat: Ant Esports </li>
           <li> Work laptop - macOS </li>
           <li> MacBook Pro Apple M3 Max, 14-inch, Nov 2023 </li>
           <li> Private laptop - macOS  </li>
           <li> MacBook Pro M1 Pro, 16-inch, 2021, 16GB </li>
          </ul>
        </div>
      </Layout>
    )
  }
}


export default UsesComponent
