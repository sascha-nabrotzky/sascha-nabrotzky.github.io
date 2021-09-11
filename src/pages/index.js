import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import GithubProjects from "../components/githubprojects"
import * as indexStyle from "../components/index.module.scss"
import logoJoomla from "../images/joomla-logo.svg"
import logoReact from "../images/react-logo.svg"
import logoGatsby from "../images/gatsby-logo.svg"
import logoSass from "../images/sass-logo.svg"
import logoJs from "../images/js-logo.svg"
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
        <h1>Komplexe Systeme auf's Display gebracht!</h1>
        <p>
          Hallo und herzlich willkommen auf meiner Seite, ich bin{" "}
          <strong>Sascha Nabrotzky.</strong>
        </p>
        <p>
          Ich habe viele Jahre Erfahrung im Online-Bereich und brachte mir das
          Programmieren von Websites selber bei. Ich liebe das vernetzen und
          abrufen von Daten, ohne das Design aus den Augen zu verlieren.
        </p>
        <p>
          Ich erstelle z. B. Websites als <strong>headless CMS</strong> mit{" "}
          <strong>ReactJS, GastyJS, SCSS und GraphQL.</strong>{" "}
          Contentmanagement-Systeme, wie z. B. <strong>Joomla!,</strong> setze
          ich dann ein, wenn eine datenbankgestützte Website erstellt werden
          muss.
        </p>
        <p>
          Bei allen größeren Projekten, die ich umsetze, ist gutes{" "}
          <strong>UX-Design</strong> sehr wichtig. Die Nutzererfahrung geht weit
          über das visuelle Design hinaus und fängt auch viel eher im ganzen
          Zusammenspiel der komplexen Design-Systeme an.
        </p>
        <GithubProjects />
        <div className={indexStyle.logoWrapper}>
          <img src={logoReact} alt="React-Logo"></img>
          <img src={logoGatsby} alt="Gatsby-Logo"></img>
          <img src={logoJs} alt="JS-Logo"></img>
          <img src={logoSass} alt="SASS-Logo"></img>
          <img src={logoJoomla} alt="Joomla!-Logo"></img>
        </div>
      </Layout>
    </>
  )
}
