import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  players: any;
  errors: any;
  toggle: boolean;
  constructor(private _http: HttpService) {}

  ngOnInit() {
    this.errors = [];
    this.toggle = true;
  }

  getPlayers()
  {
    let obs = this._http.getPlayers();
    obs.subscribe(data =>
    {
      if(data['errors'])
      {
        this.errors.push(data['errors'])
        console.log(this.errors)
      }
      else
      {
        this.players = data['players']
        console.log(this.players)
      }
    })
  }
}
