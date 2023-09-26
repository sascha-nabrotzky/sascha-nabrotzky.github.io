import React, { useEffect } from "react"
import * as timelineStyle from "../styles/timeline.module.scss"
import TimeLineJSON from "../content/timeline.json"

const TimeLine = () => {
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
    </>
  )
}

export default TimeLine
