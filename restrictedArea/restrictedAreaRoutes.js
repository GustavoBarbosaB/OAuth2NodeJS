module.exports = (router, app, restrictedAreaRoutesMethods)=>{
    router.post('/teste',app.oauth.authorise(),restrictedAreaRoutesMethods.accessRestrictedArea);

    return router;
}
