import * as React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  align-items: flex-start;
  border: 1px solid #2c3b63;
  border-radius: 6px;
  display: flex;
  flex-wrap: wrap;
  font-family: sans-serif;
  min-height: 48px;
  width: 480px;
  padding: 0 8px;
  &:focus-within {
    border: 1px solid #2c3b63;
  }
`
const TagsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 8px 0 0 0;
`
const Tag = styled.li`
  width: auto;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0 8px;
  font-size: 14px;
  list-style: none;
  border-radius: 6px;
  margin: 0 8px 8px 0;
  background: #2c3b63;
`
const InputContainer = styled.div`
  flex: 1;
`
const CloseIcon = styled.i`
  font-style: normal;
  cursor: pointer;
  border-radius: 50%;
  background-color: #ece59a;
  display: inline-block;
  width: 21px;
  height: 21px;
  text-align: center;
  vertical-align: middle;
  transform: rotate(45deg);
  font-size: 21px;
  line-height: 21px;
  padding: 0;
  margin-left: 6px;
  color: #2c3b63;
  font-weight: bold;
  opacity: 0.5;
  transition: ease-out opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`
const StyledInput = styled.input`
  border: none;
  width: 100%;
  height: 46px;
  font-size: 14px;
  padding: 4px 0 0 0;
  &:focus {
    outline: transparent;
  }
`

export const TagsInput: React.FC = () => {
  const [tags, setTags] = React.useState([])

  const addTags = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === " " && event.currentTarget.value !== "") {
      setTags([...tags, event.currentTarget.value])
      event.currentTarget.value = ""
    }
  }

  const removeTags = (index: number): void => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)])
  }

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void =>
    addTags(event)

  const handleRemoveTag = (index: number) => (): void => removeTags(index)

  return (
    <Wrapper>
      <TagsContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>
            <span>{tag}</span>
            <CloseIcon onClick={handleRemoveTag(index)}>+</CloseIcon>
          </Tag>
        ))}
      </TagsContainer>
      <InputContainer>
        <StyledInput onKeyUp={handleOnKeyUp} />
      </InputContainer>
    </Wrapper>
  )
}
