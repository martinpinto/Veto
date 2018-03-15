import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { QuoteTabsComponent } from './components/home/quote-tabs/quote-tabs.component';

const routes: Routes = [
  { path: '', component: QuoteTabsComponent },
  { path: 'quote/:id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
