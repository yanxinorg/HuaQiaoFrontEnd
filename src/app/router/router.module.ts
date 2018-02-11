import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchDepartmentComponent} from '../search/search-department/search-department.component';
import {SearchDoctorComponent} from '../search/search-doctor/search-doctor.component';
import {SearchResultComponent} from '../search/search-result/search-result.component';

import {ListDepartmentComponent} from '../list/list-department/list-department.component';
import {ListDoctorComponent} from '../list/list-doctor/list-doctor.component';

import {DetailsHospitalComponent} from '../details/details-hospital/details-hospital.component';
import {DetailsDepartmentComponent} from '../details/details-department/details-department.component';
import {DetailsDoctorComponent} from '../details/details-doctor/details-doctor.component';
import {DetailsAppointmentComponent} from '../details/details-appointment/details-appointment.component';

import {AppointmentInitComponent} from '../appointment/appointment-init/appointment-init.component';
import {AppointmentCheckComponent} from '../appointment/appointment-check/appointment-check.component';
import {PageNotFoundComponent} from '../common/page-not-found/page-not-found.component';

const __ROUTES__: Routes = [
    {
        path: 'search',
        children: [
            {
                path: 'department',
                component: SearchDepartmentComponent
            },
            {
                path: 'doctor',
                component: SearchDoctorComponent
            },
            {
                path: 'result/:id/:name',
                component: SearchResultComponent
            }
        ]
    },
    {
        path: 'list',
        children: [
            {
                path: 'department',
                component: ListDepartmentComponent
            },
            {
                path: 'doctor/:sortByDate',
                component: ListDoctorComponent
            }
        ]
    },
    {
        path: 'details',
        children: [
            {
                path: 'hospital',
                component: DetailsHospitalComponent
            },
            {
                path: 'department',
                component: DetailsDepartmentComponent
            },
            {
                path: 'doctor/:id',
                component: DetailsDoctorComponent
            },
            {
                path: 'appointment',
                component: DetailsAppointmentComponent
            }
        ]
    },
    {
        path: 'appointment',
        children: [
            {
                path: 'init/:id',
                component: AppointmentInitComponent
            },
            {
                path: 'check',
                component: AppointmentCheckComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: '/details/hospital',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    // The forRoot() method is called because a configured router is provided at the app's root.
    // The forRoot() method supplies the Router service providers and directives needed for routing.
    // And performs the initial navigation based on the current browser URL.
    imports: [RouterModule.forRoot(
        __ROUTES__,
        {enableTracing: true}   // <-- debugging purposes only
    )],
    declarations: [],
    exports: [RouterModule]
})
export class AppRouterModule {
}
