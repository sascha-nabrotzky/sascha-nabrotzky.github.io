import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import * as headerStyles from "./header.module.scss"

export default function Header() {
  const data = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.logowrapper}>
        <Link className={headerStyles.logo} to="/">
          <div className={headerStyles.circle1}></div>
          <div className={headerStyles.circle2}></div>
          <p>s/n</p>
        </Link>
        <p className={headerStyles.author}>{data.site.siteMetadata.author}</p>
      </div>
      <nav>
        <ul className={headerStyles.navList}>
          <li>
            <Link
              className={headerStyles.navLink}
              activeClassName={headerStyles.activeNavLink}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.navLink}
              activeClassName={headerStyles.activeNavLink}
              to="/projects"
            >
              Projekte
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.navLink}
              activeClassName={headerStyles.activeNavLink}
              to="/timeline"
            >
              Timeline
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.navLink}
              activeClassName={headerStyles.activeNavLink}
              to="/contact"
            >
              Kontakt
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
