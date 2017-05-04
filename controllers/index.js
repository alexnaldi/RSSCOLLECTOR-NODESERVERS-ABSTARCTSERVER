var router = require('express').Router();

/*Api to test server connection */
if (process.env.NODE_ENV === 'development') {
    router.get('/test', function(req, res) {
        res.json({message:"Test passed", 
            parameters:{
                environment:process.env.NODE_ENV, 
                serverType:process.env.TYPE_ENV,
                port:process.env.PORT
            }});
    })
}
module.exports = router