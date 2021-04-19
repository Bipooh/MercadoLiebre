function guestMiddleware(req,res,next) {
    if(req.session.usuarioLogueado == undefined) {
        next();
    } else {
        res.send("No estas logeado");
    }
};

module.exports = guestMiddleware;