function log1(req, res, next,next) {
    console.log("Log 1");

}
function log2(req, res, next) {
    console.log("Log 2");
}


module.exports = log1;