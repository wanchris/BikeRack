// export router
modules.exports = function(app) {
    app.get('/', function(req, res) {
        if (req.user) {
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });

    app.get('/login', function(req, res) {
        res.render('login');
    })

    app.get('/signup', function(req, res) {
        res.render('signup');
    })

function loggedIn(req, res, next) {
    if (req.user) {
        next();
        return true;
    } else {
        res.redirect('/login');
        return false;
    }
}
