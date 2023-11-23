import doCleanUp from './clean'
import { generateSvgs } from './utils'

doCleanUp()

generateSvgs().then(() => {
  console.info('generate svg components successfully')
})
