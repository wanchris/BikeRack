var Location = require('../models/locations');
var User = require('../users');
var Message = require('../models/message');
var mongoose = require('mongoose');

module.exports = {
    newLocation: newLocation,
//    createUser: createUser,
    getSearch: getSearch
}

function newLocation(req, res){
    console.log("start");
    const errors = req.validationErrors();
    if (errors){
        req.flash("errors", errors.map(err => err.msg));
        res.redirect('/search');
    }
    else{
    //find user
        console.log('next');
        Location.findOne({
            'user': req.user.local.username
        })    
        .then(function (data){
            console.log("away");
            if (!data){
                res.send("nothing in the database!");
            }
            else{
                data.names.push(req.body.name);
                Location.findOneAndUpdate({'user' : req.user.local.username}, 
                {
                    user: req.user.local.username,
                    names: data.names
                }, {upsert: true}, function(err, doc){
                    if (err) return res.send(500, {error: err});
                    console.log("successfully saved");
                });
                res.redirect('/search');
            }
        })
    //take user's location and add id to list if its not inside

    }
}

/**
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
**/

function getSearch(req, res){
    const errors = req.validationErrors();
    //console.log(req.user.local.username);
    if (errors){

        req.flash('errors', errors.map(err => err.msg));
        res.redirect('/user');
    }
    Location.findOne({
        user : req.user.local.username 
    })
    .then (function(data){
        var output = data;
        if (!data){

            Location.create({
                user : req.user.local.username,
                names : []
            });
            output = [];
        }
        else{
            output = data.names;
        }
        res.render('pages/search', 
        {
            locations : output,
            user : req.user.local.username
        });
    
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
