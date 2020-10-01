import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import Hero from "./hero"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import layoutStyles from "./layout.module.scss"

export default function Layout({ children }) {

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
        }`
        )

    return (
        <div className={layoutStyles.container}>

            <div>
             <Helmet>
                <title>{data.site.siteMetadata.title}</title>
                <meta name="title" content={data.site.siteMetadata.title}/>
                <meta name="description" content={data.site.siteMetadata.description}/>
                <meta name="author" content={data.site.siteMetadata.author}/>
                <meta name="keywords" content={data.site.siteMetadata.keywords}/>
                <meta name="image" content={data.site.siteMetadata.image}/>
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:title" content={data.site.siteMetadata.title} />
                <meta name="twitter:image" content={data.site.siteMetadata.image} />
                <meta property="og:title" content={data.site.siteMetadata.title}/>
                <meta property="og:description" content={data.site.siteMetadata.description}/>
                <meta property="og:image" content={data.site.siteMetadata.image}/>
                <meta property="og:url" content={data.site.siteMetadata.url}/>
                <meta property="og:type" content="website"/>
                <html lang="de" />
            </Helmet>
            </div>

            <Header />

            <Hero />
            <div className={layoutStyles.content}>
                {children}
            </div>
            
            <Footer />
        </div>
    )
}