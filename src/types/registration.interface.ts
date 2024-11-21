import { RegistrationToken } from '@/types/registrationToken.interface.ts'

export interface RegistrationState {
  loading: boolean
  error: Error | null
  registrationData: RegistrationToken | null
  webAuthnData?: PublicKeyCredential | null
}
