import React, { useEffect } from "react"
import * as styles from "../styles/timeline.module.css"
import TimeLineJSON from "../content/timeline.json"

const TimeLine = () => {
  useEffect(() => {
    // TODO: Remove this check when the bug is fixed
    let isChromeBrowser = navigator.userAgent.includes("Chrome")

    if (!isChromeBrowser) {
      const options = {
        root: null,
        rootMargin: "-100px 0px -100px 0px",
        threshold: 1,
      }

      const callback = entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle(`${styles.scale}`, entry.isIntersecting)
        })
      }

      const targets = document.querySelectorAll(`.${styles.circle}`)
      const observer = new IntersectionObserver(callback, options)

      targets.forEach(target => {
        observer.observe(target)
      })
    } else {
      const targets = document.querySelectorAll(`.${styles.circle}`)
      targets.forEach(target => {
        target.classList.add(`${styles.scale}`)
      })
    }
  }, [])

  return (
    <>
      <h2 className={styles.headline}>Woher mein Wissen kommt</h2>
      {TimeLineJSON.jahrtaetigkeit.map(point => {
        return (
          <section key={point.jahr.toString()}>
            <div className={styles.linie}></div>

            <div className={styles.timeLinePoint}>
              <div className={styles.circle}>
                <p>{point.jahr}</p>
              </div>
              <p>
                {point.taetigkeit && (
                  <>
                    <strong>{point.taetigkeit}</strong>
                    <br />
                  </>
                )}
                {point.technologie && <span>{point.technologie}</span>}
              </p>
            </div>
          </section>
        )
      })}
    </>
  )
}

export default TimeLine
