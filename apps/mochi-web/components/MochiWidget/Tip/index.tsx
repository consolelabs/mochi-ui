import StepOne from './StepOne'
import StepTwo from './StepTwo'
import { useTipWidget } from './store'

export default function Tip() {
  const { step } = useTipWidget()

  if (step === 1) {
    return <StepOne />
  }

  return <StepTwo />
}
