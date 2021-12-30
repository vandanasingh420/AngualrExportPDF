import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrlPostAllData: string = "http://localhost:3000";

  // private baseUrlGetDropDownDate: string = "http://localhost:8080/api/v1/";
  projectDetails : any;
  constructor(private http: HttpClient) { }


  public getData(): Observable<any> {
      return this.http.get(this.baseUrlPostAllData + '/projectData');
    }
    public postData(data: any): Observable<any> {
      // console.log(data);
      return this.http.post(this.baseUrlPostAllData + '/projectData', data);
    }
    public updateData(id:any, param:any ): Observable<any> {
      return this.http.put(this.baseUrlPostAllData + '/projectData/' + id, param);
  }
  public deleteData(id:any ): Observable<any> {
    return this.http.delete(this.baseUrlPostAllData + '/projectData/' + id);
}
}