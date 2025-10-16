import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule,  } from '@angular/material/button';
import { EmployeeService } from './employee.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { MatIcon } from "@angular/material/icon";
import { LoginComponentComponent } from './login-component/login-component.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    RegisterComponentComponent,
    LoginComponentComponent,
  ], 
  imports: [
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    AppRoutingModule,
    MatIcon
],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }