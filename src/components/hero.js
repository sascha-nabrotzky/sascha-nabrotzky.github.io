import React from "react"
import * as heroStyles from "./hero.module.scss"

export default function Hero() {
  const textArray = ["Frontend-", "Web-", "App-"]
  let textItem

  setInterval(() => {
    textArray.forEach((item, i) => {
      setTimeout(() => {
        textItem = item
        console.log(textItem)
      }, i * 1500)
    })
  }, 6000)

  return (
    <section className={heroStyles.herocontainer}>
      <div className={heroStyles.overflowcontainer}>
        <p>{textArray[0]}</p>
      </div>
      <div className={heroStyles.overflowcontainer}>
        <p>Entwicklung</p>
      </div>
    </section>
  )
}
