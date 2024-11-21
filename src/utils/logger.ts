interface LogContext {
  module: 'database' | 'registration'
  action?: 'checkToken' | 'verify' | 'getFriend'

  [key: string]: unknown
}

const formatContext = (context: LogContext): string => {
  const { module, action, ...rest } = context
  const location = module && action ? `[${module}/${action}]` : module ? `[${module}]` : ''
  const extras = Object.keys(rest).length ? `: ${JSON.stringify(rest)}` : ''

  return `${location}${extras}`
}

export const logger = {
  error: (message: string, error: unknown, context: LogContext) => {
    console.error(`${formatContext(context)} ${message}`, error instanceof Error ? error : JSON.stringify(error))
  },

  warn: (message: string, context: LogContext) => {
    console.warn(`${formatContext(context)} ${message}`)
  },

  info: (message: string, context: LogContext) => {
    console.info(`${formatContext(context)} ${message}`)
  },

  debug: (message: string, data: unknown = null, context: LogContext) => {
    console.debug(`${formatContext(context)} ${message}`, data ? JSON.stringify(data, null, 2) : '')
  },
}
