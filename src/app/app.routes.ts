import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobSearchComponent } from './pages/job-search/job-search.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'buscar/:title/:location/:jobType/:experience',
    component: JobSearchComponent,
  },
  { path: 'buscar', component: JobSearchComponent },
];
