import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  name: any;
  position: any
  errors: any;
  valid: boolean;
  constructor(private _http: HttpService, private _router: Router) { }

  ngOnInit() {
    this.name = "";
    this.position = ""
    this.valid = false
  }

  submit()
  {
    let obs = this._http.addPlayer({name: this.name, position: this.position})
    obs.subscribe(data =>
    {
      if(data['errors'])
      {
        this.errors = data['errors']
      }
      else
      {
        this._router.navigate([''])
      }
    })
  }

}
