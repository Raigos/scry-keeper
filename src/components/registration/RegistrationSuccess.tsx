import { RegistrationToken } from '../../types/registrationToken.interface'

interface RegistrationSuccessProps {
  registrationData: RegistrationToken
}

export const RegistrationSuccess = ({ registrationData }: RegistrationSuccessProps) => (
  <div className="p-8 max-w-2xl mx-auto">
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-green-800 mb-2">Valid Registration Found</h2>
      <p className="text-green-700">Welcome {registrationData.name}! You can now complete your registration.</p>
    </div>

    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Registration Details</h3>
      <pre className="bg-gray-50 p-4 rounded mt-4">{JSON.stringify(registrationData, null, 2)}</pre>
    </div>
  </div>
)
