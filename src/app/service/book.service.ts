import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book";
import {environment} from "../../environments/environment";
const API_URL =`${environment.apiURL}`;
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getAllBook(): Observable<Book[]> {
    return this.http.get<Book[]>(API_URL + '/books');
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${API_URL}/books/${id}`)
  }

  createNewBook(book: any): Observable<Book> {
    return this.http.post<Book>(API_URL+'/books', book);
  }

  editBook(book: any, id: number): Observable<Book> {
    return this.http.put<Book>(`${API_URL}/books/${id}`, book);
  }

  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(`${API_URL}/books/${id}`);
  }
}
