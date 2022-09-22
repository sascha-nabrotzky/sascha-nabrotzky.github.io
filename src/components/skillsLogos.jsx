import React from "react"
import * as style from "../styling/skills.module.scss"
import logoTypo3 from "../images/TYPO3_Logo.svg"
import logoReact from "../images/react-logo.svg"
import logoGatsby from "../images/gatsby-logo.svg"
import logoSass from "../images/sass-logo.svg"
import logoHTML5 from "../images/HTML5_logo.svg"
import logoJs from "../images/js-logo.svg"
import logoGit from "../images/git-quad-logo.svg"
import logoCSS3 from "../images/CSS3_Logo-min.svg"
import logoBootstrap from "../images/bootstrap-logo-min.svg"
import logoNpm from "../images/npm-logo-min.svg"
import logoDDEV from "../images/DDEV-Logo_min.svg"

export default function SkillsLogos() {
  return (
    <div className={style.techStackWrapper}>
      <h2>Hauptsächlich/Hauptberuflich nutze ich</h2>
      <div className={style.logoWrapper}>
        <img
          src={logoTypo3}
          title="TYPO3 CMS"
          alt="TYPO3-Logo"
          loading="lazy"
        ></img>
        <img
          src={logoBootstrap}
          title="Bootstrap 5 Framework"
          alt="Bootstrap-Logo"
          loading="lazy"
        ></img>
        <img
          src={logoHTML5}
          title="HTML5"
          alt="HTML5-Logo"
          loading="lazy"
        ></img>
        <img src={logoCSS3} title="CSS3" alt="CSS3-Logo" loading="lazy"></img>
        <img
          src={logoSass}
          title="SASS/SCSS Preprozessor"
          alt="SASS-Logo"
          loading="lazy"
        ></img>
        <img
          src={logoGit}
          title="Git - Versionierung"
          alt="Git-Logo"
          loading="lazy"
        ></img>
        <img src={logoDDEV} title="DDEV" alt="DDEV-Logo" loading="lazy"></img>
      </div>

      <h2>Für meine eigenen Projekte zusätzlich</h2>
      <div className={style.logoWrapper}>
        <img src={logoJs} title="JavaScript" alt="JS-Logo" loading="lazy"></img>
        <img
          src={logoReact}
          title="React"
          alt="React-Logo"
          loading="lazy"
        ></img>
        <img
          src={logoGatsby}
          title="Gatsby - A Static Site Generator"
          alt="Gatsby-Logo"
          loading="lazy"
        ></img>
        <img
          src={logoNpm}
          title="npm - node package manager"
          alt="Npm-Logo"
          loading="lazy"
        ></img>
      </div>
    </div>
  )
}
