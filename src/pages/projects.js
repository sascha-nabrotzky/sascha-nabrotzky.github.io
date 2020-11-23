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
            <p>Hier ist eine Auswahl meiner etwas umfangreicheren <strong>Website-Projekte,</strong> bei denen ich nicht nur durch die Nutzererfahrung optimieren konnte, sondern auch die Gestaltung der restlichen Werbemittel umsetzte.</p>

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