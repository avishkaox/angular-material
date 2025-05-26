import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ],
  template: `
    <mat-toolbar color="Primary-blue" accent="accent">
      <span>Crud Angular App</span>
      <span class="example-spacer"></span>
      <button (click)="openAddEditEmpForm()" mat-raised-button color="blue">
        ADD EMPLOYEE
      </button>
    </mat-toolbar>
    <mat-form-field>
      <mat-label>Filter</mat-label>
      <input
        matInput
        (keyup)="applyFilter($event)"
        placeholder="Ex. Mia"
        #input
      />
    </mat-form-field>

    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="dataSource" matSort>
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
          <td mat-cell *matCellDef="let row">{{ row.id }}</td>
        </ng-container>
        <!-- ID Column -->
        <ng-container matColumnDef="firstName">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>FirstName</th>
          <td mat-cell *matCellDef="let row">{{ row.firstName }}</td>
        </ng-container>

        <!-- Progress Column -->
        <ng-container matColumnDef="lastName">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>LastName</th>
          <td mat-cell *matCellDef="let row">{{ row.lastName }}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
          <td mat-cell *matCellDef="let row">{{ row.email }}</td>
        </ng-container>

        <!-- Fruit Column -->
        <ng-container matColumnDef="dateOfBirth">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Date Of Birth</th>
          <td mat-cell *matCellDef="let row">{{ row.dateOfBirth | date }}</td>
        </ng-container>

        <!-- Fruit Column -->
        <ng-container matColumnDef="gender">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Gender</th>
          <td mat-cell *matCellDef="let row">{{ row.gender }}</td>
        </ng-container>

        <ng-container matColumnDef="education">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Education</th>
          <td mat-cell *matCellDef="let row">{{ row.education }}</td>
        </ng-container>

        <ng-container matColumnDef="company">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Company</th>
          <td mat-cell *matCellDef="let row">{{ row.company }}</td>
        </ng-container>

        <ng-container matColumnDef="experience">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Experience</th>
          <td mat-cell *matCellDef="let row">{{ row.experience }}</td>
        </ng-container>

        <ng-container matColumnDef="package">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Package</th>
          <td mat-cell *matCellDef="let row">{{ row.package | currency }}</td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let row">
            <button
              mat-icon-button
              color="primary"
              (click)="openUpdateEmpForm(row)"
            >
              <mat-icon>edit</mat-icon>
            </button>
            <button
              mat-icon-button
              color="warn"
              (click)="deleteEmployee(row.id)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>

        <!-- Row shown when there is no matching data. -->
        <tr class="mat-row" *matNoDataRow>
          <td class="mat-cell" colspan="4">
            No data matching the filter "{{ input.value }}"
          </td>
        </tr>
      </table>

      <mat-paginator
        [pageSizeOptions]="[5, 10, 25, 100]"
        aria-label="Select page of users"
      ></mat-paginator>
    </div>

    <router-outlet />
  `,
  styles: [
    `
      .example-spacer {
        flex: 1 1 auto;
      }
      mat-form-field{
        width:100%;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dateOfBirth',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAllEmployeeList();
  }

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _empService: EmployeeService
  ) {}
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllEmployeeList();
        }
      },
    });
  }

  openUpdateEmpForm(data?: any) {
    this._dialog.open(EmpAddEditComponent , {
      data,
    } );

  }
  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('Employee deleted!');
        this.getAllEmployeeList();
      },
      error: console.log,
    });
  }

  getAllEmployeeList() {
    this._empService.getAllEmployees().subscribe({
      next: (res) => {
        const data = Array.isArray(res) ? res : [];
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
