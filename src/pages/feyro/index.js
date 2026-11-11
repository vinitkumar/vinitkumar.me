import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import FeyroNav from "../../components/FeyroNav"
import { SITE_URL } from "../../data/person"
import {
  appStoreLabel,
  appStoreUrl,
  appleTermsUrl,
  features,
  intro,
  name,
  plans,
  platform,
  privacyNote,
  promo,
  subscriptionTerms,
  subtitle,
} from "../../data/feyro"
import hero from "../../../content/assets/feyro/hero.jpg"
import balconyLantern from "../../../content/assets/feyro/shot-balcony-lantern.jpg"
import nachtleven from "../../../content/assets/feyro/shot-nachtleven.jpg"
import stickyRice from "../../../content/assets/feyro/shot-sticky-rice.jpg"
import icedGlass from "../../../content/assets/feyro/shot-iced-glass.jpg"

// Photographs taken with Feyro, resized to 1400px on the long edge. The
// gallery flows in columns, so the order here sets each column's contents.
// Only the night shot carries a caption: its settings are the selling point.
// The fog, balcony and crow photos are in the cover strip, so they are not
// repeated here.
const shots = [
  {
    src: icedGlass,
    width: 647,
    height: 1400,
    alt: "An iced drink in a cut-glass tumbler casting a long shadow on a wooden table",
  },
  {
    src: balconyLantern,
    width: 1050,
    height: 1400,
    alt: "An iced coffee held up under a yellow fringed lantern and star lights at night",
    caption: "48 MP, handheld at 1/33 s, ISO 500",
  },
  {
    src: nachtleven,
    width: 1400,
    height: 1050,
    alt: "A brick facade with the word Nachtleven arched over the entrance",
  },
  {
    src: stickyRice,
    width: 1050,
    height: 1400,
    alt: "Mango sticky rice on a blue and white plate",
  },
]

const FeyroPage = ({ location }) => (
  <Layout location={location} title="Vinit Kumar">
    <div className="feyro-page">
      <FeyroNav />

      <header className="feyro-hero">
        <div className="feyro-hero-copy">
          <p className="eyebrow">Camera for iPhone</p>
          <h1>{name}</h1>
          <p className="feyro-hero-subtitle">{subtitle}</p>
          <p className="feyro-hero-intro">{intro}</p>
          <div className="feyro-hero-actions">
            <a
              className="feyro-cta"
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {appStoreLabel}
            </a>
            <span className="feyro-hero-platform">{platform}</span>
          </div>
        </div>

        <figure className="feyro-hero-image">
          <img
            src={hero}
            width="1600"
            height="686"
            alt="Three photographs taken with Feyro: a train in fog at a station platform, an iced coffee held up on a balcony at night, and a model crow on a green bookshop shelf"
          />
          <figcaption>
            Fog, a handheld night shot at 1/25 s and ISO 640, and a bookshop
            shelf, all shot on Feyro.
          </figcaption>
        </figure>
      </header>

      <section className="feyro-section" aria-labelledby="feyro-shots">
        <h2 id="feyro-shots">Shot on Feyro</h2>
        <div className="feyro-gallery">
          {shots.map((shot) => (
            <figure key={shot.src}>
              <img
                src={shot.src}
                width={shot.width}
                height={shot.height}
                loading="lazy"
                alt={shot.alt}
              />
              {shot.caption && <figcaption>{shot.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      <section className="feyro-section" aria-labelledby="feyro-features">
        <h2 id="feyro-features">Built for photographers</h2>
        <div className="feyro-features">
          {features.map((feature) => (
            <div className="feyro-feature" key={feature.title}>
              <h3 className="eyebrow">{feature.title}</h3>
              <ul>
                {feature.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="feyro-feature">
            <h3 className="eyebrow">Privacy</h3>
            <p>
              {privacyNote}{" "}
              <Link to="/feyro/privacy/">Read the privacy policy.</Link>
            </p>
          </div>
        </div>
      </section>

      <section
        className="feyro-section feyro-section--last"
        aria-labelledby="feyro-pro"
      >
        <h2 id="feyro-pro">Feyro Pro</h2>
        <p className="feyro-section-lede">
          Unlocks manual controls, RAW and ProRAW, and the exposure tools.
        </p>

        <div className="feyro-plans">
          {plans.map((plan) => (
            <div className="feyro-plan" key={plan.name}>
              <h3>{plan.name}</h3>
              <strong className="feyro-plan-price">{plan.price}</strong>
              <span className="feyro-plan-period">{plan.period}</span>
              <p>{plan.body}</p>
            </div>
          ))}
        </div>

        <div className="feyro-terms">
          <p>{subscriptionTerms}</p>
          <p>
            US App Store prices.{" "}
            <a href={appleTermsUrl} target="_blank" rel="noopener noreferrer">
              Terms of Use
            </a>{" "}
            · <Link to="/feyro/privacy/">Privacy Policy</Link> ·{" "}
            <Link to="/feyro/support/">Support</Link>
          </p>
        </div>
      </section>
    </div>
  </Layout>
)

export default FeyroPage

export const Head = ({ location }) => (
  <Seo
    title={name}
    description={`${subtitle} ${promo}`}
    pathname={location.pathname}
    image={`${SITE_URL}${hero}`}
  />
)
