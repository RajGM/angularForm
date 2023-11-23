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
  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentFilter = 'hot'; // Set the default filter to 'hot'
    this.dataService.applyFilters();
  }

  openEditForm(product: Product): void {
    console.log('EDIT FORM');
    this.dataService.initializeEditForm(product);
  }

  // In your component.ts file
  closeEditForm(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.dataService.showEditForm = false;
    }
  }
  
  stopPropagation(event: MouseEvent): void {
    // Prevent the click from propagating to the overlay
    event.stopPropagation();
  }

  submitEditForm(): void {
    console.log(this.dataService.editProductForm.value)
    if (this.dataService.editProductForm.valid) {
      // Process the edited data
      const updatedProduct = this.dataService.editProductForm.value;
      this.dataService.updateProduct(updatedProduct);
      // Hide the edit form
      this.dataService.showEditForm = false;
    }
  }
}
