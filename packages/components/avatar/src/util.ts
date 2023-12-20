// for handling 404/broken image -> fallback to this
export function boringAvatar(name = '') {
  return `https://source.boringavatars.com/beam/120/${encodeURI(
    name,
  )}?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14`
}
