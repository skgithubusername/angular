import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
// import { map } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { Product } from './model/products';
import { ProductService } from './service/products.service';
import { NgForm } from '@angular/forms';
import {  ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-tour-of-heroes';
  allProducts: Product[] = [];
  editMode :boolean = false;
  @ViewChild('productsForm') form : NgForm;
  currentProductId : string;

  productsForm: { pName: string, desc: string, price: string } = {
    pName: '',
    desc: '',
    price: ''
  };

  constructor(private http: HttpClient, private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  onProductsFetch() {
    this.fetchProducts();
  }

  onProductCreate(products: { pName: string, desc: string, price: string }) {
    if(!this.editMode)
    this.productService.createProduct(products);
else
 this.productService.updateProduct(this.currentProductId, products);
  }

  private fetchProducts() {
    this.productService.fetchProduct().subscribe((products) => {
      this.allProducts = products;
    });
  }
onDeleteProduct(id : string){
 this.productService.deleteProduct(id);
}

onDeleteAllProduct(){
  this.productService.deleteAllProduct();
}

// edit
onEditClicked(id : string){
this.currentProductId = id;
  // get the product based on the id
let currentProduct = this.allProducts.find((p)=>{return p.id == id})
console.log(currentProduct);
// populate the form with the product details
this.form.setValue({
  pName : currentProduct.pName,
  desc:currentProduct.desc,
  price : currentProduct.price
});
// change the button value to update
this.editMode = true;
 }

}
