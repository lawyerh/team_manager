const express = require('express')

const app = express()

const path = require("path")

const bp = require('body-parser')

app.use(bp.json())

app.use(express.static(path.join(__dirname + "/client/dist")))


const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/team_manager")

var Schema = mongoose.Schema

var playerSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    position: {type: String, required: false}
}, {timestamps: true})

var gameSchema = new mongoose.Schema({
    game: Object
}, {timestamps: true})

mongoose.model("player", playerSchema)
mongoose.model("game", gameSchema)

var Player = mongoose.model("player")
var Game = mongoose.model("game")

app.post('/games', function(req, res)
{
    var new_game = new Game({game: req.body.game})
    new_game.save(function(err){
        if(err)
        {
            res.json({error: err})
        }
        else
        res.json({status: "Success!"})
    })
})

app.get('/games', function(req,res){
    Game.find({}, function(err, games){
        if(err)
        {
            res.json({errors: err})
        }
        else
        {
            res.json({games: games})
        }
    })
})

app.delete('/games/:id', function(req,res){
    Game.remove({_id: req.params.id}, function(err){
        if(err)
        {
            res.json({errors: err})
        }
        else
        {
            res.json({status: "success"})
        }
    })
})

app.put('/games/:id', function(req,res){
    console.log(req.body.updatedGame)
    Game.findOne({_id: req.params.id}, function(err, game_to_change){
        console.log(game_to_change)
        if(err)
        {
            res.json({errors: err})
        }
        else
        {
            game_to_change.game = req.body.updatedGame.game
            game_to_change.save(function(err){
                if(err)
                {
                    res.json({errors: err})
                }
                else{
                    res.json({status: "successfully updated game!"})
                }
            })
        }
    })
})

app.post("/players", function(req, res){
    console.log(req.body)
    var player = new Player ({
        name: req.body.name
    })
    if(req.body.position != "")
    {
        player.position = req.body.position
    }
    else
    {
        player.position = "Undecided"
    }
    player.save(function(err){
        if(err)
        {
            res.json({status:"There were errors", errors: err})
        }
        else
        {
            res.json({status:"Successfully added a player"})
        }
        
    })
})

app.get('/players', function(req,res){
    Player.find({}, function(err, players){
        if(err)
        {
            res.json({status:"There were errors", errors: err})
        }
        else
        {
            res.json({status:"Successfully added a player", players: players})
        }
    })
})

app.delete('/players/:id', function(req,res){
    Player.remove({_id: req.params.id}, function(err)
    {
        if(err)
        {
            res.json({errors: err});
        }
        else
        {
            res.json({status: "success"});
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve(__dirname + "/client/dist/index.html"))
})

app.listen(8888, function(){
    console.log("Listening at 8888")
})