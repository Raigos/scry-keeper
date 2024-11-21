import { collection, getDocs, query, where } from 'firebase/firestore'

import { Friend } from '@/types/friend.interface.ts'
import { logger } from '@/utils/logger'

import { db } from '../firebase.js'

export const getFriend = async (userName: string): Promise<Friend | null> => {
  try {
    const friendsRef = collection(db, 'friends')
    const q = query(friendsRef, where('name', '==', userName))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      logger.info('No friend found', {
        module: 'database',
        action: 'getFriend',
        userName,
      })
      return null
    }

    const doc = querySnapshot.docs[0]
    const data = doc.data() as Friend

    logger.info('Friend found', {
      module: 'database',
      action: 'getFriend',
      userName,
      hasDevice: !!data.deviceCredential,
    })

    return data
  } catch (error) {
    logger.error('Error getting friend', error, {
      module: 'database',
      action: 'getFriend',
      userName,
    })
    throw error
  }
}
