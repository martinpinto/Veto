import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { QuoteCardComponent, QuoteCardDialog } from './components/home/quote-card/quote-card.component';
import { QuoteAddDialog } from './components/home/quote-add-dialog/quote-add-dialog.component';
import { LoginDialog } from './components/login/login-dialog.component';
import { QuotesService } from './services/quotes/quotes.service';
import { AuthService } from './services/authentication/auth.service';
import { TopicShowcaseComponent } from './components/home/topic-showcase/topic-showcase.component';
import { TopicsService } from './services/topics/topics.service';

import { UserSelectComponent } from './components/generic/user-select/user-select.component';

import { Http, RequestOptions, HttpModule } from '@angular/http';

import { 
  MatButtonModule, 
  MatCheckboxModule, 
  MatDialogModule, 
  MatDialogContent, 
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressBarModule,
  MatChipsModule,
  MatSelectModule,
  MatStepperModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './components/details/details.component';
import { QuoteTabsComponent } from './components/home/quote-tabs/quote-tabs.component';
import { AlertService } from './services/alert/alert.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    QuoteCardComponent,
    QuoteCardDialog,
    QuoteAddDialog,
    LoginDialog,
    TopicShowcaseComponent,
    DetailsComponent,
    UserSelectComponent,
    QuoteTabsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatSelectModule,
    MatStepperModule,
    MatTabsModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  entryComponents: [QuoteAddDialog, QuoteCardDialog, LoginDialog],
  providers: [
    QuotesService,
    TopicsService,
    AuthService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
