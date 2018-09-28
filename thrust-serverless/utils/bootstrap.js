const consoleColors = require('console-colors')
const singletons = require('/utils/singletons')

const http = singletons.http
const router = singletons.router
const auth = singletons.auth

const greenColor = consoleColors.make(consoleColors.COLORS.GREEN)
const blueColor = consoleColors.make(consoleColors.COLORS.BLUE)

exports = function () {
  console.log(blueColor('Bootstraping API...'))

  require.dangerouslyClearRequireCache()

  router.addMiddleware(auth)

  Object.keys(router.vroutes).forEach(function (route) {
    delete router.vroutes[route]
  })

  auth.clearNotAuthenticatedUrls()

  require('/api/index.js')(http, router, auth)

  const apiRoutes = Object.keys(router.vroutes)

  if (apiRoutes.length) {
    console.log()
    console.log(blueColor('-- Deployed routes --'))

    apiRoutes.forEach(function (route) {
      console.log(greenColor(' - ' + route))
    })

    console.log()
  }

  auth.addNotAuthenticatedUrls([
    '/admin/deploy/api'
  ])

  console.log(greenColor('API successfully boostraped'))
  console.log()
}
