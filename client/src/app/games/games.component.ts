import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: any;
  players: any;
  game_id: any;
  new_game: any;
  errors: any;
  allGames: boolean;
  gameView: any;
  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.games;
    this.getGames();
    this.allGames = true;
  }
  
  addGame()
  {
    let obs = this._http.getPlayers();
    obs.subscribe(data => {
      this.new_game = {};
      this.new_game['id'] = this.game_id;
      this.players = data['players'];
      for(let i = 0; i < this.players.length; i++)
      {
        this.players[i]['games'] = [];
        this.players[i]['games'].push(this.game_id);
        this.players[i]['status'] = 0;
      }
      this.new_game['players'] = this.players
      this.game_id++
      let new_obs = this._http.createGame(this.new_game);
      new_obs.subscribe(data => {
        console.log(data)
        this.getGames()
      })
    })
  }


  getGames()
  {
    let obs = this._http.getGames();
    obs.subscribe(data => {
      if(data['errors'])
      {
        this.errors = data['errors']
      }
      else
      {
        this.games = data['games']
        console.log(this.games)
        if(!this.games.length)
        {
          this.game_id = 1
        }
        else{
          this.game_id = this.games[this.games.length-1].game.id + 1;
        }
      }
    })
  }

  delete(id)
  {
    if(confirm("Are you sure you want to delete this game?"))
    {
      let obs = this._http.deleteGame(id)
      obs.subscribe(data => {
        if(data['err'])
        {
          this.errors = data['errors']
        }
        else
        {
          this.getGames()
        }
      })
    }
  }

  expandGame(id)
  {
    for(let game = 0; game< this.games.length; game++)
    {
      if (this.games[game]._id == id)
      {
        this.gameView = this.games[game];
        console.log("hi")
      } 
    }
    console.log(this.gameView)
    this.allGames = false;
  }

  saveGame(id)
  {
    let obs = this._http.saveGame(id, this.gameView)
    obs.subscribe(data =>
    {
      console.log(data)
      this.allGames = true
    })
  }
}
