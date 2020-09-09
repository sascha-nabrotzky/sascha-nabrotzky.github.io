import React from "react"
import Layout from "../components/layout"
import indexStyle from "../components/index.module.scss"

export default function Home() {

  return (
    <Layout>
      <h1>Komplexe Systeme auf eine Website gebracht!</h1>
      <p>Alle Projekte, die ich umsetze, werden unter Beachtung guter Userexperience (UX-Design) und guter Usability (UI-Design) geplant und programmiert.</p>
      <p>Ich erstelle statische Websites in HTML5, SCSS und JavaScript - auch GatsbyJS und React kommen bei mir seit Neuestem zum Einsatz. Statische Seiten eignen sich gut für Portfolios, die nicht sehr häufig aktualisiert werden müssen, statische Seiten sind generell schneller, als ein Contentmanagement-System.</p>
      <p>Contentmanagement-Systeme, wie z. B. Joomla!, kommen bei mir dann zum Einsatz, wenn die Seite mit dem Unternehmen mitwachsen soll und einzelne/mehrere Personen gleichzeitig auf einfache Art und Weise Artikel veröffentlicht oder ihre Internetpräsenz pflegen wollen.</p>
      <div className={indexStyle.logoWrapper}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Joomla%21-Logo.svg" alt="Joomla!-Logo"></img>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React-Logo"></img>
        <img src="https://www.gatsbyjs.com/Gatsby-Logo.svg" alt="Gatsby-Logo"></img>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg" alt="SASS-Logo"></img>
      </div>
    </Layout>
  )
}
