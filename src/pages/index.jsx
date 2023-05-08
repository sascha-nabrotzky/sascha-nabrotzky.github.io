import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import * as style from "../styling/index.module.scss"
import LineSvg from "../components/line-svg"
import GithubProjects from "../components/githubprojects"
import socMedImg from "../images/socMedImg.jpg"

export default function Home() {
  const data = useStaticQuery(graphql`
    query SEOQuery {
      site {
        siteMetadata {
          title
          description
          author
          image
          url
        }
      }
    }
  `)

  useEffect(() => {
    // Variables must be outside of typewriter function
    let i = 0
    const text = "Hallo und herzlich willkommen auf meiner Seite"
    const speed = 100

    function typewriter() {
      if (i < text.length) {
        document.querySelector("h2").innerHTML += text.charAt(i)
        i++
        setTimeout(typewriter, speed)
      }
    }

    typewriter()

    // Cleanup function for useEffect to prevent
    return () => {
      i = text.length
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <meta name="title" content={data.site.siteMetadata.title} />
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta name="author" content={data.site.siteMetadata.author} />
        <meta name="keywords" content={data.site.siteMetadata.keywords} />
        <meta name="image" content={socMedImg} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={data.site.siteMetadata.title} />
        <meta name="twitter:image" content={socMedImg} />
        <meta property="og:title" content={data.site.siteMetadata.title} />
        <meta
          property="og:description"
          content={data.site.siteMetadata.description}
        />
        <meta property="og:image" content={socMedImg} />
        <meta property="og:url" content={data.site.siteMetadata.url} />
        <meta property="og:type" content="website" />
        <html lang="de" />
      </Helmet>
      <Layout>
        <h1>Komplexe Systeme auf das Display gebracht!</h1>
        <h2 className={style.blink}></h2>
        <p>
          Ich bin <strong>Sascha Nabrotzky. </strong>
          Die Kombination von <strong>
            Programmier-/Design-Kenntnissen
          </strong>{" "}
          ist meine Stärke. Ich liebe es Dinge zu hinterfragen, zu optimieren
          und nutzerzentrierten Design-Systemen{" "}
          <strong>&ldquo;Leben&rdquo; einzuprogrammieren.</strong> Beständiges Lernen,
          Neugierde und viel Kreativität zeichnen mich ebenfalls aus.
        </p>

        <LineSvg />

        <p>
          Als ausgebildeter Mediengestalter hatte ich mich zusätzlich
          autodidaktisch in den wichtigsten Web-Technologien weitergebildet und
          dadurch auf <strong>UI-/UX-Design </strong>
          und <strong> Frontend-Entwicklung</strong> responsiver Websites/User-Interfaces
          spezialisiert.
        </p>
        <p>
          Aktuell arbeite ich als &ldquo;Webdesigner UI/UX&rdquo; in einem Unternehmen im Wellness/Spa-Erlebnis-Bereich. Ich erarbeite dort für Apps,
          Websites und Displays die optimalste <strong>User-Experience,</strong>{" "}
          designe das <strong>User-Interface</strong> und
          programmiere das Frontend mit <strong>React, Typoscript, Tailwind</strong>{" "}
          und <strong>SCSS/CSS3.</strong>. Zudem entwickle ich im Team das Design-System mit und programmiere die Komponenten-Bibliothek für die Entwickler.
        </p>
        <p>
          Verheiratet und als Familienvater mit zwei Kindern lebe ich im
          ländlichen Ladbergen, wenn ich mal nicht am coden bin, dann findet man
          mich beim Fotografieren ... oder im Garten ... oder beim Illustrieren.
        </p>

        <GithubProjects />
      </Layout>
    </>
  )
}
