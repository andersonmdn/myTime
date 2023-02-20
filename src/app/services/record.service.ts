import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private readonly apiUrl = 'https://my-api.com/activities';

  constructor(private http: HttpClient) { }

  addRecord(record: Record): Observable<Record> {
    return this.http.post<Record>(this.apiUrl, record);
  }

  getRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(this.apiUrl);
  }

  updateRecord(record: Record): Observable<Record> {
    const url = `${this.apiUrl}/${record.recordId}`;
    return this.http.put<Record>(url, record);
  }

  deleteRecord(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
