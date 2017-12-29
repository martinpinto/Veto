import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { QuoteCardComponent } from './components/home/quote-card/quote-card.component';
import { QuoteDialog } from './components/home/quote-dialog/quote-dialog.component';
import { LoginDialog } from './components/login/login-dialog.component';
import { QuotesService } from './services/quotes.service';

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
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [QuoteDialog, LoginDialog],
  providers: [QuotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
