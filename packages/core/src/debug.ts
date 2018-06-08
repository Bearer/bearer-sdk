export interface ILogger {
  namespace: string
}

class Logger implements ILogger {
  namespace: string

  constructor(namespace) {
    this.namespace = namespace
  }

  log(...args) {
    if (console) {
      console.log.apply(null, [`[${this.namespace}]`, ...args])
    }
  }
}

// const logger = namespace => new Logger(namespace)
function logger(namespace): ILogger {
  return new Logger(namespace)
}

export default logger
