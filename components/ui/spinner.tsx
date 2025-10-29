import { Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface SpinnerProps extends React.ComponentProps<'svg'> {
  variant?: 'default' | 'yellow' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

function Spinner({ className, variant = 'default', size = 'md', ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: 'size-4',
    md: 'size-6', 
    lg: 'size-8'
  }

  const variantClasses = {
    default: 'text-foreground',
    yellow: 'text-yellow-500',
    white: 'text-white'
  }

  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('animate-spin', sizeClasses[size], variantClasses[variant], className)}
      {...props}
    />
  )
}

// Loading with text component
function LoadingWithText({ 
  text = 'Loading...', 
  variant = 'yellow', 
  size = 'lg',
  className = ''
}: { 
  text?: string
  variant?: 'default' | 'yellow' | 'white'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4 p-8", className)}>
      <Spinner variant={variant} size={size} />
      <p className="text-foreground font-medium animate-pulse">{text}</p>
    </div>
  )
}

export { Spinner, LoadingWithText }
