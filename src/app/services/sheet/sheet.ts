export class SheetCell {
  task: string;
  team_1_status: string;
  team_2_status: string;
  team_3_status: string;
  points: number;
  notes: string

  constructor(task: string, team_1_status: string, team_2_status: string, team_3_status: string, points: number, notes: string) {
    this.task = task;
    this.team_1_status = team_1_status;
    this.team_2_status = team_2_status;
    this.team_3_status = team_3_status;
    this.points = points
    this.notes = notes;
  }

  public static sheetFromRecord(sheetRecord: any): SheetCell {
    let sheet: SheetCell = new SheetCell(sheetRecord[0].v, sheetRecord[1].v, sheetRecord[2].v, sheetRecord[3].v, sheetRecord[4].v, sheetRecord[5].v ? sheetRecord[5].v : '');
    return sheet;
  }
}
