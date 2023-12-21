import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await fetch(`${process.env.VERCEL_URL}/tx/e39b334f7d0c`)
    if (response.ok) {
      // Request was successful
      res.status(200).json({ success: true })
    } else {
      // Request failed
      res.status(500).json({ success: false })
    }
  } catch (error) {
    // Error occurred during the request
    res.status(500).json({ success: false })
  }
}
