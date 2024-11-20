interface RegistrationErrorProps {
  error: Error
}

export const RegistrationError = ({ error }: RegistrationErrorProps) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
      <h2 className="text-red-800 text-xl font-semibold mb-2">Registration Error</h2>
      <p className="text-red-600">{error.message}</p>
      <button
        onClick={() => (window.location.href = '/')}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Return Home
      </button>
    </div>
  </div>
)
