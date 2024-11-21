import { createContext, ReactNode, useContext, useReducer } from 'react'

import { Friend } from '@/types/friend.interface'

interface RegistrationState {
  registrationData: Friend | null
  loading: boolean
  error: Error | null
  isInitial: boolean
  currentStep: 'initial' | 'verifying' | 'complete'
}

type RegistrationAction =
  | { type: 'START_VERIFICATION' }
  | { type: 'SET_ERROR'; payload: Error }
  | { type: 'SET_REGISTRATION_DATA'; payload: Friend }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET' }

const initialState: RegistrationState = {
  registrationData: null,
  loading: false,
  error: null,
  isInitial: true,
  currentStep: 'initial',
}

const RegistrationContext = createContext<
  | {
      state: RegistrationState
      dispatch: React.Dispatch<RegistrationAction>
    }
  | undefined
>(undefined)

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(registrationReducer, initialState)

  return <RegistrationContext.Provider value={{ state, dispatch }}>{children}</RegistrationContext.Provider>
}

export function useRegistration() {
  const context = useContext(RegistrationContext)
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider')
  }
  return context
}

const registrationReducer = (state: RegistrationState, action: RegistrationAction): RegistrationState => {
  switch (action.type) {
    case 'START_VERIFICATION':
      return {
        ...state,
        loading: true,
        error: null,
        currentStep: 'verifying',
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
        isInitial: false,
      }

    case 'SET_REGISTRATION_DATA':
      return {
        ...state,
        registrationData: action.payload,
        error: null,
        loading: false,
        isInitial: false,
        currentStep: 'complete',
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}
