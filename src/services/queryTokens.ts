import { collection, getDocs, query, where } from 'firebase/firestore'

import { RegistrationToken } from '@/types/registrationToken.interface.ts'
import { logger } from '@/utils/logger'

import { db } from '../firebase.js'

export const checkToken = async (userName: string): Promise<RegistrationToken | null> => {
  try {
    const tokensRef = collection(db, 'registrationTokens')
    const q = query(tokensRef, where('name', '==', userName))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      logger.info('No registration token found', {
        module: 'database',
        action: 'checkToken',
        userName,
      })
      return null
    }

    const doc = querySnapshot.docs[0]
    const data = doc.data() as RegistrationToken

    if (data.used) {
      logger.warn('Token already used', {
        module: 'database',
        action: 'checkToken',
        userName,
        tokenId: data,
      })
    }

    return data
  } catch (error) {
    logger.error('Error checking token', error, {
      module: 'database',
      action: 'checkToken',
      userName,
    })
    throw error
  }
}
