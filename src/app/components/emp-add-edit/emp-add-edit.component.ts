import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Component({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
    // Add the required providers for datepicker
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'MM/DD/YYYY',
        },
        display: {
          dateInput: 'MM/DD/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
  template: `
    <div class="container">
      <div mat-dialog-title>
        <h4>Employee Form</h4>
      </div>
      <form [formGroup]="empForm" (ngSubmit)="onSubmit()">
        <div mat-dialog-content>
          <!-- <mat-form-field appearance="outline">
        <mat-label>Input</mat-label>
        <input matInput />
        </mat-form-field> -->
          <div class="row">
            <mat-form-field appearance="outline">
              <mat-label>First Name</mat-label>
              <input
                matInput
                type="text"
                placeholder="Enter Your First Name"
                formControlName="firstName"
              />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Last Name</mat-label>
              <input
                matInput
                type="text"
                placeholder="Enter Your Last Name"
                formControlName="lastName"
              />
            </mat-form-field>
          </div>
          <div class="row">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input
                matInput
                type="text"
                placeholder="Enter Your First Name"
                formControlName="email"
              />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Choose a date</mat-label>
              <input
                matInput
                [matDatepicker]="picker"
                formControlName="dateOfBirth"
              />
              <mat-hint>MM/DD/YYYY</mat-hint>
              <mat-datepicker-toggle
                matIconSuffix
                [for]="picker"
              ></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </div>
          <div class="row">
            <mat-radio-group
              aria-label="Select an option"
              formControlName="gender"
            >
              <mat-label><b>Gender</b></mat-label>
              <mat-radio-button value="male">Male</mat-radio-button>
              <mat-radio-button value="male">Female</mat-radio-button>
              <mat-radio-button value="Others">Others</mat-radio-button>
            </mat-radio-group>
          </div>
          <div class="row">
            <mat-form-field appearance="outline">
              <mat-label>Education</mat-label>
              <mat-select formControlName="education">
                @for (item of educationLevels; track item) {
                <mat-option [value]="item.value">{{
                  item.viewValue
                }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Company</mat-label>
              <input
                matInput
                type="text"
                placeholder="Enter Your Company Name"
                formControlName="company"
              />
            </mat-form-field>
          </div>
          <div class="row">
            <mat-form-field appearance="outline">
              <mat-label>Experience</mat-label>
              <input
                matInput
                type="number"
                placeholder="Enter Your experience in years"
                formControlName="experience"
              />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Package</mat-label>
              <input
                matInput
                type="number"
                placeholder="Enter Your Package"
                formControlName="package"
              />
              <mat-hint>In $</mat-hint>
            </mat-form-field>
          </div>
          <div class="row">
            <div class="row2" mat-dialog-actions>
              <button mat-raised-button color="warn" (click)="closeAddEditEmpForm()" >Cancel</button>
              <button mat-raised-button color="primary" type="submit">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: `

  .row{
    display: flex;
    flex-direction: row;
    gap: 10px;
    input{
      width: 100%;
    }
  }
  .row2{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    gap:54px;
    padding: 0px 0px;
    button{
      flex: 1;
    }
  }
  .container{
    padding: 20px;
  }
  h4{
    margin: 0;
    padding: 0;
  }

  `,
})
export class EmpAddEditComponent {
  empForm: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly _empService: EmployeeService,
    private readonly _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private readonly _dialog: MatDialog
  ) {
    this.empForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      package: ['', [Validators.required, Validators.min(0)]],
    });
  }
  educationLevels: { value: string; viewValue: string }[] = [
    { value: 'highschool', viewValue: 'High School' },
    { value: 'bachelor', viewValue: "Bachelor's Degree" },
    { value: 'master', viewValue: "Master's Degree" },
    { value: 'phd', viewValue: 'PhD' },
  ];

  onSubmit() {
    if (this.empForm.valid) {
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          this._dialog.open(AlertComponent);
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error('Error adding employee', err);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
  closeAddEditEmpForm() {
    this._dialogRef.close();
  }
}
