import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as aboutStyle from "../components/about.module.scss"
import fotoVonMir from "../images/Sascha_Nabrotzky_sw.jpg"
import TimeLineJSON from "../components/timeline.json"

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Sascha Nabrotzky</title>
        <meta name="title" content="About | Sascha Nabrotzky" />
        <meta
          name="description"
          content="Timeline meiner beruflichen Qualifikation"
        />
        <meta name="keywords" content="Timeline, Werdegang, Qualifikation" />
      </Helmet>
      <Layout>
        <h1>Never stop learning!</h1>
        <p>
          Als verheirateter Familienvater mit zwei Kindern lebe ich im
          ländlichen Ladbergen, schon seit Jahren ist die{" "}
          <strong>
            nutzerzentrierte Frontend-Entwicklung mein Interessengebiet.
          </strong>{" "}
        </p>
        <p>
          Computer und Gestaltung habe ich schon in der Schulzeit kombiniert,
          darauf folgten jahrelange Erfahrung im grafischen Gewerbe und auch ein
          paar Preise habe ich gewonnen. Ich brachte mir autodidaktisch{" "}
          <strong>HTML5, SCSS</strong> und vor allem
          <strong> JavaScript,</strong> gefolgt von <strong>React.js</strong>{" "}
          und <strong>Gatsby.js</strong> bei. Mit jeder neuen Technologie
          eröffnen sich mir unglaublich spannende Möglichkeiten, die mich
          herausfordern und ich erschließen kann -{" "}
          <strong>Typo3, Fluid, Bootstrap, Docker, DDEV, Git </strong>
          und headless CMS sind ein paar davon.
        </p>

        <p>
          Zurückblickend kann ich sagen, dass meine Stärken ganz klar in der{" "}
          <strong>Kombination von Programmierkenntnissen und Design</strong>{" "}
          liegen und ich konstant neue Programmiertechniken lerne oder vertiefe.
        </p>

        <p>
          Da ich ja nicht nur in Quellcode herumtippen kann, bin ich sonst ganz
          gerne mit meiner Familie oder diversen Holzarbeiten beschäftigt.
        </p>

        <div className={aboutStyle.timeLinePoint}>
          <div id="fotovonmir">
            <img src={fotoVonMir} alt="Foto von Sascha Nabrotzky" />
          </div>
        </div>

        {TimeLineJSON.jahrtaetigkeit.map(point => {
          return (
            <section key={point.jahr.toString()}>
              <div className={aboutStyle.linie}></div>

              <div className={aboutStyle.timeLinePoint}>
                <div className={aboutStyle.circleImg}>
                  <p dangerouslySetInnerHTML={{ __html: point.jahr }}></p>
                </div>
                <p dangerouslySetInnerHTML={{ __html: point.taetigkeit }}></p>
              </div>
            </section>
          )
        })}
      </Layout>
    </>
  )
}
