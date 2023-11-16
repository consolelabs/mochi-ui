import { useShallow } from 'zustand/react/shallow'
import { useEffect } from 'react'
import { useAuthStore } from '~store'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import { useTipWidget } from './store'

export default function Tip() {
  const isLoggedIn = useAuthStore(useShallow((s) => s.isLoggedIn))
  const { step, reset } = useTipWidget()

  useEffect(() => {
    if (!isLoggedIn) {
      reset()
    }
  }, [isLoggedIn, reset])

  if (step === 1) {
    return <StepOne />
  }

  return <StepTwo />
}
