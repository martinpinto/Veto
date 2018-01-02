import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { QuoteCardComponent } from './components/home/quote-card/quote-card.component';
import { QuoteDialog } from './components/home/quote-dialog/quote-dialog.component';
import { LoginDialog } from './components/login/login-dialog.component';
import { QuotesService } from './services/quotes/quotes.service';
import { AuthService } from './services/authentication/auth.service';
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
  MatInputModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    QuoteCardComponent,
    QuoteDialog,
    LoginDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [QuoteDialog, LoginDialog],
  providers: [
    QuotesService, 
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
