import React from "react"
import Layout from "../components/layout"
import indexStyle from "../components/index.module.scss"
import logoJoomla from "../images/joomla-logo.svg"
import logoReact from "../images/react-logo.svg"
import logoGatsby from "../images/gatsby-logo.svg"
import logoSass from "../images/sass-logo.svg"

export default function Home() {

  return (
    <Layout>
      <h1>Komplexe Systeme auf eine Website gebracht!</h1>
      <p><strong>Im Großen und Ganzen zu denken, Zusammenhänge zu erkennen und gewonnene Erkenntnisse optimiert in den Code einfließen zu lassen, zeichnet mit aus.</strong></p>
      <p>Hallo und herzlich willkommen auf meiner Seite, ich bin <strong>Sascha Nabrotzky.</strong></p>
      <p>Bei allen größeren Projekten, die ich umsetze, ist eine gute <strong>Nutzererfahrung</strong> sehr wichtig. Die Nutzererfahrung geht weit über das visuelle Design hinaus und fängt auch viel eher im ganzen Zusammenspiel der komplexen Design-Systeme an.</p>
      <p>Ich erstelle <strong>statische Websites</strong> in HTML5, SCSS und JavaScript - auch Gatsby.js und React.js kommen bei mir zum Einsatz.</p>
      <p><strong>Contentmanagement-Systeme,</strong> wie z. B. Joomla!, setze ich dann zusammen mit der PHP-Programmierung (PHP8) ein, wenn die Seite mit dem Unternehmen mitwachsen soll oder ein (E-Commerce-)Team eine Datenbankgestützte Website braucht.</p>
      <div className={indexStyle.logoWrapper}>
        <img src={logoJoomla} alt="Joomla!-Logo"></img>
        <img src={logoReact} alt="React-Logo"></img>
        <img src={logoGatsby} alt="Gatsby-Logo"></img>
        <img src={logoSass} alt="SASS-Logo"></img>
      </div>
    </Layout>
  )
}
