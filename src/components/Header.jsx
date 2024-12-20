import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { ReactComponent as LinkedInLogo } from "../icons/LinkedIn-Logo.svg"
import { ReactComponent as XingLogo } from "../icons/Xing-Logo.svg"
import { ReactComponent as MailIcon } from "../icons/mail-icon.svg"
import { ReactComponent as GithubLogo } from "../icons/github-logo.svg"
import * as styles from "../styles/header.module.css"

const Header = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const Logo = () => {
    return (
      <div className={styles.logowrapper}>
        <Link className={styles.logo} to="/">
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
          <p>s/n</p>
        </Link>
        <p className={styles.author}>{data.site.siteMetadata.author}</p>
      </div>
    )
  }

  const LogoMobile = () => {
    return (
      <div className={styles.logowrapperMobile}>
        <Link className={styles.logo} to="/">
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
          <p>s/n</p>
        </Link>
        <p className={styles.author}>{data.site.siteMetadata.author}</p>
      </div>
    )
  }

  const [currentMail, setMail] = useState("")

  function addMail() {
    setMail("sascha.nabrotzky@online.de")
  }

  return (
    <>
      <LogoMobile />

      <div className={styles.navListWrapper}>
        <Logo />

        <nav className={styles.navList}>
          <Link
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            to="/"
          >
            About
          </Link>
          <Link
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            to="/projects"
          >
            Projekte
          </Link>
          <Link
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            to="/skills"
          >
            Skills
          </Link>
        </nav>

        <nav className={styles.navList}>
          <a
            href="https://www.linkedin.com/in/sascha-nabrotzky"
            className={styles.socialmediaLink}
            target="_blank"
            rel="noreferrer"
            alt="Sascha Nabrotzky auf LinkedIn"
            aria-label="Sascha Nabrotzky auf LinkedIn"
          >
            <LinkedInLogo className={styles.socialmediaLogo} />
          </a>
          <a
            href="https://www.xing.com/profile/Sascha_Nabrotzky/cv"
            className={styles.socialmediaLink}
            target="_blank"
            rel="noreferrer"
            alt="Sascha Nabrotzky auf Xing"
            aria-label="Sascha Nabrotzky auf Xing"
          >
            <XingLogo className={styles.socialmediaLogo} />
          </a>
          <a
            href="https://github.com/sascha-nabrotzky"
            className={styles.socialmediaLink}
            target="_blank"
            rel="noreferrer"
            alt="Sascha Nabrotzky auf Github"
            aria-label="Sascha Nabrotzky auf Github"
          >
            <GithubLogo className={styles.socialmediaLogo} />
          </a>
          <a
            className={styles.socialmediaLink}
            href={`mailto:${currentMail}`}
            onClick={addMail}
            alt="Sascha Nabrotzky per E-Mail kontaktieren"
            aria-label="Sascha Nabrotzky per E-Mail kontaktieren"
          >
            <MailIcon className={styles.socialmediaLogo} />
          </a>
        </nav>
      </div>
    </>
  )
}

export default Header
