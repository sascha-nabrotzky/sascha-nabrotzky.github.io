import React, { useEffect } from "react"
import Layout from "../components/Layout"
import * as timelineStyle from "../styles/timeline.module.scss"
import TimeLineJSON from "../content/timeline.json"
import SkillsSections from "../components/SkillsSections"
import socMedImg from "../images/socMedImg.jpg"
import SvgAnimation from "../components/SvgAnimation"

const SkillsOverview = () => {
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
    <Layout>
      <h1>Never stop learning!</h1>
      <p>
        Ich stelle hier kurz meine wichtigsten SkillsOverview vor, die ich am
        meisten bei meinen privaten Projekten anwende oder worauf hauptberuflich
        mein Fokus liegt.
      </p>

      <SvgAnimation />

      <SkillsSections />

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
  )
}

export const Head = () => {
  return (
    <>
      <title>SkillsOverview | Sascha Nabrotzky</title>
      <meta name="title" content="SkillsOverview | Sascha Nabrotzky" />
      <meta
        name="description"
        content="Auflistung meiner SkillsOverview und beruflichen Qualifikationen"
      />
      <meta
        name="keywords"
        content="SkillsOverview, Timeline, Werdegang, Qualifikation"
      />
      <meta name="image" content={socMedImg} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="SkillsOverview | Sascha Nabrotzky" />
      <meta name="twitter:image" content={socMedImg} />
      <meta property="og:title" content="SkillsOverview | Sascha Nabrotzky" />
      <meta
        property="og:description"
        content="Auflistung meiner SkillsOverview und beruflichen Qualifikationen"
      />
      <meta property="og:image" content={socMedImg} />
      <meta property="og:type" content="website" />
      <html lang="de" />
    </>
  )
}

export default SkillsOverview
