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
  padding: 0 8px;
  width: 480px;
  &:focus-within {
    border: 1px solid #2c3b63;
  }
`
const TagsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0 0 0;
  padding: 0;
`
const Tag = styled.li`
  align-items: center;
  background: #2c3b63;
  border-radius: 6px;
  color: #fff;
  display: flex;
  font-size: 14px;
  height: 32px;
  justify-content: center;
  list-style: none;
  margin: 0 8px 8px 0;
  padding: 0 8px;
  width: auto;
`
const InputContainer = styled.div`
  flex: 1 1 240px;
`
const CloseIcon = styled.i`
  background-color: #ece59a;
  border-radius: 50%;
  color: #2c3b63;
  cursor: pointer;
  display: inline-block;
  font-size: 21px;
  font-style: normal;
  font-weight: bold;
  height: 21px;
  line-height: 21px;
  margin-left: 6px;
  opacity: 0.5;
  padding: 0;
  text-align: center;
  transform: rotate(45deg);
  transition: ease-out opacity 0.2s;
  vertical-align: middle;
  width: 21px;
  &:hover {
    opacity: 1;
  }
`
const StyledInput = styled.input`
  border: none;
  font-size: 14px;
  height: 46px;
  padding: 4px 0 0 0;
  width: 100%;
  &:focus {
    outline: transparent;
  }
`

interface TagsInputProps {
  onChange?: (tags: string[]) => void
}

export const TagsInput: React.FC<TagsInputProps> = props => {
  const [tags, setTags] = React.useState([])

  React.useEffect(() => {
    props.onChange(tags)
  }, [tags])

  const removeLastTag = (): void => setTags([...tags.slice(0, -1)])

  const addTags = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === " " && event.currentTarget.value !== "") {
      setTags([...tags, event.currentTarget.value])
      event.currentTarget.value = ""
    } else if (
      event.key === "Backspace" &&
      event.currentTarget.value === "" &&
      tags.length > 0
    ) {
      removeLastTag()
    }
  }

  const removeTags = (index: number): void =>
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)])

  const handleOnKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    addTags(event)
  }

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
        <StyledInput
          placeholder="Tags are space separated"
          onKeyUp={handleOnKeyUp}
        />
      </InputContainer>
    </Wrapper>
  )
}
