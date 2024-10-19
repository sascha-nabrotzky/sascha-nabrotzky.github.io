import React from "react"
import ProfileImg from "../images/Sascha_im_Buero.jpg"
import * as styles from "../styles/hero.module.css"

const Hero = () => {
  return (
    <>
      <section className={styles.herocontainer}>
        <div className={styles.overflowcontainer}>
          <p>Messbare Erfolge</p>
        </div>
        <div className={styles.overflowcontainer}>
          <p>Web- & UX-Design nutzerfreundlich, zugänglich und ästhetisch</p>
        </div>
      </section>
      <div className={styles.imgWrapper}>
        <img src={ProfileImg} alt="Sascha Nabrotzky" width="432" height="432" />
      </div>
    </>
  )
}

export default Hero
