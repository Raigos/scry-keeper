import { useParams } from 'react-router-dom'

import { RegistrationError } from '../../components/registration/RegistrationError'
import { RegistrationSuccess } from '../../components/registration/RegistrationSuccess'
import { useRegistration } from '../../contexts/RegistrationContext' // Add this import
import { useRegistrationVerification } from '../../hooks/useRegistrationVerification'

function Registration() {
  const { userName } = useParams<{ userName: string }>()
  const { state } = useRegistration() // We only need state here since the hook will handle dispatch
  useRegistrationVerification(userName) // This hook will now use the context internally

  if (state.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Checking Registration...</h2>
        </div>
      </div>
    )
  }

  if (state.error) {
    return <RegistrationError error={state.error} />
  }

  if (!state.registrationData) {
    return (
      <>Nodata!</>
      // <Navigate
      //   to="/"
      //   replace
      // />
    )
  }

  return <RegistrationSuccess registrationData={state.registrationData} />
}

export default Registration
