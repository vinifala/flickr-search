import "jest-styled-components"
import * as React from "react"
import ReactDOM from "react-dom"
import { act, Simulate } from "react-dom/test-utils"
import { create, ReactTestRenderer } from "react-test-renderer"

import { TagsInput, TagsInputProps } from "./TagsInput"

let container: HTMLDivElement
beforeEach(() => {
  jest.clearAllMocks()
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

describe("Input with tags", () => {
  const onChange = jest.fn()
  const renderComponent = (
    props?: Partial<TagsInputProps>
  ): ReactTestRenderer => {
    const defaultProps = {
      onChange: onChange,
    }

    return create(<TagsInput {...defaultProps} {...props} />)
  }

  it("should match snapshot", () => {
    const tree = renderComponent().toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("should add a tag", () => {
    act(() => {
      ReactDOM.render(<TagsInput />, container)
    })
    const input = container.getElementsByTagName("input")[0]
    act(() => {
      input.value = "test"
      Simulate.keyUp(input, { key: " ", keyCode: 32, which: 32 })
    })
    const tagList = Array.from(container.getElementsByTagName("li"))

    expect(tagList).toHaveLength(1)
    expect(tagList[0].textContent).toEqual("test+")
    expect(input.value).toEqual("")
  })

  it("should remove a tag by clicking on the tag delete icon", () => {
    act(() => {
      ReactDOM.render(<TagsInput />, container)
    })
    const input = container.getElementsByTagName("input")[0]
    act(() => {
      input.value = "test"
      Simulate.keyUp(input, { key: " ", keyCode: 32, which: 32 })
    })
    let tagList = Array.from(container.getElementsByTagName("li"))

    expect(tagList).toHaveLength(1)
    expect(tagList[0].textContent).toEqual("test+")

    const deleteButton = tagList[0].getElementsByTagName("i")[0]
    Simulate.click(deleteButton)

    tagList = Array.from(container.getElementsByTagName("li"))

    expect(tagList).toHaveLength(0)
  })

  it("should remove a tag by pressing backspace", () => {
    act(() => {
      ReactDOM.render(<TagsInput />, container)
    })
    const input = container.getElementsByTagName("input")[0]
    act(() => {
      input.value = "test"
      Simulate.keyUp(input, { key: " ", keyCode: 32, which: 32 })
    })
    let tagList = Array.from(container.getElementsByTagName("li"))

    expect(tagList).toHaveLength(1)
    expect(tagList[0].textContent).toEqual("test+")

    act(() => {
      Simulate.keyUp(input, { key: "Backspace", keyCode: 8, which: 8 })
    })

    tagList = Array.from(container.getElementsByTagName("li"))

    expect(tagList).toHaveLength(0)
  })

  it("should call onChange when adding or removing a tag", () => {
    act(() => {
      ReactDOM.render(<TagsInput onChange={onChange} />, container)
    })

    // initial state
    expect(onChange).toHaveBeenNthCalledWith(1, [])

    const input = container.getElementsByTagName("input")[0]
    act(() => {
      input.value = "test"
      Simulate.keyUp(input, { key: " ", keyCode: 32, which: 32 })
    })

    expect(onChange).toHaveBeenNthCalledWith(2, ["test"])

    act(() => {
      Simulate.keyUp(input, { key: "Backspace", keyCode: 8, which: 8 })
    })

    expect(onChange).toHaveBeenNthCalledWith(3, [])
    expect(onChange).toHaveBeenCalledTimes(3)
  })
})
