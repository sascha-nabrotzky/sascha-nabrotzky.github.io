import React, { useState, useEffect } from "react"
import * as heroStyles from "./hero.module.scss"
import Snowflakes from "./snowflakes"

export default function Hero() {
  const textArray = ["Frontend-", "TYPO3-", "UX-Design-"]
  let [state, setState] = useState(textArray[0])

  useEffect(() => {
    setInterval(() => {
      textArray.forEach((item, i) => {
        setTimeout(() => {
          setState(item)
        }, i * 1500)
      })
    }, 4500)
  }, [])

  return (
    <section className={heroStyles.herocontainer}>
      <Snowflakes />
      <div className={heroStyles.overflowcontainer}>
        <p dangerouslySetInnerHTML={{ __html: state }}></p>
      </div>
      <div className={heroStyles.overflowcontainer}>
        <p>Entwicklung</p>
      </div>
    </section>
  )
}
