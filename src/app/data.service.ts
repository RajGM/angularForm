import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

export interface Product {
  id: string;
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

interface Result {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: string = 'http://localhost:4200/assets/';
  filteredProducts: Product[] = [];
  searchTerm = '';
  currentFilter = 'hot'; // Keep track of the current filter
  showEditForm: boolean = false; // To control the visibility of the edit form
  editProductForm!: FormGroup; // To handle the edit form data

  // Sample product data
  products: Product[] = [
    {
      id: '1asd',
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
      id: '2asd',
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
      id: '3asd',
      image: `${this.baseUrl}p3.jpg`,
      title: 'Product 3',
      releaseDate: new Date('2023-03-15'),
      code: 'P1003',
      numberOfVariants: 4,
      sales: 180,
      stock: {
        itemsInStock: 60,
        variantsInStock: 2,
      },
    },
    {
      id: '4asd',
      image: `${this.baseUrl}p4.jpg`,
      title: 'Product 4',
      releaseDate: new Date('2023-04-10'),
      code: 'P1004',
      numberOfVariants: 2,
      sales: 90,
      stock: {
        itemsInStock: 30,
        variantsInStock: 1,
      },
    },
    {
      id: '5asd',
      image: `${this.baseUrl}p5.jpg`,
      title: 'Product 5',
      releaseDate: new Date('2023-05-20'),
      code: 'P1005',
      numberOfVariants: 3,
      sales: 120,
      stock: {
        itemsInStock: 40,
        variantsInStock: 2,
      },
    },
    {
      id: '6asd',
      image: `${this.baseUrl}p6.jpg`,
      title: 'Product 6',
      releaseDate: new Date('2023-06-05'),
      code: 'P1006',
      numberOfVariants: 6,
      sales: 220,
      stock: {
        itemsInStock: 90,
        variantsInStock: 4,
      },
    },
    {
      id: '7asd',
      image: `${this.baseUrl}default.jpg`,
      title: 'Product 7',
      releaseDate: new Date('2023-07-30'),
      code: 'P1007',
      numberOfVariants: 2,
      sales: 70,
      stock: {
        itemsInStock: 20,
        variantsInStock: 1,
      },
    },
  ];

  productForm: FormGroup = this.fb.group({}); // Form group for product creation

  constructor(private fb: FormBuilder) {
    this.initializeProductForm();
    this.initializeEditProductForm();
  }

  // Initialize the product creation form
  public initializeProductForm(): void {
    this.productForm = this.fb.group({
      image: [''],
      title: ['', Validators.required],
      code: ['', Validators.required],
      variants: this.fb.array([this.createVariant()], Validators.minLength(1)),
    });
  }

  // Initialize the product edit form
  private initializeEditProductForm(): void {
    this.editProductForm = this.fb.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  // Initialize the edit form with a product's data
  initializeEditForm(product: Product): void {
    // Convert Date object to string in YYYY-MM-DD format
    const releaseDate = new Date(product.releaseDate);
    const releaseDateString = releaseDate.toISOString().split('T')[0];

    this.editProductForm = this.fb.group({
      image: [product.image, Validators.required],
      title: [product.title, Validators.required],
      releaseDate: [releaseDateString, Validators.required],
      code: [product.code], // Read-only, no validators
      numberOfVariants: [product.numberOfVariants, Validators.required],
      sales: [product.sales, Validators.required],
      stock: this.fb.group({
        // Nested FormGroup for stock
        itemsInStock: [product.stock.itemsInStock, Validators.required],
        variantsInStock: [product.stock.variantsInStock, Validators.required],
      }),
    });

    this.showEditForm = true;
  }

  // Create a new variant form group
  createVariant(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  // Add a new variant to the product form
  addVariant(): void {
    const variants = this.productForm.get('variants') as FormArray;
    variants.push(this.createVariant());
  }

  // Remove a variant from the product form
  removeVariant(index: number): void {
    const variants = this.productForm.get('variants') as FormArray;
    variants.removeAt(index);
  }

  // Submit the product creation form
  submitProductForm(): Result {
    if (this.productForm.valid) {
      // Safely access the image field value using optional chaining
      const imageField = this.productForm.get('image')?.value;
      const imageUrl = imageField || `${this.baseUrl}default.jpg`;

      // Extract form data
      const newProduct: Product = {
        ...this.productForm.value,
        numberOfVariants: this.productForm.value.variants.length,
        image: imageUrl, // Use the imageUrl determined above
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
      return { success: true, message: 'Product created successfully' };
    } else {
      return { success: false, message: 'Form is not valid' };
      // Handle form validation errors
    }
  }

  // New properties for form handling
  ngOnInit() {
    this.currentFilter = 'hot'; // Set the default filter to 'hot'
    this.applyFilters();
  }

  // Apply search filter
  applySearch(searchTerm: string): void {
    console.log(this.filteredProducts);
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  // Set the current filter type
  setFilter(filterType: string) {
    this.currentFilter = filterType;
    this.applyFilters();
  }

  // Apply filters to the products
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

  // Update a product in the products array
  updateProduct(updatedProduct: Product): void {
    // Find the product in the products array by its id and update it
    const index = this.products.findIndex(
      (p) => p.code === updatedProduct.code
    );
    if (index !== -1) {
      this.products[index] = updatedProduct;
    } else {
    }

    this.applyFilters();
    this.showEditForm = false; // Hide the edit form after updating
  }
}
