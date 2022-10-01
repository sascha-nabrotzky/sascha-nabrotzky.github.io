import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as timelineStyle from "../styling/timeline.module.scss"
import fotoVonMir from "../images/Sascha_Nabrotzky_sw.jpg"
import TimeLineJSON from "../content/timeline.json"
import SkillsLogos from "../components/skillsLogos"

export default function Skills() {
  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: 0.5,
    }

    let callback = entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("scale", entry.isIntersecting)
      })
    }

    let targets = document.querySelectorAll("section")
    let observer = new IntersectionObserver(callback, options)

    targets.forEach(target => {
      observer.observe(target)
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>Skills | Sascha Nabrotzky</title>
        <meta name="title" content="Skills | Sascha Nabrotzky" />
        <meta
          name="description"
          content="Auflistung meiner Skills und beruflichen Qualifikationen"
        />
        <meta
          name="keywords"
          content="Skills, Timeline, Werdegang, Qualifikation"
        />
      </Helmet>
      <Layout>
        <h1>Never stop learning!</h1>
        <p>
          Ich stelle hier kurz meine wichtigsten Skills vor, die ich am meisten
          bei meinen ganzen Projekten anwende und worauf meist mein Fokus liegt.
          <br />
          <br />
        </p>

        <div className={timelineStyle.timeLinePoint}>
          <div id="fotovonmir">
            <img src={fotoVonMir} alt="Foto von Sascha Nabrotzky" />
          </div>
        </div>
        <SkillsLogos />
        <h2 className={timelineStyle.headline}>Timeline</h2>
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
