import React from "react"
import * as styles from "../styles/hero.module.css"

function Hero() {
  return (
    <section className={styles.herocontainer}>
      <div className={styles.overflowcontainer}>
        <p>Webdesign /</p>
      </div>
      <div className={styles.overflowcontainer}>
        <p>UX-Design</p>
      </div>
    </section>
  )
}

export default Hero
