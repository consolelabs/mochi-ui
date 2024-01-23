import { ChangelogPage } from 'types/mochi-schema'

export function getFirstImageUrl(changelogs: ChangelogPage[]) {
  const imgUrls: string[] = []

  changelogs.forEach((changelog) => {
    const { content } = changelog
    const imgRegex = /!\[.*?\]\((.*?)\)/

    const match = content.match(imgRegex)

    if (match && match[1]) {
      imgUrls.push(match[1])
    }
  })

  return imgUrls.length > 0 ? imgUrls[0] : null
}

export function getDescription(changelogs: ChangelogPage[]) {
  // Merge all content into a single string
  const mergedContent = changelogs
    .map((changelog) => changelog.content)
    .join('\n')

  // Remove markdown syntax (e.g., ![image](url), ## heading) before extracting text
  const plainTextContent = mergedContent
    .replace(/(##+|###+|\*\*|__|!\[.*?\]\(.*?\))/g, '')
    .replace(/\n/g, ' ')

  // Extract the first 50 words
  const words = plainTextContent.split(/\s+/)
  const description = `${words.slice(0, 50).join(' ').trim()}...`

  return description
}
