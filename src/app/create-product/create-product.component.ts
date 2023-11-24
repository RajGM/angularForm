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
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  private storage: any; // Declare storage here

  constructor(public dataService: DataService) {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    this.storage = getStorage(app); // Initialize storage
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0]; // Set the selected file

      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreview = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

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

  async uploadImage(file: File): Promise<string> {
    try {
      const storageRef = ref(this.storage, `images/${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      console.log('Upload Result:', uploadResult); // Log the upload result

      const imageUrl = await getDownloadURL(storageRef);
      console.log('Image URL:', imageUrl); // Log the image URL
      return imageUrl;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      throw error; // Rethrow the error to be caught in the caller
    }
  }

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
    console.log('Selected File:', this.selectedFile);

    if (this.selectedFile) {
      console.log('Uploading image...');
      this.uploadImage(this.selectedFile)
        .then((imageUrl) => {
          this.dataService.productForm.patchValue({ image: imageUrl });
          console.log('ImageURL:', imageUrl);
          this.dataService.submitProductForm(); // Then submit the form
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          // Handle the error appropriately
        });
    } else {
      this.dataService.submitProductForm(); // Submit the form without an image
    }
  }
}
