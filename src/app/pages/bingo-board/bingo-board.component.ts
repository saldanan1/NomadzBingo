import {Component, inject, OnInit} from '@angular/core';
import {SheetService} from "../../services/sheet/sheet.service";
import {SheetCell} from "../../services/sheet/sheet";

@Component({
  selector: 'app-bingo-board',
  standalone: true,
  imports: [],
  templateUrl: './bingo-board.component.html',
  styleUrl: './bingo-board.component.css'
})
export class BingoBoardComponent implements OnInit{
  sheetHeaders: SheetCell[] = []
  sheetCells: SheetCell[] = []
  selectedCell: SheetCell | null = null

  sheetService = inject(SheetService)
  ngOnInit(): void {
    this.sheetCells = this.sheetService.getSheetCells()
    if (this.sheetCells.length >0){
      this.sheetHeaders = this.sheetCells.slice(0,1)
      this.sheetCells = this.sheetCells.slice(1)
    }

  }

  cellSelected(cell: SheetCell){
    console.log(cell)
    this.selectedCell = this.selectedCell !== cell ? cell : null
  }

}
