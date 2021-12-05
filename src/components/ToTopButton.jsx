import React, { useRef, useState } from "react"
import * as styles from "./ToTopButton.module.scss"

function ToTopButton() {
  const [currentClass, setClass] = useState(`${styles.totopbutton}`)

  const button = useRef(null)

  window.addEventListener("scroll", () => {
    setClass(
      window.scrollY > 200 ? `${styles.totopbutton}` : `${styles.buttonHidden}`
    )
  })

  function toTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  return (
    <button className={currentClass} ref={button} onClick={toTop}>
      &laquo;
    </button>
  )
}

export default ToTopButton
