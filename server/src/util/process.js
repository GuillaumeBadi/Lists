function onProcessHook(hook) {
  process.on('SIGINT', (...args) => hook('SIGINT', ...args))
  if (process.env.NODE_ENV !== 'test') {
    process.on(
      'unhandledRejection',
      (...args) => hook('unhandledRejections', ...args)
    )
    process.on(
      'uncaughtException',
      (...args) => hook('uncaughtException', ...args)
    )
  }
}

module.exports = {
  onProcessHook
}
