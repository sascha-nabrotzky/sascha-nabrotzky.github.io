import React from "react"
import logoReact from "../icons//react-logo_white.svg"
import logoGatsby from "../icons/gatsby-logo_white.svg"
import logoSass from "../icons/sass-logo_white.svg"
import logoHTML5 from "../icons/HTML5_logo_weiss.svg"
import logoJs from "../icons/js-logo_white.svg"
import logoGit from "../icons/git-quad-logo_white.svg"
import logoCSS3 from "../icons/CSS3_Logo_weiss.svg"
import logoTailwind from "../icons/tailwind-logo_white.svg"
import logoTypescript from "../icons/Typescript_Logo_white.svg"
import logoPhotoshop from "../icons/Photoshop-Logo_weiss.svg"
import logoIllustrator from "../icons/Illustrator-Logo_weiss.svg"
import logoFigma from "../icons/Figma-Logo.svg"
import logoUX from "../icons/ux-design.svg"
import logoUI from "../icons/ui-design.svg"
import logoUXResearch from "../icons/ux-research.svg"
import logoUbuntu from "../icons/Ubuntu-Logo_weiss.svg"
import * as style from "../styles/skills.module.scss"

const SkillsSections = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.logosMain}>
        <h2 className={style.headline}>Web-Entwicklung</h2>
        <div className={style.skill}>
          <img src={logoCSS3} title="CSS3" alt="CSS3-Logo" loading="lazy"></img>
          <p className={style.rating}>
            CSS3
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoSass}
            title="SASS/SCSS Preprozessor"
            alt="SASS-Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            SASS
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoTailwind}
            title="Tailwind CSS"
            alt="Tailwind-Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Tailwind CSS
            <br />
            ***
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoHTML5}
            title="HTML5"
            alt="HTML5-Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            HTML5
            <br />
            ***
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoJs}
            title="JavaScript"
            alt="JS-Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            JavaScript
            <br />
            **
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoReact}
            title="React"
            alt="React-Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            React.js
            <br />
            **
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoTypescript}
            title="React"
            alt="React-Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            TypeScript
            <br />*
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoGatsby}
            title="Gatsby - A Static Site Generator"
            alt="Gatsby-Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Gatsby.js
            <br />
            **
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoGit}
            title="Git - Versionierung"
            alt="Git-Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Git
            <br />
            **
          </p>
        </div>
      </div>
      <div className={style.logosMain}>
        <h2 className={style.headline}>Design</h2>
        <div className={style.skill}>
          <img
            src={logoUX}
            title="UX-Design"
            alt="UX-Design Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            UX-Design
            <br />
            ***
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoUI}
            title="UI-Design"
            alt="UI-Design Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            UI-Design
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoUXResearch}
            title="UX-Research"
            alt="UX-Research"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            UX-Research
            <br />
            **
          </p>
        </div>
      </div>
      <div className={style.logosMain}>
        <h2 className={style.headline}>Tools</h2>
        <div className={style.skill}>
          <img
            src={logoPhotoshop}
            title="Adobe Photoshop"
            alt="Adobe Photoshop Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Photoshop
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoIllustrator}
            title="Adobe Illustrator"
            alt="Adobe Illustrator Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Illustrator
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoFigma}
            title="Figma"
            alt="Figma Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Figma
            <br />
            <span>**</span>
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoUbuntu}
            title="Ubuntu Linux"
            alt="Ubuntu Logo Linus"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Ubuntu
            <br />
            **
          </p>
        </div>
      </div>
      <span className={style.legend}>
        * Grundkenntnisse; ** Erweiterte Grundkenntnisse; *** Gute Kenntnisse;
        **** Sehr gute Kenntnisse
      </span>
    </div>
  )
}

export default SkillsSections
