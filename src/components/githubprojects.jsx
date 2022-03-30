import React, { useState, useEffect } from "react"
import * as gitProjectStyles from "../styling/githubprojects.module.scss"

export default function FetchGithubProjects(props) {
  let [data, setData] = useState(null) //data auf null setzen, danach mit Funkt. setData die commits fetchen und Projektdaten mappen

  useEffect(() => {
    async function fetchMyAPI() {
      let responseFromUrl = await fetch(
        "https://api.github.com/users/sascha-nabrotzky/repos",
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      )
      let commits = await responseFromUrl.json()
      setData(commits)
    }
    fetchMyAPI()
  }, [])

  if (!data) return <p>Loading ...</p>

  return (
    <section>
      <h2>Projekte auf Github</h2>
      <div className={gitProjectStyles.projectsWrapper}>
        {data.map(project => {
          let [day, time] = project.updated_at.split("T")

          return (
            <a
              href={project.clone_url}
              rel="noreferrer noopener"
              target="_blank"
              key={project.id}
            >
              <div className={gitProjectStyles.projectsBox}>
                <h4 dangerouslySetInnerHTML={{ __html: project.name }}></h4>
                <p
                  dangerouslySetInnerHTML={{ __html: project.description }}
                ></p>
                <div className={gitProjectStyles.projectTime}>
                  <span>Updated at: </span>
                  <time>{day}</time>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
