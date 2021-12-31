import React, { useEffect, useState } from "react"
import * as styles from "./ToTopButton.module.scss"

function ToTopButton() {
  const [currentClass, setClass] = useState(`${styles.totopbutton}`)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setClass(
        window.scrollY > 200
          ? `${styles.totopbutton}`
          : `${styles.buttonHidden}`
      )
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
    <button
      className={currentClass}
      onClick={toTop}
      aria-label="Scroll to top"
    />
  )
}

export default ToTopButton
