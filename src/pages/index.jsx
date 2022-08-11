import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import LineSvg from "../components/line-svg"
import GithubProjects from "../components/githubprojects"
import * as indexStyle from "../styling/index.module.scss"
import logoTypo3 from "../images/TYPO3_Logo.svg"
import logoReact from "../images/react-logo.svg"
import logoGatsby from "../images/gatsby-logo.svg"
import logoSass from "../images/sass-logo.svg"
import logoHTML5 from "../images/HTML5_logo.svg"
import logoJs from "../images/js-logo.svg"
import logoGit from "../images/git-quad-logo.svg"
import logoCSS3 from "../images/CSS3_Logo-min.svg"
import logoBootstrap from "../images/bootstrap-logo-min.svg"
import logoNpm from "../images/npm-logo-min.svg"
import logoDDEV from "../images/DDEV-Logo_min.svg"
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
        <h2></h2>
        <p>
          Ich bin <strong>Sascha Nabrotzky. </strong>
          Als verheirateter Familienvater mit zwei Kindern lebe ich im
          ländlichen Ladbergen, schon seit Jahren ist die{" "}
          <strong>
            nutzerzentrierte Web-Entwicklung mein Interessengebiet.
          </strong>{" "}
        </p>
        <p>
          {" "}
          Mit jeder neuen Technologie eröffnen sich mir unglaublich spannende
          Möglichkeiten, die mich herausfordern und ich erschließen kann -{" "}
          <strong>JavaScript, SCSS, Typo3, React </strong>
          und auch Technologien, wie{" "}
          <strong>Fluid, Bootstrap, Docker, DDEV</strong> und{" "}
          <strong>Git</strong> sind ein paar davon.
        </p>
        <LineSvg />
        <aside className={indexStyle.techStackWrapper}>
          <div>
            <h2>Hauptsächlich nutze ich</h2>
            <div className={indexStyle.logoWrapper}>
              <img
                src={logoTypo3}
                title="TYPO3 CMS"
                alt="TYPO3-Logo"
                loading="lazy"
              ></img>
              <img
                src={logoBootstrap}
                title="Bootstrap 5 Framework"
                alt="Bootstrap-Logo"
                loading="lazy"
              ></img>
              <img
                src={logoHTML5}
                title="HTML5"
                alt="HTML5-Logo"
                loading="lazy"
              ></img>
              <img
                src={logoCSS3}
                title="CSS3"
                alt="CSS3-Logo"
                loading="lazy"
              ></img>
              <img
                src={logoSass}
                title="SASS/SCSS Preprozessor"
                alt="SASS-Logo"
                loading="lazy"
              ></img>
              <img
                src={logoGit}
                title="Git - Versionierung"
                alt="Git-Logo"
                loading="lazy"
              ></img>
              <img
                src={logoDDEV}
                title="DDEV"
                alt="DDEV-Logo"
                loading="lazy"
              ></img>
            </div>

            <h2>Für meine eigenen Projekte zusätzlich</h2>
            <div className={indexStyle.logoWrapper}>
              <img
                src={logoJs}
                title="JavaScript"
                alt="JS-Logo"
                loading="lazy"
              ></img>
              <img
                src={logoReact}
                title="React"
                alt="React-Logo"
                loading="lazy"
              ></img>
              <img
                src={logoGatsby}
                title="Gatsby - A Static Site Generator"
                alt="Gatsby-Logo"
                loading="lazy"
              ></img>
              <img
                src={logoNpm}
                title="npm - node package manager"
                alt="Npm-Logo"
                loading="lazy"
              ></img>
            </div>
          </div>
        </aside>
        <GithubProjects />
      </Layout>
    </>
  )
}
