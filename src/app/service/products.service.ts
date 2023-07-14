import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Product } from '../model/products';

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private http: HttpClient) {}

  // create product from database
  createProduct(products: { pName: string, desc: string, price: string }) {
    console.log(products);
    const headers = new HttpHeaders({ 'myHeader': 'project' });
    this.http.post<{ name: string }>('https://angularproject-1352c-default-rtdb.firebaseio.com/products.json', products, { headers: headers })
      .subscribe((res) => {
        console.log(res);
      });
  }

  // fetch Product database
  fetchProduct() {
    return this.http.get<{ [key: string]: Product }>('https://angularproject-1352c-default-rtdb.firebaseio.com/products.json')
      .pipe(map((res) => {
        const products = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            products.push({ ...res[key], id: key });
          }
        }
        return products;
      }));
  }

  // delete product
  deleteProduct(id:string){
    this.http.delete(`https://angularproject-1352c-default-rtdb.firebaseio.com/products/${id}.json`)
      .subscribe();
  }

  // delete all product
  deleteAllProduct(){
    this.http.delete(`https://angularproject-1352c-default-rtdb.firebaseio.com/products/.json`)
      .subscribe();
  }

  updateProduct(id : string , value : Product){
    this.http.put(`https://angularproject-1352c-default-rtdb.firebaseio.com/products/${id}.json`, value)
      .subscribe();
  }
}

