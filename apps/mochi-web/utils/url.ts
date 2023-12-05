export function matchUrl(currentUrl: string, urlPattern: string): boolean {
  // Split both URLs into segments
  const urlSegments = currentUrl.split('/')
  const patternSegments = urlPattern.split('/')

  // Check if both have the same number of segments
  if (urlSegments.length !== patternSegments.length) {
    return false
  }

  // Compare each segment
  for (let i = 0; i < urlSegments.length; i++) {
    // Check if the pattern segment is a wildcard
    if (
      patternSegments[i].startsWith('[') &&
      patternSegments[i].endsWith(']')
    ) {
      continue
    }

    // If not a wildcard, and segments do not match, return false
    if (urlSegments[i] !== patternSegments[i]) {
      return false
    }
  }

  return true
}
