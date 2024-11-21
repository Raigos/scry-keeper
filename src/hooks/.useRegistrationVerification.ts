// import { useEffect } from 'react'
//
// import { handleError } from '@/utils/errors/fireship'
// import { logger } from '@/utils/logger'
// import { isRegistrationToken } from '@/utils/validation'
//
// import { useRegistration } from '../contexts/RegistrationContext'
//
// export const useRegistrationVerification = (userName: string | undefined) => {
//   const { dispatch } = useRegistration()
//
//   const handleVerificationError = (isActive: boolean, err: unknown, message?: string) => {
//     if (!isActive) return
//
//     logger.error(`Registration verification ${message || 'failed'}`, err, {
//       module: 'registration',
//       action: 'verify',
//     })
//
//     dispatch({
//       type: 'SET_ERROR',
//       payload: message ? new Error(message) : handleError(err),
//     })
//   }
//
//   useEffect(() => {
//     if (!userName) {
//       handleVerificationError(true, new Error('No username provided'), 'No username provided')
//       return
//     }
//
//     dispatch({ type: 'START_VERIFICATION' })
//     const controller = new AbortController()
//     let isActive = true
//
//     const verifyRegistration = async () => {
//       try {
//         const response = await checkToken(userName)
//
//         if (!isActive) return
//
//         if (!response) {
//           handleVerificationError(isActive, new Error('No registration found'), 'No registration found for this name')
//           return
//         }
//
//         console.log('Response data:', JSON.stringify(response, null, 2))
//         if (!isRegistrationToken(response)) {
//           handleVerificationError(isActive, new Error('Invalid token format'), 'Invalid registration data received')
//           return
//         }
//
//         // if (response.used) {
//         //   handleVerificationError(isActive, new Error('Token already used'), 'This registration has already been used')
//         //   return
//         // }
//
//         dispatch({ type: 'SET_REGISTRATION_DATA', payload: response })
//       } catch (err) {
//         handleVerificationError(isActive, err)
//       }
//     }
//
//     verifyRegistration().catch((err: unknown) => {
//       handleVerificationError(isActive, err, 'An unexpected error occurred')
//     })
//
//     return () => {
//       isActive = false
//       controller.abort()
//     }
//   }, [userName, dispatch])
// }
