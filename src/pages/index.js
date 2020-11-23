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
      <p><strong>Zusammenhänge verstehen, passenste Möglichkeiten erarbeiten und dann perfekte Designs erstellen - das ist meine berufliche Passion!</strong></p>
      <p>Hallo und herzlich willkommen auf meiner Seite, ich bin <strong>Sascha Nabrotzky.</strong></p>
      <p>Bei allen größeren Projekten, die ich umsetze, ist eine gute <strong>Nutzererfahrung</strong> sehr wichtig. Die Nutzererfahrung geht weit über das visuelle Design hinaus und fängt auch viel eher im ganzen Zusammenspiel der komplexen Design-Systeme an.</p>
      <p>Ich erstelle <strong>statische Websites</strong> in HTML5, SCSS und JavaScript - auch Gatsby JS und React JS kommen bei mir seit Neuestem zum Einsatz. Statische Seiten sind schnell und eignen sich gut für Portfolios oder Projekte in ähnlicher Größe.</p>
      <p><strong>Contentmanagement-Systeme,</strong> wie z. B. Joomla!, setze ich dann ein, wenn die Seite mit dem Unternehmen mitwachsen soll und mehrere Personen gleichzeitig auf einfache Art und Weise Berichte/Fotos veröffentlichen müssen oder ihre Internetpräsenz pflegen wollen.</p>
      <div className={indexStyle.logoWrapper}>
        <img src={logoJoomla} alt="Joomla!-Logo"></img>
        <img src={logoReact} alt="React-Logo"></img>
        <img src={logoGatsby} alt="Gatsby-Logo"></img>
        <img src={logoSass} alt="SASS-Logo"></img>
      </div>
    </Layout>
  )
}
