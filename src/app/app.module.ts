import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { LocationTabComponent } from './admin/location-tab/location-tab.component';
import { CandidateTabComponent } from './admin/candidate-tab/candidate-tab.component';
import { UserTabComponent } from './admin/user-tab/user-tab.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AdminServiceService } from './services/adminService/admin-service.service';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TokenInterceptor } from './helpers/interceptor/TokenInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AlertMessage } from './utils/snackbar/snackbar';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './utils/dialog/dialog.component';
import { ResultsTabComponent } from './admin/results-tab/results-tab.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    LocationTabComponent,
    CandidateTabComponent,
    UserTabComponent,
    UserComponent,
    NavbarComponent,
    DialogComponent,
    ResultsTabComponent
  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [AdminServiceService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  },
  AlertMessage
],
  bootstrap: [AppComponent]
})
export class AppModule { }
