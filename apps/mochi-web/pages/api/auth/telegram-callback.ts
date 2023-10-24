import { NextApiRequest, NextApiResponse } from 'next'
import { HOME_URL } from '~envs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { token, url_location } = req.query
  return res.redirect(
    `${HOME_URL}?token=${token}${
      url_location ? `&url_location=${url_location}` : ''
    }`,
  )
}
