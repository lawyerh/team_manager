import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getPlayers()
  {
    return this._http.get('/players')
  }

  addPlayer(player)
  {
    console.log(player)
    return this._http.post('/players', player)
  }

  deletePlayer(id)
  {
    return this._http.delete('/players/' + id)
  }

  createGame(new_game)
  {
    return this._http.post('/games', {game: new_game})
  }

  getGames()
  {
    return this._http.get('/games')
  }

  deleteGame(id)
  {
    return this._http.delete('/games/' + id)
  }

  saveGame(id, game)
  {
    return this._http.put('/games/' + id, {updatedGame: game})
  }
}
