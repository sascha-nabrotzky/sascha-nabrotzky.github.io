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
            <h2>Meine Projekte</h2>
            <p>Hier ist eine kleine Auswahl meiner Projekte.</p>

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