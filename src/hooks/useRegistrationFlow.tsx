import { useRegistration } from '@/contexts/RegistrationContext'
import { getFriend } from '@/services/queryFriends'
import { handleError } from '@/utils/errors/fireship'

export const useRegistrationFlow = () => {
  const { dispatch } = useRegistration()

  const verifyUsername = async (username: string) => {
    try {
      dispatch({ type: 'START_VERIFICATION' })

      const friend = await getFriend(username)

      if (!friend) {
        throw new Error('Friend not found')
      }

      if (friend.deviceCredential) {
        throw new Error('Device already registered')
      }

      dispatch({
        type: 'SET_REGISTRATION_DATA',
        payload: friend,
      })
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: handleError(err),
      })
    }
  }

  const submitRegistration = async (formData: FormData) => {
    console.log('Registration submitted with data:', {
      deviceName: formData.get('deviceName'),
      pin: formData.get('pin'),
    })
  }

  return { verifyUsername, submitRegistration }
}
