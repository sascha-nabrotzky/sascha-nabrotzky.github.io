import React from "react"
import ProfileImg from "../images/Sascha_im_Buero.jpg"
import * as styles from "../styles/hero.module.css"

function Hero() {
  return (
    <>
      <section className={styles.herocontainer}>
        <div className={styles.overflowcontainer}>
          <p>UX-Engineer</p>
        </div>
        <div className={styles.overflowcontainer}>
          <p>Webdesign & Frontend-Entwicklung</p>
        </div>
      </section>
      <div className={styles.imgWrapper}>
        <img src={ProfileImg} alt="Sascha Nabrotzky" />
      </div>
    </>
  )
}

export default Hero
