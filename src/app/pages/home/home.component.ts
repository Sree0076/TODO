import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

export interface Todos {
  id:number
  todo: string;
  completed: boolean;
  userId: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule,CommonModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})export class HomeComponent  {
deleteRow(_t52: any) {
throw new Error('Method not implemented.');
}
editRow(_t52: any) {
throw new Error('Method not implemented.');
}
  todos: Todos[] = [];
  displayedColumns: string[] = ['select', 'Task', 'status', 'actions'];
  dataSource: MatTableDataSource<Todos>;
  selection = new SelectionModel<Todos>(true, []);

  constructor(private httpService: HttpService) {
    this.dataSource = new MatTableDataSource<Todos>(this.todos); // Initialize with empty array
  }

  ngOnInit() {
    this.httpService.getTodos().subscribe(
      (data) => {
        this.todos = data.todos;
        this.dataSource.data = this.todos; // Assign fetched data to dataSource
        console.log('Fetched todos:', this.todos);
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
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
    this.selection.select(...this.dataSource.data);
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
      event.source.checked = false;
    } else {
      this.selection.toggle(row); // Allow toggling selection if not disabled
    }
  }


}
