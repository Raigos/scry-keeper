interface RegistrationLoadingProps {
  userName?: string
}

export const RegistrationLoading = ({ userName }: RegistrationLoadingProps) => (
  <div className="flex flex-col items-center space-y-4">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <h2 className="text-xl font-semibold">Checking Registration...</h2>
    {userName && <p className="text-muted-foreground">Verifying user {userName}</p>}
  </div>
)
