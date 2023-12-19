// for handling 404/broken image -> fallback to this
export function boringAvatar(name = '') {
  return `https://source.boringavatars.com/beam/120/${encodeURI(
    name,
  )}?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14`
}

export function getRelativePosition(
  pos: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
) {
  switch (pos) {
    case 'bottom-left':
      return ['0%', '75%']
    case 'bottom-right':
      return ['75%', '75%']
    case 'top-left':
      return ['0%', '0%']
    case 'top-right':
      return ['75%', '0%']
  }
}
