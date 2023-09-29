import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import Sidemenu from "../components/sidemenu"
import socMedImg from "../images/socMedImg.jpg"
import GithubProjects from "../components/GithubProjects"
import * as styles from "../styles/projects.module.scss"

const Projects = () => {
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
      <Layout>
        <h1>Meine Projekte</h1>
        <section>
          {data.allMarkdownRemark.edges.map(edge => {
            return (
              <div className={styles.projects} key={edge.node.id.toString()}>
                <h2 id={edge.node.id.toString()}>
                  {edge.node.frontmatter.title}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: edge.node.html }}></div>
              </div>
            )
          })}
        </section>

        <GithubProjects />
      </Layout>
      <Sidemenu />
    </>
  )
}

export default Projects

export const Head = () => {
  return (
    <>
      <html lang="de" />
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
    </>
  )
}
