import * as React from "react"
import styled from "styled-components"

import * as flickr from "../../flickr/FlickrFeed"
import { TagsInput } from "../TagsInput/TagsInput"

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
  const handleInput = (tags: string[]): void => {
    console.log("tags", tags)
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
        <ul>
          {state.map((item: flickr.FlickrFeedItem, i: number) => (
            <li key={i}>
              <img src={item.media.m}></img>
            </li>
          ))}
        </ul>
      </div>
      <TagsInput onChange={handleInput} />
    </div>
  )
}
