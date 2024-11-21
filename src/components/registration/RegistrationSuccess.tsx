import { useState } from 'react'

import { Fingerprint } from 'lucide-react'

import { RegistrationForm } from '@/components/registration/RegistrationForm.tsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useWebAuthn } from '@/hooks/useWebAuth'
import { RegistrationToken } from '@/types/registrationToken.interface'

interface RegistrationSuccessProps {
  registrationData: RegistrationToken
  onSubmit: (data: FormData, webAuthnData?: PublicKeyCredential) => Promise<void>
}

export const RegistrationSuccess = ({ registrationData, onSubmit }: RegistrationSuccessProps) => {
  const [webAuthnData, setWebAuthnData] = useState<PublicKeyCredential | null>(null)
  const [fingerprintError, setFingerprintError] = useState<string | null>(null)
  const { registerFingerprint } = useWebAuthn()

  const handleFingerprintSetup = async () => {
    try {
      setFingerprintError(null)
      const credential = await registerFingerprint(registrationData.name)
      setWebAuthnData(credential)
    } catch (error) {
      setFingerprintError(error instanceof Error ? error.message : 'Fingerprint registration failed')
    }
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTitle>Valid Registration Found</AlertTitle>
        <AlertDescription>Welcome {registrationData.name}! Please complete your registration below.</AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Step 1: Setup Device Security</h3>
        <div className="bg-muted p-4 rounded-lg">
          <Button
            onClick={handleFingerprintSetup}
            disabled={!!webAuthnData}
            className="w-full"
            variant={webAuthnData ? 'outline' : 'default'}
          >
            <Fingerprint className="mr-2 h-4 w-4" />
            {webAuthnData ? 'Fingerprint Registered ✓' : 'Register Fingerprint'}
          </Button>
          {fingerprintError && <p className="text-sm text-destructive mt-2">{fingerprintError}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Step 2: Complete Registration</h3>
        <RegistrationForm
          registrationData={registrationData}
          onSubmit={onSubmit}
          disabled={!webAuthnData}
          webAuthnData={webAuthnData}
        />
      </div>
    </div>
  )
}
