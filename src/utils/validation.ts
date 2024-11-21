import { RegistrationToken } from '@/types/registrationToken.interface.ts'

export const isRegistrationToken = (data: unknown): data is RegistrationToken => {
  if (!data || typeof data !== 'object') {
    return false
  }

  const token = data as Record<string, unknown>

  return (
    'deviceCredential' in token &&
    (token.deviceCredential === 'null' || typeof token.deviceCredential === 'string') &&
    'name' in token &&
    typeof token.name === 'string'
  )
}
