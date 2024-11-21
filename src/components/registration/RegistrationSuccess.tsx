import { RegistrationForm } from '@/components/registration/RegistrationForm.tsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RegistrationToken } from '@/types/registrationToken.interface'

interface RegistrationSuccessProps {
  registrationData: RegistrationToken
  onSubmit: (data: FormData) => Promise<void>
}

export const RegistrationSuccess = ({ registrationData, onSubmit }: RegistrationSuccessProps) => (
  <div className="space-y-6">
    <Alert>
      <AlertTitle>Valid Registration Found</AlertTitle>
      <AlertDescription>Welcome {registrationData.name}! Please complete your registration below.</AlertDescription>
    </Alert>
    <RegistrationForm onSubmit={onSubmit} />
  </div>
)
