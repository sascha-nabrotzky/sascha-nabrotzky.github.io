import React, { useState, useEffect } from "react"
import * as heroStyles from "./hero.module.scss"

export default function Hero() {
  const textArray = ["Frontend-", "Web-", "PWA-", "Design-"]
  let [state, setState] = useState(textArray[0])

  useEffect(() => {
    setInterval(() => {
      textArray.forEach((item, i) => {
        setTimeout(() => {
          setState(item)
        }, i * 1500)
      })
    }, 6000)
  }, [])

  return (
    <section className={heroStyles.herocontainer}>
      <div className={heroStyles.overflowcontainer}>
        <p dangerouslySetInnerHTML={{ __html: state }}></p>
      </div>
      <div className={heroStyles.overflowcontainer}>
        <p>Entwicklung</p>
      </div>
    </section>
  )
}
