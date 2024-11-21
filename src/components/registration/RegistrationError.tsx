import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface RegistrationErrorProps {
  error: Error
}

export const RegistrationError = ({ error }: RegistrationErrorProps) => {
  if (error.message === 'Friend not found') {
    return (
      <Alert variant="destructive">
        <AlertTitle>Registration Error</AlertTitle>
        <AlertDescription>
          We couldn't find your account in our system. Please contact your administrator if you believe this is a mistake.
        </AlertDescription>
      </Alert>
    )
  }

  if (error.message === 'Device already registered') {
    return (
      <Alert>
        <AlertTitle>Device Already Registered</AlertTitle>
        <AlertDescription>
          This account has already been registered with a device. If you need to register a new device, please contact support.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive">
      <AlertTitle>Registration Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  )
}
