import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent, QuotesDialog } from './app.component';
import { QuotesComponent } from './components/home/quotes/quotes.component';
import { QuotesService } from './services/quotes.service';

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
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule
  ],
  entryComponents: [QuotesDialog],
  providers: [QuotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
