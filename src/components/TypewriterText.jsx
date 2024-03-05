import React, { useEffect, useRef } from "react"
import * as style from "../styles/typewritertext.module.css"

const TypewriterText = props => {
  const typewriterDiv = useRef(null)

  useEffect(() => {
    let i = 0
    const [text] = [props.text]
    const speed = 100

    function typewriter() {
      if (i < text.length) {
        typewriterDiv.current.innerHTML += text.charAt(i)
        i++
        setTimeout(typewriter, speed)
      }
    }

    typewriter()
  }, [props.text])

  return (
    <div className={style.typewriter} ref={typewriterDiv}>
      <span className={style.firstQuote}>&ldquo; </span>
    </div>
  )
}

export default TypewriterText
