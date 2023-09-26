import React, { useEffect } from "react"
import Layout from "../components/Layout"
import SkillsSections from "../components/SkillsSections"
import socMedImg from "../images/socMedImg.jpg"
import SvgAnimation from "../components/SvgAnimation"

const Skills = () => {
  return (
    <Layout>
      <h1>Never stop learning!</h1>
      <p>
        Ich stelle hier kurz meine wichtigsten Skills vor, die ich am meisten
        bei meinen privaten Projekten anwende oder worauf hauptberuflich mein
        Fokus liegt.
      </p>
      <SvgAnimation />
      <SkillsSections />
    </Layout>
  )
}

export const Head = () => {
  return (
    <>
      <title>Skills | Sascha Nabrotzky</title>
      <meta name="title" content="Skills | Sascha Nabrotzky" />
      <meta
        name="description"
        content="Auflistung meiner Skills und beruflichen Qualifikationen"
      />
      <meta
        name="keywords"
        content="Skills, Timeline, Werdegang, Qualifikation"
      />
      <meta name="image" content={socMedImg} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Skills | Sascha Nabrotzky" />
      <meta name="twitter:image" content={socMedImg} />
      <meta property="og:title" content="Skills | Sascha Nabrotzky" />
      <meta
        property="og:description"
        content="Auflistung meiner Skills und beruflichen Qualifikationen"
      />
      <meta property="og:image" content={socMedImg} />
      <meta property="og:type" content="website" />
      <html lang="de" />
    </>
  )
}

export default Skills
