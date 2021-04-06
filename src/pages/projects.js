import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as projectStyle from "../components/projects.module.scss"

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
                    <meta name="title" content="Projekte | Sascha Nabrotzky"/>
                    <meta name="description" content="Kleine Auswahl meiner Projekte"/>
                    <meta name="keywords" content="Projekte, Projects, React, Gatsby, JavaScript, UI/UX-Design"/>
            </Helmet>
            <Layout>
                    <h1>Meine Projekte</h1>
                    <p>Hier ist eine Auswahl meiner umfangreicheren <strong>Website-Projekte,</strong> bei denen ich alles <strong>von Grund auf planen und erstellen</strong> und auch die Nutzererfahrung optimieren konnte, häufig gestaltete ich ebenfalls die restlichen Werbemittel.</p>

                    <ol>
                        {data.allMarkdownRemark.edges.map((edge) => {
                        return (
                                <li className={projectStyle.projects} key={edge.node.id.toString()}>
                                    <h3>{edge.node.frontmatter.title}</h3>
                                    <div dangerouslySetInnerHTML={{ __html: edge.node.html }}></div>
                                </li>
                            )
                        })}
                    </ol>
            </Layout>
        </>
    )  
  }