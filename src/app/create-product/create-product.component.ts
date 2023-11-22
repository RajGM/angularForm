import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
      variants: this.fb.array([this.createVariant()], Validators.minLength(1)),
    });
  }

  createVariant(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  addVariant(): void {
    this.variants().push(this.createVariant());
  }

  removeVariant(index: number): void {
    this.variants().removeAt(index);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      // Process form data here
      // Add the new product to the products array
    } else {
      // Handle form validation errors
    }
  }
}
