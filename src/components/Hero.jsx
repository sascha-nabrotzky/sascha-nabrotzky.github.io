import React from "react"
import * as heroStyles from "../styles/hero.module.scss"

function Hero() {
  const textFirstLine = ["User-Experience", "Frontend-", "Grafik /"]
  const textSecondLine = ["Engineer", "Entwicklung", "Illustration"]

  return (
    <section className={heroStyles.herocontainer}>
      <div className={heroStyles.overflowcontainer}>
        <p>{textFirstLine[0]}</p>
      </div>
      <div className={heroStyles.overflowcontainer}>
        <p>{textSecondLine[0]}</p>
      </div>
    </section>
  )
}

export default Hero
