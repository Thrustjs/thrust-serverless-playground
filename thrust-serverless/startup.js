const singletons = require('/utils/singletons')
const bootstrap = require('./utils/bootstrap')

bootstrap()

const port = env('THRUST_PORT', 8778)
singletons.http.createServer(port, singletons.router)
