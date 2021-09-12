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
          ländlichen Ladbergen. Schon seit Jahren ist die{" "}
          <strong>
            nutzerzentrierte Frontend-Entwicklung mein Interessengebiet,
          </strong>{" "}
          in dem ich mich weiterentickele und ständig etwas Neues lerne.
        </p>
        <p>
          2009 brachte ich mir das Programmieren von Websites selber bei, durch
          Projekte, die ich in meiner Freizeit betreue, bleibe ich immer auf dem
          neuesten Stand der Technologien.
        </p>
        <p>
          Wenn ich mal nicht am PC sitze, dann erledige ich gerne Holzarbeiten
          oder gehe Schrauben.
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
