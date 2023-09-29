import React, { useEffect, useRef, useState } from "react"
import * as style from "../styles/sidemenu.module.scss"

const Sidemenu = () => {
  const [listItem, setListItem] = useState("sidemenu")

  const sidemenuRef = useRef(null)
  console.log(sidemenuRef)

  useEffect(() => {
    const headlines = document.querySelectorAll("h2")
    const headlinesArray = Array.from(headlines)

    const scrollHeight = sidemenuRef.scrollHeight

    const liElements = headlinesArray.map(item => {
      return (
        <li className={style.menuitem} key={item.id}>
          <a className={style.menulink} href={`#${item.id}`}>
            {item.innerText}
          </a>
        </li>
      )
    })

    setListItem(liElements)
  }, [setListItem])

  return (
    <ul className={style.sidemenu} ref={sidemenuRef}>
      <li className={style.sidemenuHeader}>
        <strong>Projektemenü</strong>
      </li>
      {listItem}
    </ul>
  )
}

export default Sidemenu
