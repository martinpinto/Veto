import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { QuoteCardComponent } from './components/home/quote-card/quote-card.component';

const routes: Routes = [
  { path: '', component: QuoteCardComponent },
  { path: 'quote/:id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
