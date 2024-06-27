import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export interface Todos {
  id:number
  todo: string;
  completed: boolean;
  userId: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule,CommonModule,MatIconModule,MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})export class HomeComponent  {
isLoading: boolean=true;
deleteRow(_t52: any) {
throw new Error('Method not implemented.');
}
editRow(row: any) {

}
  todos: Todos[] = [];
  displayedColumns: string[] = ['select', 'Task', 'status', 'actions'];
  dataSource: MatTableDataSource<Todos>;
  selection = new SelectionModel<Todos>(true, []);

  constructor(private httpService: HttpService) {
    this.dataSource = new MatTableDataSource<Todos>(this.todos);
  }

  ngOnInit() {
    this.httpService.getTodos().subscribe(
      (data) => {
        this.todos = data.todos;
        this.isLoading=false;
        this.dataSource.data = this.todos;
        console.log('Fetched todos:', this.todos);
      },
    );
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.dataSource.data.forEach(row => {
      if (!row.completed) {
        this.selection.select(row);
      }
    });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Todos): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  isCheckboxDisabled(row: Todos): boolean {
    return row.completed;
  }

  toggleCheckbox(row: Todos, event: MatCheckboxChange) {
    if (this.isCheckboxDisabled(row)) {
      event.source.checked = true;
    } else {
      this.selection.toggle(row); // Allow toggling selection if not disabled
    }
  }
  isChecked(row: Todos):any
  {
    if (this.isCheckboxDisabled(row)) {
      return true
    }

  }


}
