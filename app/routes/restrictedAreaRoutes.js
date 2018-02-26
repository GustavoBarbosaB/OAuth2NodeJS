module.exports = (router, app, restrictedAreaRoutesMethods)=>{
    router.get('/teste',app.oauth.authenticate(),restrictedAreaRoutesMethods.accessRestrictedArea);

    return router;
}
