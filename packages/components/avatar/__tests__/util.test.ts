import { boringAvatar } from '../src/util'

describe('boringAvatar', () => {
  it('returns a valid URL', () => {
    const name = 'John Doe'
    const url = boringAvatar(name)
    expect(url).toMatch(
      /^https:\/\/source\.boringavatars\.com\/beam\/120\/John%20Doe\?colors=[a-zA-Z0-9,%]+$/,
    )
  })

  it('returns a default URL when no name is provided', () => {
    const url = boringAvatar()
    expect(url).toBe(
      'https://source.boringavatars.com/beam/120/?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14',
    )
  })
})
