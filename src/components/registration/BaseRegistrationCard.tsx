import { ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BaseRegistrationCardProps {
  title?: string
  children: ReactNode
  className?: string
}

export const BaseRegistrationCard = ({ title, children, className = '' }: BaseRegistrationCardProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className={`w-full max-w-md ${className}`}>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
