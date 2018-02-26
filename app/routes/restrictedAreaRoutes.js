module.exports = (router, app, restrictedAreaRoutesMethods)=>{
    router.post('/teste',app.oauth.authenticate(),restrictedAreaRoutesMethods.accessRestrictedArea);

    return router;
}
