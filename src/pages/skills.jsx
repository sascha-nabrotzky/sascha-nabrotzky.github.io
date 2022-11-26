import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import * as timelineStyle from "../styling/timeline.module.scss"
import fotoVonMir from "../images/Sascha_Nabrotzky_sw.jpg"
import TimeLineJSON from "../content/timeline.json"
import SkillsLogos from "../components/skillsLogos"
import socMedImg from "../images/socMedImg.jpg"

export default function Skills() {
  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "-100px 0px -100px 0px",
      threshold: 1,
    }

    let callback = entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle(
          `${timelineStyle.scale}`,
          entry.isIntersecting
        )
      })
    }

    let targets = document.querySelectorAll(`.${timelineStyle.circle}`)
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
        <meta name="image" content={socMedImg} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Skills | Sascha Nabrotzky" />
        <meta name="twitter:image" content={socMedImg} />
        <meta property="og:title" content="Skills | Sascha Nabrotzky" />
        <meta
          property="og:description"
          content="Auflistung meiner Skills und beruflichen Qualifikationen"
        />
        <meta property="og:image" content={socMedImg} />
        <meta property="og:type" content="website" />
        <html lang="de" />
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
                <div className={timelineStyle.circle}>
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
