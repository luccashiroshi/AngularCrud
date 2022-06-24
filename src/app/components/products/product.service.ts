import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable } from 'rxjs';
import '../../../../src/styles.css'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURl = 'http://localhost:3001/products'

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: 'succes'
    })
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseURl, product)
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURl)
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseURl}/${id}`
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseURl}/${product.id}`
    return this.http.put<Product>(url, product)
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseURl}/${id}`
    return this.http.delete<Product>(url)
  }

}
