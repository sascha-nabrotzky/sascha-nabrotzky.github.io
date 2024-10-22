import React from "react"
import ProfileImg from "../images/Sascha_im_Buero.jpg"
import * as styles from "../styles/hero.module.css"

const Hero = () => {
  return (
    <>
      <h1 className={styles.herocontainer}>
        <p className={styles.overflowcontainer}>
          <span>Messbare Erfolge</span>
        </p>
        <p className={styles.overflowcontainer}>
          <span>
            Web- & UX-Design &ndash; nutzerfreundlich, zugänglich und ästhetisch
          </span>
        </p>
      </h1>
      <div className={styles.imgWrapper}>
        <img src={ProfileImg} alt="Sascha Nabrotzky" width="432" height="432" />
      </div>
    </>
  )
}

export default Hero
