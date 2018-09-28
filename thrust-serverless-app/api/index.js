exports = function (http, router, auth) {
  router.addRoute('/@produtos', '/api/v1/produtos/produtos')

  auth.notAuthenticatedUrls([
    '/@produtos'
  ])
}
