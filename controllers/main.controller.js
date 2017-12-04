var Location = require('../models/locations');
var User = require('../models/users');
var Message = require('../models/message');
var mongoose = require('mongoose');

module.exports = {
    newLocation: newLocation,
    createUser: createUser,
    getSearch: getSearch
}

function newLocation(req, res){
    const errors = req.validationErrors();
    if (errors){
        req.flash("errors", errors.map(err => err.msg));
        res.redirect('/search');
    }
    else{
    //find user
        User.findOne({
            username: req.user
        })    
        .then(function (data){
            if (!data){
                console.log(req);
                res.send("nothing in the database!");
            }
            else{
                data.locations.push(req.name);
            }
        })
    //take user's location and add id to list if its not inside

    }
}

function createUser(req, res){
    
        User.create(
            {
                
                    username: "Fred",
                    password: "Random",
                    locations: []
                    
        

            }, function(err, person){
                if (err) return console.error(err);  
            }   
        );
        res.redirect("/search");    
    
}

function getSearch(req, res){
    User.findOne({
        username : 'Fred'
    })
    .then (function(data){
        if (!data){
            res.send("nothing in the database!");
        }
        else{
            console.log(typeof(data.locations));
            res.render('pages/search', 
            {
                locations : data.locations
            });
        }
    });


}

/**
function createUser(req, res){
    User.findOne({
        'local.username': "Fred"
    })
    .then(function (data){
        if (!data){
            res.send("nothing in the database!");
        }
        else{
            console.log(data);

        }

    })

}
**/
