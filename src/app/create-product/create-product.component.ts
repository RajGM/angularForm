import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from '../data.service';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../../environment/environment';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  // Component properties
  imagePreview: string | ArrayBuffer | null = null; // Stores the preview of the uploaded image
  selectedFile: File | null = null; // Stores the selected file for upload
  private storage: any; // Firebase storage reference
  isLoading: boolean = false; // Flag to indicate loading state
  errorMessage: string | null = null; // Error message string
  successMessage: string | null = null; // Success message string

  // Constructor
  constructor(public dataService: DataService) {
    const app = initializeApp(firebaseConfig); // Initialize Firebase app
    this.storage = getStorage(app); // Initialize Firebase storage
  }

  // Method to handle image selection
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0]; // Set the selected file

      // FileReader to read the file and set it to imagePreview
      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreview = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Method to remove the selected image

  removeImage(): void {
    this.imagePreview = null; // Reset the image preview

    // If you also want to reset the file input
    const fileInput = document.getElementById(
      'imageUpload'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // Async method to upload the image to Firebase storage
  async uploadImage(file: File): Promise<string> {
    try {
      const storageRef = ref(this.storage, `images/${file.name}`); // Create a storage reference
      const uploadResult = await uploadBytes(storageRef, file); // Upload the file
      
      const imageUrl = await getDownloadURL(storageRef); // Get the download URL
      return imageUrl; // Return the image URL
    } catch (error) {
      throw error;
    }
  }

  // Getter for the variants FormArray from the DataService
  get variants(): FormArray {
    return this.dataService.productForm.get('variants') as FormArray;
  }

  // Method to add a variant to the form
  addVariant(): void {
    this.dataService.addVariant();
  }

  // Method to remove a variant from the form
  removeVariant(index: number): void {
    this.dataService.removeVariant(index);
  }

  // Method to handle form submission
  onSubmit(): void {
    this.isLoading = false;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.selectedFile) {
      this.isLoading = true; // Show loading message
      this.uploadImage(this.selectedFile)
        .then((imageUrl) => {
          this.dataService.productForm.patchValue({ image: imageUrl });
          console.log('ImageURL:', imageUrl);
          const result = this.dataService.submitProductForm(); // Submit the form and get the result

          if (result.success) {
            this.successMessage = 'Product created successfully'; // Show success message
            this.removeImage();
          } else {
            this.errorMessage = 'Failed to create product'; // Show error message
          }

          // Clear messages after 2 seconds
          setTimeout(() => {
            this.successMessage = null;
            this.errorMessage = null;
          }, 2000);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          this.errorMessage = 'Failed to upload image'; // Show error message

          // Clear error message after 2 seconds
          setTimeout(() => {
            this.errorMessage = null;
          }, 2000);
        })
        .finally(() => {
          this.isLoading = false; // Hide loading message
        });
    } else {
      const result = this.dataService.submitProductForm(); // Submit the form and get the result

      if (result.success) {
        this.successMessage = 'Product created successfully'; // Show success message
      } else {
        this.errorMessage = 'Failed to create product'; // Show error message
      }

      // Clear messages after 2 seconds
      setTimeout(() => {
        this.successMessage = null;
        this.errorMessage = null;
      }, 2000);
    }
  }
}
