import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as timelineStyle from "../styling/timeline.module.scss"
import fotoVonMir from "../images/Sascha_Nabrotzky_sw.jpg"
import TimeLineJSON from "../content/timeline.json"

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

        <div className={timelineStyle.timeLinePoint}>
          <div id="fotovonmir">
            <img src={fotoVonMir} alt="Foto von Sascha Nabrotzky" />
          </div>
        </div>

        {TimeLineJSON.jahrtaetigkeit.map(point => {
          return (
            <section key={point.jahr.toString()}>
              <div className={timelineStyle.linie}></div>

              <div className={timelineStyle.timeLinePoint}>
                <div className={timelineStyle.circleImg}>
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
