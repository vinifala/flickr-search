export interface FlickrFeedItemMedia {
  m: string
}

export interface FlickrFeedItem {
  author: string
  author_id: string
  dateTaken: string
  description: string
  link: string
  media: FlickrFeedItemMedia
  published: string
  tags: string[]
  title: string
}

export interface FlickrFeed {
  description: string
  generator: string
  items: FlickrFeedItem[]
  link: string
  modified: string
  title: string
}

const prepareTags = (tags: string[]): string =>
  tags.map((s: string): string => encodeURIComponent(s)).join(",")

export function doSearch(
  tags: string[],
  allTags: boolean
): Promise<FlickrFeed> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")

    script.src = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=flickrGallery&tagmode=${
      allTags ? "all" : "any"
    }&${tags.length > 0 ? `tags=${prepareTags(tags)}` : ""}`
    script.async = true
    script.onload = (): void => {
      const data = JSON.parse(localStorage.getItem("flickrGallery"))
      const items = data.items.map(({ date_taken, tags, ...rest }: any) => ({
        dateTaken: date_taken,
        tags: tags ? tags.split(" ") : [],
        ...rest,
      }))
      resolve({ ...data, items })

      document.body.removeChild(script)
    }
    script.onerror = reject

    document.body.appendChild(script)
  })
}
