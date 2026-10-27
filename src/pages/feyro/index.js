import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import FeyroNav from "../../components/FeyroNav"
import { SITE_URL } from "../../data/person"
import {
  appStoreStatus,
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
import captureFormats from "../../../content/assets/feyro/05-capture-formats.jpg"
import reviewPlant from "../../../content/assets/feyro/06-photo-review-plant.jpg"
import reviewLavender from "../../../content/assets/feyro/07-photo-review-lavender.jpg"
import reviewRoses from "../../../content/assets/feyro/08-photo-review-roses.jpg"
import reviewCactus from "../../../content/assets/feyro/09-photo-review-cactus.jpg"
import library from "../../../content/assets/feyro/10-library.jpg"

// App Store screenshots, resized to 600px wide. Captions are the file names
// without their ordering number.
const screenshots = [
  { src: captureFormats, caption: "Capture formats" },
  { src: reviewPlant, caption: "Photo review plant" },
  { src: reviewLavender, caption: "Photo review lavender" },
  { src: reviewRoses, caption: "Photo review roses" },
  { src: reviewCactus, caption: "Photo review cactus" },
  { src: library, caption: "Library" },
]

const FeyroPage = ({ location }) => (
  <Layout location={location} title="Vinit Kumar">
    <div className="feyro-page">
      <FeyroNav />

      <header className="feyro-hero">
        <div className="feyro-hero-copy">
          <p className="eyebrow">iPhone camera app</p>
          <h1>{name}</h1>
          <p className="feyro-hero-subtitle">{subtitle}</p>
          <p className="feyro-hero-intro">{intro}</p>
          <div className="feyro-hero-actions">
            <span className="feyro-cta-placeholder">{appStoreStatus}</span>
            <span className="feyro-hero-platform">{platform}</span>
          </div>
        </div>

        <figure className="feyro-hero-image">
          <img
            src={hero}
            width="1600"
            height="686"
            alt="A field of lavender in bloom, photographed with Feyro"
          />
          <figcaption>Lavender, photographed with Feyro.</figcaption>
        </figure>
      </header>

      <section className="feyro-section" aria-labelledby="feyro-features">
        <h2 id="feyro-features">What it does</h2>
        <p className="feyro-section-lede">{promo}</p>

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

      <section className="feyro-section" aria-labelledby="feyro-screens">
        <h2 id="feyro-screens">Screens</h2>
        <ul className="feyro-screen-strip">
          {screenshots.map((shot) => (
            <li key={shot.caption}>
              <figure>
                <img
                  src={shot.src}
                  width="600"
                  height="1304"
                  loading="lazy"
                  alt={`Feyro screenshot: ${shot.caption}`}
                />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="feyro-section feyro-section--last"
        aria-labelledby="feyro-pro"
      >
        <h2 id="feyro-pro">Feyro Pro</h2>
        <p className="feyro-section-lede">
          Manual exposure, manual focus, white balance, RAW formats and the
          shooting tools are part of Feyro Pro.
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
