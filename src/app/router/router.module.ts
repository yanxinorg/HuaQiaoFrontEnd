import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchInitComponent} from '../search-init/search-init.component';
import {SearchDepartmentComponent} from '../search-department/search-department.component';
import {SearchDoctorComponent} from '../search-doctor/search-doctor.component';
import {SearchResultComponent} from '../search-result/search-result.component';

import {ListDepartmentComponent} from '../list-department/list-department.component';
import {ListDoctorComponent} from '../list-doctor/list-doctor.component';

import {DetailsHospitalComponent} from '../details-hospital/details-hospital.component';
import {DetailsDepartmentComponent} from '../details-department/details-department.component';
import {DetailsDoctorComponent} from '../details-doctor/details-doctor.component';
import {DetailsAppointmentComponent} from '../details-appointment/details-appointment.component';

import {AppointmentInitComponent} from '../appointment-init/appointment-init.component';
import {AppointmentCheckComponent} from '../appointment-check/appointment-check.component';

const __ROUTES__: Routes = [
    {
        path: 'search',
        children: [
            {
                path: 'init',
                component: SearchInitComponent
            },
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
    }
];

@NgModule({
    // The forRoot() method is called because a configured router is provided at the app's root.
    // The forRoot() method supplies the Router service providers and directives needed for routing, and performs the initial navigation based on the current browser URL.
    imports: [RouterModule.forRoot(__ROUTES__)],
    declarations: [],
    exports: [RouterModule]
})
export class AppRouterModule {
}
