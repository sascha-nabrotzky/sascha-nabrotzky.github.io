import React, { useEffect, useState } from "react"
import * as styles from "../styles/sidemenu.module.scss"

const Sidemenu = () => {
  const [headlines, setHeadlines] = useState([])

  useEffect(() => {
    const collectedHeadlines = Array.from(document.querySelectorAll("h2"))
    const listItems = collectedHeadlines.map((item, index) => {
      return (
        <a href={`#${index}`} className={styles.menuLink} key={index}>
          {item.innerText}
        </a>
      )
    })
    setHeadlines(listItems)
  }, []) // Empty Array to prevent endless re-render when setState is inside of useEffect

  return (
    <div className={styles.sidemenu}>
      <span>
        <strong>Projektmenü</strong>
      </span>
      {headlines}
    </div>
  )
}

export default Sidemenu
