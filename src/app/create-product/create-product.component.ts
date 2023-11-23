import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  
  constructor(public dataService: DataService) {}

  get variants(): FormArray {
    return this.dataService.productForm.get('variants') as FormArray;
  }

  addVariant(): void {
    this.dataService.addVariant();
  }

  removeVariant(index: number): void {
    this.dataService.removeVariant(index);
  }

  onSubmit(): void {
    this.dataService.submitProductForm();
  }
}
