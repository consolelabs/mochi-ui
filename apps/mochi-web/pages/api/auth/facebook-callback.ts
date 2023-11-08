import { NextApiRequest, NextApiResponse } from 'next'
import qs from 'query-string'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url_location, ...rest } = req.query
  return res.redirect(`${url_location}?${qs.stringify(rest)}`)
}
