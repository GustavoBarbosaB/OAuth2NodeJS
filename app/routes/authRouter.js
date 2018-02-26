module.exports = (router,app,authRoutesMethods) => {
  router.post('/registerUser',authRoutesMethods.registerUser);
  router.all('/oauth/token',app.oauth.token(),authRoutesMethods.login);
  //router.post(,app.oauth.token());

  return router;
}
