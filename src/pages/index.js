import React from "react"
import Layout from "../components/layout"
import indexStyle from "../components/index.module.scss"

export default function Home() {

  return (
    <Layout>
      <h1>Komplexe Systeme auf eine Website gebracht!</h1>
      <p>Bei allen größeren Projekten, die ich umsetze, ist eine gute Nutzererfahrung (UX-Design) das Wichtigste, auf das ich achte. Diese geht weit über die eigentliche Website hinaus und fängt auch viel eher im ganzen Zusammenspiel der komplexen Systeme an.</p>
      <p>Ich erstelle statische Websites in HTML5, SCSS und JavaScript - auch GatsbyJS und ReactJS kommen bei mir zum Einsatz. Statische Seiten sind schnell und eignen sich gut für Portfolios oder Projekte in ähnlicher Größe.</p>
      <p>Contentmanagement-Systeme, wie z. B. Joomla!, setze ich dann ein, wenn die Seite mit dem Unternehmen mitwachsen soll und mehrere Personen gleichzeitig auf einfache Art und Weise Berichte/Fotos veröffentlichen müssen oder ihre Internetpräsenz pflegen wollen.</p>
      <div className={indexStyle.logoWrapper}>
        <img src="http://www.sascha-nabrotzky.de/images/joomla-logo.svg" alt="Joomla!-Logo"></img>
        <img src="http://www.sascha-nabrotzky.de/images/react-logo.svg" alt="React-Logo"></img>
        <img src="http://www.sascha-nabrotzky.de/images/gatsby-logo.svg" alt="Gatsby-Logo"></img>
        <img src="http://www.sascha-nabrotzky.de/images/sass-logo.svg" alt="SASS-Logo"></img>
      </div>
    </Layout>
  )
}
