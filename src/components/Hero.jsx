import React from "react"
import * as styles from "../styles/hero.module.css"

function Hero() {
  const textFirstLine = ["User-Experience", "Frontend-", "Grafik /"]
  const textSecondLine = ["Engineer", "Entwicklung", "Illustration"]

  return (
    <section className={styles.herocontainer}>
      <div className={styles.overflowcontainer}>
        <p>{textFirstLine[0]}</p>
      </div>
      <div className={styles.overflowcontainer}>
        <p>{textSecondLine[0]}</p>
      </div>
    </section>
  )
}

export default Hero
