import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import projectStyle from "../components/projects.module.scss"

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
                }
            }
            }
        }
    `)

    return (
        <Layout>
            <h1>Meine Projekte</h1>
            <p>Hier ist eine kleine Auswahl meiner etwas umfangreicheren Projekte, bei denen ich sowohl die Planung für gutes UX-Design und auch die Erstellung der Website erfolgreich abschließen konnte.</p>

            <ol>
                {data.allMarkdownRemark.edges.map((edge) => {
                   return (
                        <li className={projectStyle.projects}>
                            <h3>{edge.node.frontmatter.title}</h3>
                            <div dangerouslySetInnerHTML={{ __html: edge.node.html }}></div>
                        </li>
                    )
                })}
            </ol>
        </Layout>
    )  
  }