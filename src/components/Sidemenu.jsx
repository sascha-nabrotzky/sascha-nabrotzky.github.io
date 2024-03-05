import React from "react"
import * as styles from "../styles/sidemenu.module.css"

const Sidemenu = ({ headings }) => {
  return (
    <div className={styles.sidemenu}>
      <span>
        <strong>Projektmenü</strong>
      </span>
      {headings.map((heading, index) => {
        console.log(heading.node, index)
        return (
          <a
            href={`#${index}`}
            className={styles.menuLink}
            key={index}
            dangerouslySetInnerHTML={{ __html: heading.node.headings[1].value }}
          ></a>
        )
      })}
    </div>
  )
}

export default Sidemenu
