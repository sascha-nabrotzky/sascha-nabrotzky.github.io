import React, { useState, useEffect } from "react"
import * as heroStyles from "../styles/hero.module.scss"

export default function Hero() {
  const textFirstLine = ["Full-Stack", "Frontend-", "Grafik /"]
  const textSecondLine = ["Designer", "Entwicklung", "Illustration"]
  let [state, setState] = useState(textFirstLine[0])
  let [state2, setState2] = useState(textSecondLine[0])

  useEffect(() => {
    setInterval(() => {
      textFirstLine.forEach((item, i) => {
        setTimeout(() => {
          setState(item)
        }, i * 1500)
      })
      textSecondLine.forEach((item, i) => {
        setTimeout(() => {
          setState2(item)
        }, i * 1500)
      })
    }, 4500)
  }, [])

  return (
    <section className={heroStyles.herocontainer}>
      <div className={heroStyles.overflowcontainer}>
        <p dangerouslySetInnerHTML={{ __html: state }}></p>
      </div>
      <div className={heroStyles.overflowcontainer}>
        <p dangerouslySetInnerHTML={{ __html: state2 }}></p>
      </div>
    </section>
  )
}
