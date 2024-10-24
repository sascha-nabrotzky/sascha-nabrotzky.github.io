import React, { useLayoutEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import Sidemenu from "../components/Sidemenu"
import socMedImg from "../images/socMedImg.jpg"
import * as styles from "../styles/projects.module.css"

const Projects = () => {
  const data = useStaticQuery(graphql`
    query projectsQuery {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            html
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
            }
            headings {
              value
            }
          }
        }
      }
    }
  `)

  console.log(data)

  useLayoutEffect(() => {
    const descriptionButton = document.querySelectorAll(
      ".description-button button"
    )

    descriptionButton.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault()
        if (e.target.parentElement.nextElementSibling.style.height === "auto") {
          e.target.parentElement.nextElementSibling.style.height = 0
          e.target.innerHTML = "Projektbeschreibung +"
        } else {
          e.target.parentElement.nextElementSibling.style.height = "auto"
          e.target.innerHTML = "Projektbeschreibung &ndash;"
        }
      })
    })
  }, [])

  return (
    <>
      <Layout>
        <h1>Meine Projekte</h1>
        <section>
          {data.allMarkdownRemark.edges.map((edge, index) => {
            return (
              <div
                className={styles.projects}
                key={edge.node.id.toString()}
                id={index}
              >
                <div dangerouslySetInnerHTML={{ __html: edge.node.html }}></div>
                <p className={styles.points}>&bull; &bull; &bull;</p>
              </div>
            )
          })}
        </section>

        <Sidemenu headings={data.allMarkdownRemark.edges} />
      </Layout>
    </>
  )
}

export default Projects

export function Head() {
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
