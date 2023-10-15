import React from "react"
import { ReactComponent as LogoReact } from "../icons/react-logo_white.svg"
import { ReactComponent as LogoGatsby } from "../icons/gatsby-logo_white.svg"
import { ReactComponent as LogoSass } from "../icons/sass-logo_white.svg"
import { ReactComponent as LogoHTML5 } from "../icons/HTML5_logo_weiss.svg"
import { ReactComponent as LogoJs } from "../icons/js-logo_white.svg"
import { ReactComponent as LogoGit } from "../icons/git-quad-logo_white.svg"
import { ReactComponent as LogoCSS3 } from "../icons/CSS3_Logo_weiss.svg"
import { ReactComponent as LogoTailwind } from "../icons/tailwind-logo_white.svg"
import { ReactComponent as LogoTypescript } from "../icons/Typescript_Logo_white.svg"
import { ReactComponent as LogoPhotoshop } from "../icons/Photoshop-Logo_weiss.svg"
import { ReactComponent as LogoIllustrator } from "../icons/Illustrator-Logo_weiss.svg"
import { ReactComponent as LogoFigma } from "../icons/Figma-Logo.svg"
import { ReactComponent as LogoUX } from "../icons/ux-design.svg"
import { ReactComponent as LogoUI } from "../icons/ui-design.svg"
import { ReactComponent as LogoUXResearch } from "../icons/ux-research.svg"
import { ReactComponent as LogoUbuntu } from "../icons/Ubuntu-Logo_weiss.svg"
import * as style from "../styles/skills.module.css"

function SkillsSections() {
  return (
    <div className={style.wrapper}>
      <div className={style.logosMain}>
        <h2 className={style.headline}>Web-Entwicklung</h2>
        <div className={style.skill}>
          <LogoCSS3 />
          <p className={style.rating}>
            CSS3
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <LogoSass />
          <p className={style.rating}>
            SASS
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <LogoTailwind />
          <p className={style.rating}>
            Tailwind CSS
            <br />
            ***
          </p>
        </div>
        <div className={style.skill}>
          <LogoHTML5 />
          <p className={style.rating}>
            HTML5
            <br />
            ***
          </p>
        </div>
        <div className={style.skill}>
          <LogoJs />
          <p className={style.rating}>
            JavaScript
            <br />
            **
          </p>
        </div>
        <div className={style.skill}>
          <LogoReact />
          <p className={style.rating}>
            React.js
            <br />
            **
          </p>
        </div>
        <div className={style.skill}>
          <LogoTypescript />
          <p className={style.rating}>
            TypeScript
            <br />*
          </p>
        </div>
        <div className={style.skill}>
          <LogoGatsby />
          <p className={style.rating}>
            Gatsby.js
            <br />
            **
          </p>
        </div>
        <div className={style.skill}>
          <LogoGit />
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
          <LogoUX />
          <p className={style.rating}>
            UX-Design
            <br />
            ***
          </p>
        </div>
        <div className={style.skill}>
          <LogoUI />
          <p className={style.rating}>
            UI-Design
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <LogoUXResearch />
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
          <LogoPhotoshop />
          <p className={style.rating}>
            Photoshop
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <LogoIllustrator />
          <p className={style.rating}>
            Illustrator
            <br />
            ****
          </p>
        </div>
        <div className={style.skill}>
          <LogoFigma />
          <p className={style.rating}>
            Figma
            <br />
            <span>**</span>
          </p>
        </div>
        <div className={style.skill}>
          <LogoUbuntu />
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
