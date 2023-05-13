import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import Sidemenu from "../components/sidemenu"
import socMedImg from "../images/socMedImg.jpg"
import * as projectStyle from "../styles/projects.module.scss"

export default function Projects() {
  const data = useStaticQuery(graphql`
    query projectsQuery {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
            }
            html
            id
          }
        }
      }
    }
  `)

  return (
    <>
      <Helmet>
        <title>Projekte | Sascha Nabrotzky</title>
        <meta name="title" content="Projekte | Sascha Nabrotzky" />
        <meta
          name="description"
          content="Hier ist eine Auswahl meiner Projekte, bei denen mir gute
          Nutzererfahrung wichtig war und auch das UI-Design planen und umsetzen konnte."
        />
        <meta
          name="keywords"
          content="Projekte, Projects, React, Gatsby, JavaScript, UI/UX-Design"
        />
        <meta name="image" content={socMedImg} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Projekte | Sascha Nabrotzky" />
        <meta name="twitter:image" content={socMedImg} />
        <meta property="og:title" content="Projekte | Sascha Nabrotzky" />
        <meta
          property="og:description"
          content="Hier ist eine Auswahl meiner Projekte, bei denen mir gute
          Nutzererfahrung wichtig war und auch das UI-Design planen und umsetzen konnte."
        />
        <meta property="og:image" content={socMedImg} />
        <meta property="og:type" content="website" />
        <html lang="de" />
      </Helmet>
      <Layout>
        <h1>Meine Projekte</h1>
        <p>
          Hier ist eine Auswahl meiner Projekte, bei denen mir gute
          <strong> Nutzererfahrung </strong>wichtig war und auch das{" "}
          <strong>UI-Design</strong> planen und umsetzen konnte. Mir ist es
          immer wichtig auf einer guten qualitativen und quantitativen
          Daten-/Informationslage das Design zu erstellen und mit modernsten
          Technologien zu <strong>programmieren.</strong> Grundsätzlich teste
          ich alle Seiten und Änderungen mit Hilfe von{" "}
          <strong>"Heuristic Markup"</strong> und dem{" "}
          <strong>5-Sekunden-Test.</strong> Bei einigen Projekten habe ich
          weitere <strong>Werbemittel</strong> und{" "}
          <strong>Illustrationen</strong> erstellt.
        </p>

        <ol>
          {data.allMarkdownRemark.edges.map(edge => {
            return (
              <li
                className={projectStyle.projects}
                key={edge.node.id.toString()}
              >
                <h3 id={edge.node.id.toString()}>
                  {edge.node.frontmatter.title}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: edge.node.html }}></div>
              </li>
            )
          })}
        </ol>
      </Layout>
      <Sidemenu />
    </>
  )
}
