// hooks/useWebAuthn.ts
import { startRegistration } from '@simplewebauthn/browser'
import type { RegistrationResponseJSON } from '@simplewebauthn/types'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { db } from '@/firebase'

interface WebAuthnOptions {
  challenge: string
  rp: {
    name: string
    id: string
  }
  user: {
    id: string
    name: string
    displayName: string
  }
  pubKeyCredParams: {
    alg: number
    type: 'public-key'
  }[]
  timeout: number
  attestation: string
  authenticatorSelection: {
    authenticatorAttachment: string
    userVerification: string
  }
}

export const useWebAuthn = () => {
  // Helper function to get registration options
  const getRegistrationOptions = async (username: string): Promise<WebAuthnOptions> => {
    try {
      // Get or create a challenge document for this registration
      const challengeRef = doc(db, 'webauthn_challenges', username)
      const challengeDoc = await getDoc(challengeRef)

      let challenge: string

      if (!challengeDoc.exists()) {
        // Create a new random challenge
        const array = new Uint8Array(32)
        window.crypto.getRandomValues(array)
        // @ts-ignore
        challenge = btoa(String.fromCharCode.apply(null, array))

        // Store the challenge
        await setDoc(challengeRef, {
          challenge,
          timestamp: new Date().toISOString(),
        })
      } else {
        challenge = challengeDoc.data().challenge
      }

      // Create WebAuthn options
      return {
        challenge,
        rp: {
          name: 'Scry Keeper',
          id: window.location.hostname,
        },
        user: {
          id: btoa(username), // base64 encoding of username
          name: username,
          displayName: username,
        },
        pubKeyCredParams: [
          { alg: -7, type: 'public-key' }, // ES256
          { alg: -257, type: 'public-key' }, // RS256
        ],
        timeout: 60000,
        attestation: 'direct',
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
        },
      }
    } catch (error) {
      console.error('Error getting registration options:', error)
      throw new Error('Failed to get registration options')
    }
  }

  const registerFingerprint = async (username: string): Promise<RegistrationResponseJSON> => {
    try {
      const options = await getRegistrationOptions(username)

      // Start the registration process
      // @ts-ignore
      const credential = await startRegistration(options)

      // Store the credential in Firebase
      const credentialRef = doc(db, 'webauthn_credentials', username)
      await setDoc(credentialRef, {
        credential,
        username,
        timestamp: new Date().toISOString(),
      })

      return credential
    } catch (error) {
      console.error('Fingerprint registration error:', error)
      // @ts-ignore
      if (error.name === 'NotAllowedError') {
        throw new Error('Fingerprint registration was cancelled or denied')
      } // @ts-ignore
      if (error.name === 'NotSupportedError') {
        throw new Error('Your device does not support fingerprint authentication')
      }

      throw new Error('Failed to register fingerprint')
    }
  }

  const verifyFingerprint = async (username: string, credential: RegistrationResponseJSON) => {
    try {
      // Get the stored challenge
      const challengeRef = doc(db, 'webauthn_challenges', username)
      const challengeDoc = await getDoc(challengeRef)

      if (!challengeDoc.exists()) {
        throw new Error('Invalid registration session')
      }

      // Parse the client data
      const clientDataJSON = JSON.parse(new TextDecoder().decode(Buffer.from(credential.response.clientDataJSON, 'base64')))

      // Verify the challenge
      if (clientDataJSON.challenge !== challengeDoc.data().challenge) {
        throw new Error('Challenge verification failed')
      }

      // Verify the origin
      if (clientDataJSON.origin !== window.location.origin) {
        throw new Error('Origin verification failed')
      }

      // If all verifications pass, return true
      return true
    } catch (error) {
      console.error('Fingerprint verification error:', error)
      throw error instanceof Error ? error : new Error('Failed to verify fingerprint')
    }
  }

  return {
    registerFingerprint,
    verifyFingerprint,
    getRegistrationOptions, // Exposed for testing or direct usage if needed
  }
}
