import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { BaseRegistrationCard } from '@/components/registration/BaseRegistrationCard'
import { RegistrationError } from '@/components/registration/RegistrationError'
import { RegistrationLoading } from '@/components/registration/RegistrationLoading'
import { RegistrationSuccess } from '@/components/registration/RegistrationSuccess'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useRegistration } from '@/contexts/RegistrationContext'
import { useRegistrationFlow } from '@/hooks/useRegistrationFlow'

export function Registration() {
  const { userName } = useParams<{ userName: string }>()
  const { state } = useRegistration()
  const { verifyUsername, submitRegistration } = useRegistrationFlow()

  useEffect(() => {
    if (userName) {
      verifyUsername(userName)
    }
  }, [userName])

  if (state.loading) {
    return (
      <BaseRegistrationCard>
        <RegistrationLoading userName={userName} />
      </BaseRegistrationCard>
    )
  }

  if (state.error) {
    return (
      <BaseRegistrationCard title="Registration Error">
        <RegistrationError error={state.error} />
      </BaseRegistrationCard>
    )
  }

  if (state.registrationData) {
    return (
      <BaseRegistrationCard title="Complete Registration">
        <RegistrationSuccess
          registrationData={state.registrationData}
          // @ts-ignore
          onSubmit={submitRegistration}
        />
      </BaseRegistrationCard>
    )
  }

  return (
    <BaseRegistrationCard title="Something went wrong">
      <Alert>
        <AlertTitle>Unexpected State</AlertTitle>
        <AlertDescription>We encountered an unexpected error. Please try again or contact support if the issue persists.</AlertDescription>
      </Alert>
    </BaseRegistrationCard>
  )
}

export default Registration
