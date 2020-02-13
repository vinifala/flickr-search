import * as React from "react"
import styled from "styled-components"
import "jest-styled-components"

export interface ImageProps {
  author: string
  date: string
  tags: string[]
  link: string
  src: string
}

const StyledImg = styled.img``
const Wrapper = styled.li`
  background-color: rgba(132,141,130, 0.1);
  border: 1px solid #848D82;
  border-radius 4px;
  flex: 1;
  list-style: none;
  margin: 8px;
  padding: 16px;
  text-align: center;
`
const TextContainer = styled.ul`
  padding: 0;
  text-align: left;
  li {
    list-style: none;
    margin: 8px 0;
  }
`

const printTags = (tags: string[]): JSX.Element => {
  return tags.length > 0 && <li>Tags: {tags.join(", ")}</li>
}

export const Image: React.FC<ImageProps> = props => {
  const jsDate = new Date(props.date)
  const parsedDate = `${jsDate.getDate()}/${jsDate.getMonth() +
    1}/${jsDate.getFullYear()}`
  const parsedTime = `${jsDate.getHours()}:${jsDate.getMinutes()}`

  return (
    <Wrapper>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <StyledImg src={props.src} />
      </a>
      <TextContainer>
        <li>
          Taken by {props.author.match(/("(.*)")/).pop()} on {parsedDate}{" "}
          at&nbsp;
          {parsedTime}
        </li>
        {printTags(props.tags)}
      </TextContainer>
    </Wrapper>
  )
}
