import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  product = {
    title: '',
    price: '',
    discount: '',
  };

  products: any[] = [];
  filtered: any[] = [];
  total: number = 0;
  searchTerm: string = '';
  mode: 'create' | 'update' = 'create';
  updateIndex: number | null = null;

  errors = {
    title: false,
    price: false,
  };

  constructor() {
    const stored = localStorage.getItem('product');
    if (stored) {
      this.products = JSON.parse(stored);
      this.filtered = [...this.products];
    }
  }

  calcTotal() {
    const price = parseFloat(this.product.price) || 0;
    const discount = parseFloat(this.product.discount) || 0;
    this.total = price - discount;
  }

  validate(): boolean {
    this.errors.title = !this.product.title;
    this.errors.price = !(this.product.price && +this.product.price > 0);
    return !this.errors.title && !this.errors.price;
  }

  submit() {
    if (!this.validate()) return;

    const newProduct = {
      title: this.product.title.toLowerCase(),
      price: this.product.price,
      discount: this.product.discount,
      total: this.total.toFixed(2),
    };

    if (this.mode === 'create') {
      this.products.push(newProduct);
    } else if (this.updateIndex !== null) {
      this.products[this.updateIndex] = newProduct;
      this.mode = 'create';
      this.updateIndex = null;
    }

    this.save();
    this.clear();
    this.search();
  }

  clear() {
    this.product = {
      title: '',
      price: '',
      discount: '',
    };
    this.total = 0;
  }

  delete(index: number) {
    this.products.splice(index, 1);
    this.save();
    this.search();
  }

  deleteAll() {
    if (confirm('Are you sure you want to delete all products?')) {
      this.products = [];
      this.save();
      this.search();
    }
  }

  edit(index: number) {
    const p = this.products[index];
    this.product = {
      title: p.title,
      price: p.price,
      discount: p.discount,
    };
    this.total = parseFloat(p.total);
    this.mode = 'update';
    this.updateIndex = index;
  }

  search() {
    const term = this.searchTerm.toLowerCase();
    this.filtered = this.products.filter((p) => p.title.includes(term));
  }

  save() {
    localStorage.setItem('product', JSON.stringify(this.products));
  }
}
