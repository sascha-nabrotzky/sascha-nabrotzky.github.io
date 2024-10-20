import React from "react"
import * as styles from "../styles/sidemenu.module.css"

const Sidemenu = ({ headings }) => {
  return (
    <div className={styles.sidemenu}>
      <span>
        <strong>Projektmenü</strong>
      </span>
      {headings.map((heading, index) => {
        return (
          <a
            href={`#${index}`}
            className={styles.menuLink}
            key={index}
            aria-label={`Scrolle zum Projekt "${heading.node.headings[0].value}"`}
            dangerouslySetInnerHTML={{ __html: heading.node.headings[0].value }}
          ></a>
        )
      })}
    </div>
  )
}

export default Sidemenu
