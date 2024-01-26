export function getFirstImageUrl(content?: string) {
  const imgUrls: string[] = []

  const imgRegex = /!\[.*?\]\((.*?)\)/

  const match = content?.match(imgRegex) ?? false

  if (match && match[1]) {
    imgUrls.push(match[1])
  }

  return imgUrls.length > 0 ? imgUrls[0] : undefined
}
