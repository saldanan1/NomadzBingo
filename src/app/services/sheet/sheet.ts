export class SheetCell {
  task: string;
  team_1_status: string;
  team_2_status: string;
  team_3_status: string;
  notes: string

  constructor(task: string, team_1_status: string, team_2_status: string, team_3_status: string, notes: string) {
    this.task = task;
    this.team_1_status = team_1_status;
    this.team_2_status = team_2_status;
    this.team_3_status = team_3_status;
    this.notes = notes;
  }

  public static sheetFromRecord(sheetRecord: any): SheetCell {
    let sheet: SheetCell = new SheetCell(sheetRecord[0], sheetRecord[1], sheetRecord[2], sheetRecord[3], sheetRecord[4]);
    return sheet;
  }
}
