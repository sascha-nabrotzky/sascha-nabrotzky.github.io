import React, { useEffect } from "react"
import * as style from "../styles/typewritertext.module.scss"

const TypewriterText = props => {
  useEffect(() => {
    let i = 0
    const [text] = [props.text]
    const speed = 100

    function typewriter() {
      if (i < text.length) {
        document.querySelector("h2").innerHTML += text.charAt(i)
        i++
        setTimeout(typewriter, speed)
      }
    }

    typewriter()

    // Cleanup function for useEffect
    return () => {
      i = text.length
    }
  }, [props.text])

  return (
    <h2 className={style.typewriter}>
      <span className={style.firstQuote}>&ldquo; </span>
    </h2>
  )
}

export default TypewriterText
