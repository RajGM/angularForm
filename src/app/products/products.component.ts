import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DataService } from '../data.service';

interface Product {
  image: string;
  title: string;
  releaseDate: Date;
  code: string;
  numberOfVariants: number;
  sales: number;
  stock: {
    itemsInStock: number;
    variantsInStock: number;
  };
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ScrollingModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  
  constructor(public dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.currentFilter = 'hot'; // Set the default filter to 'hot'
    this.dataService.applyFilters();
  }

}
