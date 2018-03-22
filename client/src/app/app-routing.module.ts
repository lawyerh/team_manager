import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from "./add/add.component";
import { GamesComponent } from "./games/games.component";
import { ManageComponent } from "./manage/manage.component";
import { ListComponent } from "./list/list.component";

const routes: Routes = [
  {path: "manage", component: ManageComponent, children: [
    {path: "list", component: ListComponent},
    {path: "add", component: AddComponent}
  ]},
  
  {path:"games", component: GamesComponent},
  {path:"", pathMatch: 'full', redirectTo:'/manage/list'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
