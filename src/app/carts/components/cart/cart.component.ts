import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/carts/services/carts.service';
import { NotificationService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts: any[]=[];
  total: number = 0;
  success: boolean = false;

  constructor(private update: CartsService,
              private toastr :NotificationService) {}

  ngOnInit(): void {
    this.cartProducts= this.update.getCartProducts();
    this.getCartTotal();

  }

  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.updateCart();
  }

  minsAmount(index: number) {
    if (this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity--;
      this.updateCart();
    }
  }

  detectChange() {
    this.updateCart();
    this.update.updateItemCount()
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.updateCart();
    this.update.updateItemCount()
    this.toastr.showSuccess("Delete product is success ", "Success")
  }

  clearCart() {
    this.cartProducts = [];
    this.update.renoveall()
    this.updateCart();
    this.toastr.showSuccess("Delete all product is success ", "Success")
  }

  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }
  addCart() {
    let products = this.cartProducts.map(item => {
      return { productId: item.item.id, quantity: item.quantity };
    });
    
    if (products.length === 0) {
      this.toastr.showError("No products found", "error")
      // Display the success message
    } else {
      this.success = true;
    }
  }

  private updateCart() {
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }
}
