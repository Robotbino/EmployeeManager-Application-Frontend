import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-home-component',
  imports: [ FormsModule, CommonModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

  public employees!: Employee[];
  public editEmployee?: Employee;
  public deleteEmployee?: Employee;

  constructor(private employeeService: EmployeeService){}


  ngOnInit(): void {
      this.getEmployees();
  }
  
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response:Employee[])=>{
        this.employees = response;
        console.log(`Employees`,response)
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onAddEmployee(addForm: NgForm): void {
   document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void {
    console.log("We do trigger the method");
    this.employeeService.updateEmployees(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployees(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employee | null,mode: string){
    const container = document.getElementById("main-container");
    const togglerButton = document.createElement('button');
    console.log("This thing did trigger")
    //if we do not specify that this section needs to be button it makes it a submit
    togglerButton.type = 'button';
    //We can chain css properties like so
    togglerButton.style.display = 'none';
    togglerButton.setAttribute('data-toggle','modal')
    if(mode === 'add'){
      togglerButton.setAttribute('data-target','#addEmployeeModal')
    }
    if(mode === 'delete'){
       this.deleteEmployee = employee!;
      togglerButton.setAttribute('data-target','#deleteEmployeeModal')
    }
    if(mode === 'update'){
      this.editEmployee = employee!;
      togglerButton.setAttribute('data-target','#updateEmployeeModal')
    }
    container?.appendChild(togglerButton);
    console.log(togglerButton)
    togglerButton.click();
  }

}
