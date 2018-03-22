import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service"

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  players: any;
  errors: any;
  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.errors = [];
    this.getPlayers()
  }

  getPlayers()
  {
    let obs = this._http.getPlayers()
    obs.subscribe(data => {
      if(data['players']){
        this.players = data['players']
      }
      else
      {
        this.errors = data['errors']
      }  
    })
  }

  delete(id)
  {
    if(confirm("Are you sure you want to delete this player?"))
    {
      let obs = this._http.deletePlayer(id);
      obs.subscribe(data =>
      {
        if(data['errors'])
        {
          this.errors = data['errors']
        }
        else
        {
          this.getPlayers()
        }
      })
    }
  }

}
