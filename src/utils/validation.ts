import { RegistrationToken } from '@/types/registrationToken.interface.ts'

export const isRegistrationToken = (data: unknown): data is RegistrationToken => {
  if (!data || typeof data !== 'object') {
    return false
  }

  const token = data as Record<string, unknown>

  return 'id' in token && typeof token.id === 'string' && 'used' in token && typeof token.used === 'boolean'
}
