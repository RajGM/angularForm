import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

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

@Injectable({
  providedIn: 'root'
})

export class DataService {

  baseUrl: string = 'http://localhost:4200/assets/';
  filteredProducts: Product[] = [];
  searchTerm = '';
  currentFilter = 'hot'; // Keep track of the current filter
  showEditForm: boolean = false; // To control the visibility of the edit form
  editProductForm!: FormGroup; // To handle the edit form data


  products: Product[] = [
    {
      image: `${this.baseUrl}p1.jpg`,
      title: 'Product 1',
      releaseDate: new Date('2023-01-01'),
      code: 'P1001',
      numberOfVariants: 3,
      sales: 150,
      stock: {
        itemsInStock: 50,
        variantsInStock: 2,
      },
    },
    {
      image: `${this.baseUrl}p2.jpg`,
      title: 'Product 2',
      releaseDate: new Date('2023-02-15'),
      code: 'P1002',
      numberOfVariants: 5,
      sales: 200,
      stock: {
        itemsInStock: 75,
        variantsInStock: 3,
      },
    },
    {
      image: `${this.baseUrl}p1.jpg`,
      title: 'Product 1',
      releaseDate: new Date('2023-01-01'),
      code: 'P1001',
      numberOfVariants: 3,
      sales: 150,
      stock: {
        itemsInStock: 50,
        variantsInStock: 2,
      },
    },
    {
      image: `${this.baseUrl}p2.jpg`,
      title: 'Product 2',
      releaseDate: new Date('2023-02-15'),
      code: 'P1002',
      numberOfVariants: 5,
      sales: 200,
      stock: {
        itemsInStock: 75,
        variantsInStock: 3,
      },
    },
  ];

  productForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {
    this.initializeProductForm();
    this.initializeEditProductForm();
   }

   public initializeProductForm(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
      variants: this.fb.array([this.createVariant()], Validators.minLength(1)),
    });
  }

  private initializeEditProductForm(): void {
    this.editProductForm = this.fb.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
      // Add other fields as needed
    });
  }

  initializeEditForm(product: Product): void {
    this.editProductForm.setValue({
      title: product.title,
      code: product.code,
      // Set other fields as needed
    });
  
    this.showEditForm = true; // Show the edit form
  }

  createVariant(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  addVariant(): void {
    const variants = this.productForm.get('variants') as FormArray;
    variants.push(this.createVariant());
  }

  removeVariant(index: number): void {
    const variants = this.productForm.get('variants') as FormArray;
    variants.removeAt(index);
  }

  submitProductForm(): void {
    if (this.productForm.valid) {
      console.log("Form Data:", this.productForm.value);
  
      // Extract form data
      const newProduct: Product = {
        ...this.productForm.value,
        // Assuming you have an image field or you can set a default image
        image: `${this.baseUrl}default.jpg`,
        // Add other necessary fields or default values
        releaseDate: new Date(), // Example, set the current date as release date
        sales: 0, // Assuming initial sales are 0
        stock: {
          itemsInStock: 0, // Example default value
          variantsInStock: this.productForm.value.variants.length,
        },
      };
  
      // Add the new product to the products array
      this.products.push(newProduct);
  
      // Optionally, you might want to reset the form here
      this.productForm.reset();
  
    } else {
      console.log("Form is not valid");
      // Handle form validation errors
    }
  }
  
  // New properties for form handling
  
  ngOnInit() {
    this.currentFilter = 'hot'; // Set the default filter to 'hot'
    this.applyFilters();
  }

  applySearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  setFilter(filterType: string) {
    this.currentFilter = filterType;
    this.applyFilters();
  }

  applyFilters() {
    let tempProducts = [...this.products];

    // Apply filter based on filter type
    switch (this.currentFilter) {
      case 'hot':
        tempProducts = tempProducts.sort((a, b) => b.sales - a.sales);
        break;
      case 'upcoming':
        tempProducts = tempProducts.sort(
          (a, b) =>
            new Date(a.releaseDate).getTime() -
            new Date(b.releaseDate).getTime()
        );
        break;
      // No need for 'default' as tempProducts is already a copy of all products
    }

    // Apply search term
    if (this.searchTerm) {
      tempProducts = tempProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.code.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredProducts = [...tempProducts];
  }

  updateProduct(updatedProduct: Product): void {
    // Find the product in the products array and update it
    const index = this.products.findIndex(p => p.code === updatedProduct.code);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  
    this.showEditForm = false; // Hide the edit form after updating
  }

  
}
