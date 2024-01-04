import { useEffect, useState } from 'react'
import Router from 'next/router'
import { useUnsavedChanges } from '~store'

export const useWarnIfUnsavedChanges = (unsavedChanges?: boolean) => {
  const [scheme, setScheme] = useState<'success' | 'danger'>('success')

  const { warning, toggleWarning, setUnsavedChanges } = useUnsavedChanges()

  useEffect(() => {
    setUnsavedChanges(unsavedChanges || false)
    return () => {
      setUnsavedChanges(false)
    }
  }, [setUnsavedChanges, unsavedChanges])

  useEffect(() => {
    if (warning) {
      setScheme('danger')
      setTimeout(() => {
        toggleWarning()
      }, 300)
    }
  }, [toggleWarning, warning])

  useEffect(() => {
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      const warningMessage = 'Careful - you have unsaved changes!'
      e.returnValue = warningMessage
      return warningMessage
    }
    const beforeRouteHandler = (url: string) => {
      if (Router.pathname !== url) {
        setScheme('danger')
        toggleWarning()

        Router.events.emit('routeChangeError')
        throw 'Abort'
      }
    }
    if (unsavedChanges) {
      window.addEventListener('beforeunload', beforeUnloadHandler)
      Router.events.on('routeChangeStart', beforeRouteHandler)
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
      Router.events.off('routeChangeStart', beforeRouteHandler)
      setScheme('success')
    }
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
      Router.events.off('routeChangeStart', beforeRouteHandler)
    }
  }, [toggleWarning, unsavedChanges])

  return { scheme, warning }
}
