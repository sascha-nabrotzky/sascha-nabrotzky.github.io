import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import headerStyles from "./header.module.css"

export default function Header() {
    const data = useStaticQuery(graphql`
        query MyQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <header className={headerStyles.header}> 
            <h1>
                <Link className={headerStyles.title} to="/">
                    {data.site.siteMetadata.title}
                </Link>
            </h1>
            <nav>
                <ul className={headerStyles.navList}>
                    <li>
                        <Link className={headerStyles.navLink} activeClassName={headerStyles.activeNavLink} to="/">Home</Link>
                    </li>
                    <li>
                        <Link className={headerStyles.navLink} activeClassName={headerStyles.activeNavLink} to="/about">Über</Link>
                    </li>
                    <li>
                        <Link className={headerStyles.navLink} activeClassName={headerStyles.activeNavLink} to="/projects">Projekte</Link>
                    </li>
                    <li>
                        <Link className={headerStyles.navLink} activeClassName={headerStyles.activeNavLink} to="/contact">Kontakt</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}