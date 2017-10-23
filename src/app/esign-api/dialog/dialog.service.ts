import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DialogComponent } from './dialog.component';

import 'rxjs/add/operator/map';

@Injectable()
export class DialogService {

    constructor(private http: Http) { }

    private apiUrl = 'http://localhost:3000/challenges'; 
  getChallenges(id) : Observable<Comment[]> {
    
             return this.http.get(this.apiUrl+"/"+id)
                             .map((res:Response) => res.json())
                             .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
         }
}