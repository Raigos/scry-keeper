import { FirebaseError } from 'firebase/app'

export const getFirebaseErrorMessage = (error: FirebaseError): string => {
  const errorMap: Record<string, string> = {
    'permission-denied': "You don't have permission to access this registration",
    'not-found': 'Registration not found',
    'failed-precondition': 'Registration is invalid or expired',
    unavailable: 'Service temporarily unavailable. Please try again later',
    'resource-exhausted': 'Too many requests. Please try again later',
    unauthenticated: 'Please sign in to continue',
  }

  return errorMap[error.code] ?? `Firebase error: ${error.message}`
}

export const handleError = (error: unknown): Error => {
  if (error instanceof FirebaseError) {
    return new Error(getFirebaseErrorMessage(error))
  }

  if (error instanceof Error) {
    return error
  }

  return new Error('An unexpected error occurred')
}
