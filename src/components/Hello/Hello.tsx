import * as React from "react"
import styled from "styled-components"

import * as flickr from "../../flickr/FlickrFeed"

const Title = styled.h1`
  color: coral;
  font-family: Arial, "Helvetica Neue", sans-serif;
`

export interface HelloProps {
  compiler: string
  framework: string
}

export const Hello: React.FC<HelloProps> = (props: HelloProps) => {
  const [state, setState] = React.useState([])
  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const tags = e.currentTarget.value?.split(",")
    if (tags.length > 0) {
      flickr.doSearch(tags).then((data: flickr.FlickrFeed) => {
        setState(data.items)
      })
    }
  }

  return (
    <div>
      <Title>
        Hello from {props.compiler} and {props.framework}!
      </Title>
      <div>
        <input type="text" onInput={handleInput} />
        <ul>
          {state.map((item: flickr.FlickrFeedItem, i: number) => (
            <li key={i}>
              <img src={item.media.m}></img>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
