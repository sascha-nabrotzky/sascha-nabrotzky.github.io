import React from "react"
import logoTypo3 from "../images/TYPO3_Logo_white.svg"
import logoJoomla from "../images/joomla-logo_icon_weiss.svg"
import logoReact from "../images/react-logo_white.svg"
import logoGatsby from "../images/gatsby-logo_white.svg"
import logoSass from "../images/sass-logo_white.svg"
import logoHTML5 from "../images/HTML5_logo_weiss.svg"
import logoJs from "../images/js-logo_white.svg"
import logoGit from "../images/git-quad-logo_white.svg"
import logoCSS3 from "../images/CSS3_Logo_weiss.svg"
import logoBootstrap from "../images/bootstrap-logo_white.svg"
import logoNpm from "../images/npm-logo_white.svg"
import logoDDEV from "../images/DDEV-Logo_quad_white.svg"
import logoPhotoshop from "../images/Photoshop-Logo_weiss.svg"
import logoIllustrator from "../images/Illustrator-Logo_weiss.svg"
import logoInDesign from "../images/InDesign-Logo_weiss.svg"
import logoPenpot from "../images/penpot_Logo.svg"
import logoUX from "../images/ux-design.svg"
import logoUI from "../images/ui-design.svg"
import logoUXResearch from "../images/ux-research.svg"
import logoInkscape from "../images/inkscape-Logo_white.svg"
import logoUbuntu from "../images/Ubuntu-Logo_weiss.svg"
import logoInformArchi from "../images/content.svg"
import logoMedien from "../images/Mediengestaltung.svg"
import * as style from "../styling/skills.module.scss"

export default function SkillsLogos() {
  return (
    <div>
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
            SASS/SCSS
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoBootstrap}
            title="Bootstrap 5 Framework"
            alt="Bootstrap-Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Bootstrap 5
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
            src={logoTypo3}
            title="TYPO3 CMS"
            alt="TYPO3-Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            TYPO3 CMS
            <br />
            **
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoJoomla}
            title="Joomla! CMS"
            alt="Joomla-Logo CMS"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Joomla!
            <br />
            **
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
        <div className={style.skill}>
          <img
            src={logoNpm}
            title="npm - node package manager"
            alt="Npm-Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            npm
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
            <br />*
          </p>
        </div>
        <div className={style.skill}>
          <img src={logoDDEV} title="DDEV" alt="DDEV-Logo" loading="lazy"></img>
          <p className={style.rating}>
            DDEV
            <br />*
          </p>
        </div>
      </div>
      <div className={style.logosMain}>
        <h2 className={style.headline}>Design</h2>
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
            src={logoInformArchi}
            title="Informations-Architektur (UX)"
            alt="Informations-Architektur Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Inform.-Architekt.
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
        <div className={style.skill}>
          <img
            src={logoMedien}
            title="Mediengestaltung"
            alt="Mediengestaltung Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Mediengestaltung
            <br />
            ****
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
            src={logoInDesign}
            title="Adobe InDesign"
            alt="Adobe InDesign Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            InDesign
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoPenpot}
            title="Penpot Prototyping"
            alt="Penpot Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Penpot
            <br />
            <span>**</span>
          </p>
        </div>
        <div className={style.skill}>
          <img
            src={logoInkscape}
            title="Inkscape"
            alt="Inkscape Logo"
            loading="lazy"
          ></img>
          <p className={style.rating}>
            Inkscape
            <br />
            ***
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
      <span class={style.legend}>
        * Grundkenntnisse; ** Erweiterte Grundkenntnisse; *** Gute Kenntnisse;
        **** Sehr gute Kenntnisse
      </span>
    </div>
  )
}
