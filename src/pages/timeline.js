import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as aboutStyle from "../components/timeline.module.scss"
import fotoVonMir from "../images/Sascha_Nabrotzky_sw.jpg"
import TimeLineJSON from "../components/timeline.json"

export default function Timeline() {
  return (
    <>
      <Helmet>
        <title>Timeline | Sascha Nabrotzky</title>
        <meta name="title" content="Timeline | Sascha Nabrotzky" />
        <meta
          name="description"
          content="Timeline meiner beruflichen Qualifikation"
        />
        <meta name="keywords" content="Timeline, Werdegang, Qualifikation" />
      </Helmet>
      <Layout>
        <h1>Never stop learning!</h1>

        <p>Eine kleine Übersicht meines bisherigen Werdegangs.</p>

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
