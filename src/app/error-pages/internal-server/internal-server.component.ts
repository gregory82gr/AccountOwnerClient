import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrl: './internal-server.component.css'
})
export class InternalServerComponent implements OnInit{

  errorMessage: string = "500 SERVER ERROR, CONTACT ADMINISTRATOR!!!!";

  constructor(){}
  ngOnInit():void{

  }
}
