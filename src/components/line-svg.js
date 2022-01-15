import React, { useEffect, useState, useRef } from "react"
import * as style from "../components/line-svg.module.scss"

export default function LineSvg() {
  const length = 2915.624755859375

  const ref = useRef(null)
  const [pathLength, setLength] = useState(length)
  const [currentColor, setColor] = useState("rgba(128,128,128,0)")

  useEffect(() => {
    setLength(0)
    setTimeout(() => {
      setColor("rgba(128,128,128,1)")
    }, 3500)
  }, [])

  return (
    <svg
      ref={ref}
      width="800"
      height="600"
      viewBox="0 0 211.667 158.75"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={style.path}
        style={{ strokeDashoffset: `${pathLength}`, fill: `${currentColor}` }}
        d="M405 291c14.841 3.96 1.983 21.96-6.583 24.667-23.214 7.336-41.768-17.099-42.75-37.834-1.758-37.09 34.64-62.616 69.083-60.833 50.547 2.616 83.876 52.345 78.917 100.333-6.61 63.962-70.098 105.3-131.584 97C294.71 403.89 245.28 326.462 257 251.5c14.196-90.789 105.656-148.356 194.083-133.167 104.209 17.9 169.938 123.448 151.25 225.334C580.758 461.297 461.09 535.205 345.75 513c-131.056-25.231-213.153-159.044-187.417-287.833C187.206 80.684 335.18-9.611 477.417 19.667 635.327 52.17 733.827 214.316 701 370"
        transform="matrix(.26458 0 0 .26458 -1.852 7.673)"
      />
    </svg>
  )
}
