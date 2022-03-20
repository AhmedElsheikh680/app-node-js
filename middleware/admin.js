
module.exports = function (req, res, next){
    if(!req.user.isAdmin) {
        return res.status(403).send('Sorry, you Are Not Admin!!');
    }
    next();
}