import {AfterViewInit, Component, ElementRef, Inject, inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {SheetService} from "../../services/sheet/sheet.service";
import {SheetCell} from "../../services/sheet/sheet";
import {isPlatformBrowser, NgStyle} from "@angular/common";
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bingo-board',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './bingo-board.component.html',
  styleUrl: './bingo-board.component.css'
})
export class BingoBoardComponent implements OnInit, AfterViewInit{
  sheetHeaders: SheetCell[] = []
  sheetCells: SheetCell[] = []
  selectedCell: SheetCell | null = null
  isBrowser: boolean = false
  public chart: any;

  @ViewChild('canvas') canvas!: ElementRef;

  sheetService = inject(SheetService)

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    this.sheetCells = this.sheetService.getSheetCells()
    if (this.sheetCells.length >0){
      this.sheetHeaders = this.sheetCells.slice(0,1)
      this.sheetCells = this.sheetCells.slice(0)
    }
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(){
    this.createChart()
  }

  createChart(){
    const data = [
      { teamName: TeamNames.team_1, points: this.getTeamPoints(TeamNames.team_1) },
      { teamName: TeamNames.team_2, points: this.getTeamPoints(TeamNames.team_2) },
      { teamName: TeamNames.team_3, points: this.getTeamPoints(TeamNames.team_3) },
    ];

    let teamTotalPointChartRef = this.canvas ? this.canvas.nativeElement.getContext('2d') : ''
    new Chart(
      teamTotalPointChartRef,
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.teamName),
          datasets: [
            {
              label: 'Points per Team',
              data: data.map(row => row.points),
              backgroundColor: [
                'rgb(15, 110, 253)',
                'rgb(25, 135, 84)',
                'rgb(255, 193, 7)'
              ],
            }
          ]
        }
      }
    );
  }

  cellSelected(cell: SheetCell){
    this.selectedCell = this.selectedCell !== cell ? cell : null
  }

  getTeamProgressValue(teamName: TeamNames): string{
    switch (teamName) {
      case TeamNames.team_1:
        return (Math.round((this.sheetCells.filter(cell => cell.team_1_status === 'Y').length)/this.sheetCells.length * 100)).toString()
      case TeamNames.team_2:
        return (Math.round((this.sheetCells.filter(cell => cell.team_2_status === 'Y').length)/this.sheetCells.length * 100)).toString()
      case TeamNames.team_3:
        return (Math.round((this.sheetCells.filter(cell => cell.team_3_status === 'Y').length)/this.sheetCells.length * 100)).toString()
    }
  }

  getTeamPoints(teamName: TeamNames): number{
    let teamPoints: number = 0
    switch (teamName) {
      case TeamNames.team_1:
        this.sheetCells.forEach(cell => {
          if (cell.team_1_status === 'Y'){
            teamPoints += cell.points
          }
        })
        return teamPoints
      case TeamNames.team_2:
        this.sheetCells.forEach(cell => {
          if (cell.team_2_status === 'Y'){
            teamPoints += cell.points
          }
        })
        return teamPoints
      case TeamNames.team_3:
        this.sheetCells.forEach(cell => {
          if (cell.team_3_status === 'Y'){
            teamPoints += cell.points
          }
        })
        return teamPoints
    }
  }

  protected readonly TeamNames = TeamNames;
}

export enum TeamNames {
  team_1 = 'Team 1',
  team_2 = 'Team 2',
  team_3 = 'Team 3'
}
