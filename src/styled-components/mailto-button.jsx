import React, { useState } from "react"
import * as contactStyle from "../styling/social-button.module.scss"

export default function SocialButton(props) {
  const [currentMail, setMail] = useState("")

  function addMail() {
    setMail(props.href)
  }

  return (
    <a
      className={contactStyle.socialBtn}
      href={`${currentMail}`}
      alt={`${props.alttext}`}
      target="_blank"
      rel="noreferrer"
      onClick={addMail}
    >
      <p>{`${props.label}`}</p>
    </a>
  )
}
