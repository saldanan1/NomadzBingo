import { Component } from '@angular/core';
import {BingoBoardComponent} from "../bingo-board/bingo-board.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    BingoBoardComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
