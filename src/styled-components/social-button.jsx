import React from "react"
import * as contactStyle from "../styling/social-button.module.scss"

export default function SocialButton(props) {
  return (
    <>
      <a
        className={contactStyle.socialBtn}
        href={`${props.href}`}
        alt={`${props.alttext}`}
        target="_blank"
        rel="noreferrer"
      >
        <p>{`${props.label}`}</p>
      </a>
    </>
  )
}
