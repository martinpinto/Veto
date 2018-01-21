import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { QuoteCardComponent } from './components/home/quote-card/quote-card.component';
import { QuoteAddDialog } from './components/home/quote-add-dialog/quote-add-dialog.component';
import { LoginDialog } from './components/login/login-dialog.component';
import { QuotesService } from './services/quotes/quotes.service';
import { AuthService } from './services/authentication/auth.service';
import { TopicShowcaseComponent } from './components/home/topic-showcase/topic-showcase.component';
import { TopicsService } from './services/topics/topics.service';

import { UserSelectComponent } from './components/generic/user-select/user-select.component';

import { Http, RequestOptions, HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

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
  MatAutocompleteModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    QuoteCardComponent,
    QuoteAddDialog,
    LoginDialog,
    TopicShowcaseComponent,
    DetailsComponent,
    UserSelectComponent
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
    MatAutocompleteModule
  ],
  entryComponents: [QuoteAddDialog, LoginDialog],
  providers: [
    QuotesService,
    TopicsService,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
