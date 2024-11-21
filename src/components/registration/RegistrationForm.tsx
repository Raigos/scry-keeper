import { useState } from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Friend } from '@/types/friend.interface'

interface RegistrationFormProps {
  registrationData: Friend
  onSubmit: (data: FormData, webAuthnData: PublicKeyCredential) => Promise<void>
  disabled?: boolean
  webAuthnData: PublicKeyCredential | null
}

export const RegistrationForm = ({ registrationData, onSubmit, disabled, webAuthnData }: RegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      if (!webAuthnData) {
        setError('Please complete fingerprint registration first')
        return
      }

      setIsSubmitting(true)
      const formData = new FormData(e.currentTarget)
      await onSubmit(formData, webAuthnData)
    } catch (error) {
      console.error('Registration submission failed:', error)
      setError(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="deviceName">Device Name</Label>
        <Input
          id="deviceName"
          name="deviceName"
          placeholder="Enter a name for this device"
          required
          disabled={disabled || isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pin">Backup PIN</Label>
        <Input
          id="pin"
          name="pin"
          type="password"
          pattern="[0-9]{4,6}"
          placeholder="Enter 4-6 digit PIN"
          required
          disabled={disabled || isSubmitting}
        />
        <p className="text-sm text-muted-foreground">This PIN will be used as a backup when fingerprint is unavailable</p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || disabled}
      >
        {isSubmitting ? 'Registering...' : 'Complete Registration'}
      </Button>

      {disabled && (
        <p className="text-sm text-muted-foreground text-center">Please register your fingerprint before completing registration</p>
      )}

      <div className="mt-4 text-sm text-muted-foreground">
        <p>Registering for: {registrationData.name}</p>
      </div>
    </form>
  )
}
