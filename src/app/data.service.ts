import { Injectable } from '@angular/core';

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

  ngOnInit() {
    this.currentFilter = 'hot'; // Set the default filter to 'hot'
    this.applyFilters();
  }

  setFilter(filterType: string) {
    this.currentFilter = filterType;
    console.log("Current Filter:", this.currentFilter); // Add this line
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

  constructor() { }
}
