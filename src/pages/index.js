import React, { useEffect } from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import GithubProjects from "../components/githubprojects"
import * as indexStyle from "../components/index.module.scss"
import logoTypo3 from "../images/TYPO3_Logo.svg"
import logoReact from "../images/react-logo.svg"
import logoGatsby from "../images/gatsby-logo.svg"
import logoSass from "../images/sass-logo.svg"
import logoHTML5 from "../images/HTML5_logo.svg"
import logoJs from "../images/js-logo.svg"
import logoDocker from "../images/docker-logo.svg"
import logoGit from "../images/git-quad-logo.svg"
import { useStaticQuery, graphql } from "gatsby"
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
  })

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
        <h2></h2>
        <p>
          Ich bin <strong>Sascha Nabrotzky. </strong>
          Als verheirateter Familienvater mit zwei Kindern lebe ich im
          ländlichen Ladbergen, schon seit Jahren ist die{" "}
          <strong>
            nutzerzentrierte Frontend-Entwicklung mein Interessengebiet.
          </strong>{" "}
        </p>
        <p>
          {" "}
          Mit jeder neuen Technologie eröffnen sich mir unglaublich spannende
          Möglichkeiten, die mich herausfordern und ich erschließen kann -{" "}
          <strong>Typo3, React, Fluid, Bootstrap, Docker, DDEV, Git </strong>
          mit Technologien, wie <strong>JavaScript, SCSS </strong>und HTML sind
          ein paar davon.
        </p>
        <GithubProjects />
        <aside className={indexStyle.techStackWrapper}>
          <h2>Meine Skills</h2>
          <div className={indexStyle.logoWrapper}>
            <img src={logoReact} alt="React-Logo" loading="lazy"></img>
            <img src={logoGatsby} alt="Gatsby-Logo" loading="lazy"></img>
            <img src={logoJs} alt="JS-Logo" loading="lazy"></img>
            <img src={logoHTML5} alt="HTML5-Logo" loading="lazy"></img>
            <img src={logoSass} alt="SASS-Logo" loading="lazy"></img>
            <img src={logoGit} alt="Git-Logo" loading="lazy"></img>
            <img src={logoDocker} alt="Docker-Logo" loading="lazy"></img>
            <img src={logoTypo3} alt="TYPO3-Logo" loading="lazy"></img>
          </div>
        </aside>
      </Layout>
    </>
  )
}
