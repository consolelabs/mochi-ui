import { Typography } from '@mochi-ui/core'
/* import { useEffect, useState } from 'react' */
/* import { formatRelative } from '~utils/time' */
/* import diffInMinutes from 'date-fns/differenceInMinutes' */

interface Props {
  date: string
  raw: string
}

export const TransactionTime = ({ date, raw: _raw }: Props) => {
  /* const [live, setLive] = useState('') */
  /* const [id, setId] = useState(-1) */
  /**/
  /* useEffect(() => { */
  /*   const newId = window.setInterval(() => { */
  /*     const deltaMins = Math.abs(diffInMinutes(new Date(raw), new Date())) */
  /*     if (deltaMins < 1) { */
  /*       setLive(formatRelative(raw)) */
  /*       return */
  /*     } */
  /**/
  /*     window.clearInterval(id) */
  /*   }, 1000) */
  /**/
  /*   setId(newId) */
  /**/
  /*   return () => window.clearInterval(id) */
  /*   // eslint-disable-next-line react-hooks/exhaustive-deps */
  /* }, []) */
  /**/
  /* if (live) { */
  /*   return ( */
  /*     <Typography level="p5" className="tabular-nums text-left"> */
  /*       {live} */
  /*     </Typography> */
  /*   ) */
  /* } */
  return (
    <Typography level="p5" className="tabular-nums text-left">
      {date}
    </Typography>
  )
}
