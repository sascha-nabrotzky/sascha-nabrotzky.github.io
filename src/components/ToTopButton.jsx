import React, { useEffect, useState } from "react"
import * as styles from "../styling/ToTopButton.module.scss"

function ToTopButton() {
  const [currentClass, setClass] = useState(`${styles.buttonHidden}`)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setClass(
        window.scrollY > 200
          ? `${styles.totopbutton}`
          : `${styles.buttonHidden}`
      )
    })

    window.addEventListener("keydown", keyevent => {
      if (keyevent.key === "Enter") {
        toTop()
      }
    })
  })

  function toTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  return (
    <button className={currentClass} onClick={toTop} aria-label="Scroll to top">
      <div className={styles.icon}></div>
    </button>
  )
}

export default ToTopButton
