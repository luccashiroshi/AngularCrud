import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';
import '../../../../src/styles.css'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURl = 'http://localhost:3001/products'

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['error'] : ['succes']
    })
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseURl, product).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    )
  }

  errorHandler(e:any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURl).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    )
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseURl}/${id}`
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    )
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseURl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseURl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    )
  }

}
