import * as React from "react"
import { create, ReactTestRenderer } from "react-test-renderer"

import { Image, ImageProps } from "./Image"

describe("Image component", () => {
  const renderComponent = (props?: Partial<ImageProps>): ReactTestRenderer => {
    const defaultProps = {
      author: `nobody@flickr.com ("Vini")`,
      date: "2020-02-13T12:34:55",
      link: "https://www.flickr.com",
      src: "image.jpg",
      tags: ["badminton", "basketball", "ski"],
    }

    return create(<Image {...defaultProps} {...props} />)
  }

  describe("With tags", () => {
    it("should match snapshot", () => {
      const tree = renderComponent().toJSON()

      expect(tree).toMatchSnapshot()
    })

    it("should render with tags", () => {
      const tree = renderComponent()
      const printedTags = tree.root.findAllByType("li")[2].children.join("")

      expect(printedTags).toBe("Tags: badminton, basketball, ski")
    })
  })

  describe("Without tags", () => {
    it("should match snapshot", () => {
      const tree = renderComponent({ tags: [] }).toJSON()

      expect(tree).toMatchSnapshot()
    })

    it("should render without tags", () => {
      const tree = renderComponent({ tags: [] })
      const printedTags = tree.root.findAllByType("li")[2]

      expect(printedTags).toBeUndefined()
    })
  })
})
