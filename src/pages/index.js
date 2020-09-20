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
      <p>Ich bin Sascha Nabrotzky und meine berufliche Passion ist das Programmieren von <strong>nutzerzentrierten Websites</strong> mit vorhergehender <strong>User-Research</strong> und dem Prototyping der Website. Die gewonnen Erkenntnisse fließen natürlich auch in die restlichen Werbematerialien ein.</p>
      <p>Bei allen größeren Projekten, die ich umsetze, ist eine gute <strong>Nutzererfahrung</strong> (UX-Design) das Wichtigste, auf das ich achte. Die Nutzererfahrung geht weit über die eigentliche Website hinaus und fängt auch eher im ganzen Zusammenspiel der komplexen Systeme an.</p>
      <p>Ich erstelle <strong>statische Websites</strong> in HTML5, SCSS und JavaScript - auch GatsbyJS und ReactJS kommen bei mir seit Neuestem zum Einsatz. Statische Seiten sind schnell und eignen sich gut für Portfolios oder Projekte in ähnlicher Größe.</p>
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
