import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import * as style from "../styles/index.module.scss"
import LineSvg from "../components/line-svg"
import GithubProjects from "../components/githubprojects"
import socMedImg from "../images/socMedImg.jpg"

export default function Home() {

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
      <Layout>
        <h1>Komplexe Systeme auf das Display gebracht!</h1>
        <h2 className={style.blink}></h2>
        <p>
          Ich bin Sascha Nabrotzky, verheiratet und als Familienvater mit zwei Kindern lebe ich im
          ländlichen Ladbergen. Als <strong>Fullstack-Designer </strong> ist es die Kombination von <strong>Frontend-Entwicklung</strong> und <strong>UI/UX-Design-Kenntnissen, </strong>
          mit der ich messbare Erfolge erziele. Ich liebe es Website/PWA-Projekte umzusetzen, nutzerzentrierte Designs zu entwicklen oder Projekte auf gute Nutzbarkeit zu optimieren.
        </p>

        <LineSvg />

        <p>
          Ursprünglich als Mediengestalter ausgebildet, hatte ich mich zusätzlich
          in den wichtigsten Web-Technologien weitergebildet und
          dadurch auf Design und Programmierung responsiver Websites oder Displays spezialisiert.
        </p>
        <p>
          Am liebsten entwickle ich Websites mit <strong>React.js, </strong>setze das Design mit <strong>CSS3/SCSS</strong> oder 
          <strong> Tailwind CSS</strong> um, ich habe auch mit <strong>Storybook.js</strong> eine Komponenten-Bibliothek eingerichtet, die unternehmensweit zum Einsatz kommt. 
          Dadurch bin ich auch mit der Entwicklung eines <strong>Design-Systems</strong> vertraut.
        </p>
        <p>
           ... und wenn ich mal nicht am coden bin, dann findet man
          mich beim erstellen von Illustrationen.
        </p>
        

        <GithubProjects />
      </Layout>
    </>
  )
}

export const Head = () => {
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

  return (
    <>
      <html lang="de" />
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
    </>
    )
}
