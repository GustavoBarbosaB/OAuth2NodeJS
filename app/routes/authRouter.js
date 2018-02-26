module.exports = (router,app,authRoutesMethods) => {
  router.post('/registerUser',authRoutesMethods.registerUser);
  router.all('/token',app.oauth.token(),authRoutesMethods.login);

  return router;
}
