import React from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"

const UsesPage = ({ location }) => {
  return (
    <Layout location={location} title="Uses">
      <h1>My Setup</h1>
      <p>
        This is the hardware I use for software development, writing, and daily
        work. I prefer a small set of dependable tools over a desk crowded with
        equipment.
      </p>

      <StaticImage
        src="../../content/assets/IMG_2993.JPG"
        alt="Vinit's desk with a monitor, keyboard, mouse, and laptops"
      />

      <div style={{ marginTop: "20px" }}>
        <h2>Desk and Peripherals</h2>
        <ul>
          <li>
            <strong>Monitor:</strong> BenQ 27-inch Full HD IPS display; two at
            work and one at home
          </li>
          <li>
            <strong>Keyboards:</strong> Keychron and Logitech Pebble
          </li>
          <li>
            <strong>Mouse:</strong> Lenovo Legion M500
          </li>
          <li>
            <strong>Headphones:</strong> Bose QuietComfort Ultra
          </li>
          <li>
            <strong>Desk:</strong> Custom-made, with an Ant Esports desk mat
          </li>
        </ul>

        <h2>Computers</h2>
        <ul>
          <li>
            <strong>Work:</strong> 14-inch MacBook Pro with M3 Max (November
            2023)
          </li>
          <li>
            <strong>Personal:</strong> 16-inch MacBook Pro with M1 Pro and 16 GB
            of memory (2021)
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default UsesPage
