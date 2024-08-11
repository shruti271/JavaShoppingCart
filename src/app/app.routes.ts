import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { APIComponent } from './components/api/api.component';
import { ContactComponent } from './components/contact/contact.component'

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'API',
        component: APIComponent,
    },
    {
        path: 'Contact',
        component: ContactComponent,
    },
];
