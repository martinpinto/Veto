import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent, QuotesDialog } from './app.component';
import { QuotesComponent } from './home/quotes/quotes.component';

import { MatButtonModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    QuotesDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule
  ],
  entryComponents: [QuotesDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
