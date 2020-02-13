import * as React from "react"
import styled from "styled-components"

import * as flickr from "../../flickr/FlickrFeed"
import { TagsInput } from "../TagsInput/TagsInput"
import { Image } from "../Image/Image"

const Title = styled.h1`
  color: coral;
`
const Wrapper = styled.div`
  color: #2c3b63;
  font-family: Arial, "Helvetica Neue", sans-serif;
`
const FeedContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`

export const App: React.FC = () => {
  const [allTags, setAllTags] = React.useState(true)
  const [feed, setFeed] = React.useState([])
  const [tagList, setTagList] = React.useState([])
  const handleInput = (tags: string[]): void => setTagList(tags)
  const handleChangeAllTags = (
    event: React.FormEvent<HTMLInputElement>
  ): void => setAllTags(event.currentTarget.checked)
  React.useEffect(() => {
    flickr.doSearch(tagList, allTags).then((data: flickr.FlickrFeed) => {
      setFeed(data.items)
    })
  }, [allTags, tagList])

  return (
    <Wrapper>
      <Title>Start typing to search Flickr&apos;s public feed</Title>
      <TagsInput onChange={handleInput} />
      <div>
        <input
          checked={allTags}
          type="checkbox"
          onChange={handleChangeAllTags}
          id="alltags"
        />
        <label htmlFor="alltags">Search for all tags</label>
      </div>
      <div>
        <FeedContainer>
          {feed.map(
            (
              { media, tags, author, dateTaken, link }: flickr.FlickrFeedItem,
              i: number
            ) => (
              <Image
                author={author}
                tags={tags}
                key={i}
                date={dateTaken}
                link={link}
                src={media.m}
              />
            )
          )}
        </FeedContainer>
      </div>
    </Wrapper>
  )
}
