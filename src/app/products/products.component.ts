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
import { Product } from '../data.service';
import { Router } from '@angular/router';

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
  // Constructor with Dependency Injection
  constructor(public dataService: DataService, private router: Router) {}

  // Lifecycle hook for initialization
  ngOnInit() {
    this.dataService.currentFilter = 'hot'; // Set the default filter to 'hot'
    this.dataService.applyFilters();
  }

  // Function to navigate to the product creation page
  openCreateProductModal() {
    this.router.navigate(['/create-product']);
  }

  // Function to open the edit form with the selected product
  openEditForm(product: Product): void {
    this.dataService.initializeEditForm(product);
  }

  // Function to close the edit form
  closeEditForm(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.dataService.showEditForm = false;
    }
  }

  // Function to stop event propagation
  stopPropagation(event: MouseEvent): void {
    // Prevent the click from propagating to the overlay
    event.stopPropagation();
  }

  // Function to submit the edit form
  submitEditForm(): void {
    if (this.dataService.editProductForm.valid) {
      // Process the edited data
      const updatedProduct = this.dataService.editProductForm.value;
      this.dataService.updateProduct(updatedProduct);
      // Hide the edit form
      this.dataService.showEditForm = false;
    }
  }
}
