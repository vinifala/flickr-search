export interface FlickrFeedItemMedia {
  m: string
}

export interface FlickrFeedItem {
  author: string
  author_id: string
  date_taken: string
  description: string
  link: string
  media: FlickrFeedItemMedia
  published: string
  tags: string
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
  tags
    .map((s: string): string => s.trim())
    .join(",")
    .replace(/ /g, "-")

export function doSearch(tags: string[]): Promise<FlickrFeed> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")

    script.src = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=flickrGallery&${
      tags.length > 0 ? `tags=${prepareTags(tags)}` : ""
    }`
    script.async = true
    script.onload = (): void => {
      console.log(JSON.parse(localStorage.getItem("flickrGallery")))
      resolve(JSON.parse(localStorage.getItem("flickrGallery")))
      document.body.removeChild(script)
    }
    script.onerror = reject

    document.body.appendChild(script)
  })
}
