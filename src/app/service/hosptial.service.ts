import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators';

import {Department} from './department';
import {UrlService} from './url.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class HospitalService {

    constructor(private http: HttpClient) {
    }

    fetchDepartmentList(): Observable<Department[]> {
        return this.http
            .get<Department[]>(UrlService.FetchTableList('department'))
            .pipe(
                catchError(this.handleError('fetchDepartmentList', []))
            );
    }

    searchDepartments(term: string): Observable<Department[]> {
        if (!term.trim()) {
            return of([]);
        }

        return this.http
            .get<Department[]>(UrlService.searchTable('department', 'name', term.trim()))
            .pipe(
                catchError(this.handleError('searchDepartments', []))
            );
    }

    queryRelativeDoctors(departmentId: number): Observable<any> {
        return this.http
            .get<any>(UrlService.QueryRelativeDoctors('doctor', departmentId))
            .pipe(
                catchError(this.handleError('queryRelativeDoctors', []))
            );
    }

    queryRelativeSchedules(doctorId: number): Observable<any> {
        return this.http
            .get<any>(UrlService.QueryRelativeDoctors('schedule', doctorId))
            .pipe(
                catchError(this.handleError('queryRelativeDoctors', []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            // this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
