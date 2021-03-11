import React from "react"
import Layout from "../components/layout"
import indexStyle from "../components/index.module.scss"
import logoJoomla from "../images/joomla-logo.svg"
import logoReact from "../images/react-logo.svg"
import logoGatsby from "../images/gatsby-logo.svg"
import logoSass from "../images/sass-logo.svg"
import logoJs from "../images/js-logo.svg"

export default function Home() {

  return (
    <Layout>
      <h1>Komplexe Systeme in einer Web-App verwirklicht!</h1>
      <p>Hallo und herzlich willkommen auf meiner Seite, ich bin <strong>Sascha Nabrotzky.</strong></p>
      <p>Ich habe viele Jahre Erfahrung im Online-Bereich und brachte mir das Programmieren von Web-APPs selber bei. Ich liebe das vernetzen und abrufen von Daten, ohne das Design aus den Augen zu verlieren.</p>
      <p>Ich erstelle <strong>Web-APPs und headless CMSs</strong> mit ReactJS, GastyJS, SCSS und GraphQL. Contentmanagement-Systeme, wie z. B. <strong>Joomla!,</strong> setze ich dann ein, wenn ein Unternehmen eine datenbankgestützte Website braucht.</p>
      <p>Bei allen größeren Projekten, die ich umsetze, ist eine gutes <strong>UX-Design</strong> sehr wichtig. Die Nutzererfahrung geht weit über das visuelle Design hinaus und fängt auch viel eher im ganzen Zusammenspiel der komplexen Design-Systeme an.</p>
      <div className={indexStyle.logoWrapper}>
        <img src={logoReact} alt="React-Logo"></img>
        <img src={logoGatsby} alt="Gatsby-Logo"></img>
        <img src={logoJs} alt="JS-Logo"></img>
        <img src={logoSass} alt="SASS-Logo"></img>
        <img src={logoJoomla} alt="Joomla!-Logo"></img>
      </div>
    </Layout>
  )
}
