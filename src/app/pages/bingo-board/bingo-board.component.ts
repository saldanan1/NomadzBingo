import {Component, inject, OnInit} from '@angular/core';
import {SheetService} from "../../services/sheet/sheet.service";

@Component({
  selector: 'app-bingo-board',
  standalone: true,
  imports: [],
  templateUrl: './bingo-board.component.html',
  styleUrl: './bingo-board.component.css'
})
export class BingoBoardComponent implements OnInit{

  sheetService = inject(SheetService)
  ngOnInit(): void {
    // this.sheetService.getSheetData().subscribe((data:any)=>{
    //   console.log(data);
    // })
    this.sheetService.getCooker()
  }

}
