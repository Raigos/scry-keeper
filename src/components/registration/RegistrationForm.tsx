import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface RegistrationFormProps {
  onSubmit: (data: FormData) => Promise<void>
}

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Registration submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="deviceName">Device Name</Label>
        <Input
          id="deviceName"
          name="deviceName"
          placeholder="Enter a name for this device"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pin">Security PIN</Label>
        <Input
          id="pin"
          name="pin"
          type="password"
          pattern="[0-9]{4,6}"
          placeholder="Enter 4-6 digit PIN"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Registering...' : 'Complete Registration'}
      </Button>
    </form>
  )
}
