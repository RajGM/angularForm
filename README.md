# Fliproom AngularForm Project

The AngularForm project is an Angular-based web application designed for showcasing and managing a catalog of products. It provides a user-friendly interface for displaying, editing, and adding new products. The project is divided into two primary sections: the Products Page, which lists all products and allows for editing, and the Create Product Page, where users can add new products.

## Key Features

- **Products Page**: Display and edit a list of all public products.
- **Create Product Page**: Add new products with details like title, product code, variants, and image.
- **Image Storage**: Product images are uploaded and stored in Google Cloud Storage.

# Getting Started

## Prerequisites

Before running the project, ensure you have the following installed:
- Node.js
- Angular CLI

## Steps to Clone and Run Locally

1. **Clone the Repository**
```bash
   git clone https://github.com/RajGM/angularForm.git
   cd angularForm
```

2. **Install Dependencies**
```bash 
npm install
```

3. **Run the application**
```bash 
ng serve
```

4. **Access the Application** Navigate to [LocalHost:4200](http://localhost:4200)

## Test the Hosted Version

Experience the live version of the AngularForm project by visiting the following link:

### 🌐 [AngularForm Live Demo](https://angular-form-rajgm.vercel.app/)

## Features

## Products Page

### Overview

The Product page of the AngularForm project is designed to provide a comprehensive and interactive experience for managing and viewing a catalog of public products. This document outlines the technical aspects and functionalities of the Product page.


  ```typescript
  interface Product {
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
```
## HTML Template (`products.component.html`)

### Structure

- **Products Container**: Wraps the entire product display and interaction elements.
- **Search Bar**: Allows users to input search queries.
- **Filter Buttons**: Two buttons to filter products by 'Hot Products' and 'Upcoming Releases'.
- **Product List**: Implemented using Angular CDK's virtual scrolling for performance optimization.
- **Product Card**: Displays individual product details and an edit button.
- **Edit Form Modal**: A modal overlay for editing product details.
- **Create Product Button**: Navigates to the product creation page.

### Key Elements

- **Search and Reset**: Input field for search and buttons for search and reset functionalities.
- **Virtual Scroll Viewport**: Contains the product cards and uses virtual scrolling.
- **Product Details**: Each product card shows the product's image, title, release date, code, number of variants, sales, and stock details.
- **Edit Icon**: Triggers the edit form for the selected product.

## TypeScript Component (`products.component.ts`)

### Imports and Decorator

- **Imports**: Includes necessary Angular modules, form controls, and services.
- **Component Decorator**: Defines the selector, standalone status, imports, template, and style URLs.

### Class Definition

- **Constructor**: Injects `DataService` and `Router` for data handling and navigation.
- **ngOnInit**: Initializes the default filter and applies it.
- **openCreateProductModal**: Navigates to the product creation page.
- **openEditForm**: Initializes the edit form with the selected product's data.
- **closeEditForm**: Closes the edit form modal.
- **stopPropagation**: Prevents click events from propagating in the edit form.
- **submitEditForm**: Submits the edited product data and updates the product list.

## Usage and Functionality

- **Viewing Products**: Users can view a list of products with detailed information.
- **Searching**: The search functionality filters products based on user input.
- **Filtering**: Users can filter products based on sales or upcoming releases.
- **Editing Products**: Clicking the edit icon on a product card opens a modal form for editing product details.
- **Creating Products**: The 'Create Product' button navigates to a separate page for adding new products.

## Create Product

### Overview

The `CreateProductComponent` in the AngularForm project allows users to create new products with mandatory fields like title, code, and at least one variant. It includes additional functionalities like image upload and variant management.

## HTML Template (`create-product.component.html`)

### Structure

- **Form**: Wraps all input fields and buttons for product creation.
- **Image Upload**: Allows users to upload an image for the new product.
- **Title and Code Input**: Text inputs for product title and code.
- **Variants Management**: Dynamic form array to add, remove, and manage product variants.
- **Submission Button**: Submits the form to create the product.
- **Feedback Messages**: Displays loading, error, and success messages.

### Key Elements

- **Image Upload Section**: Includes an input for file selection and a preview of the selected image.
- **Title and Code Fields**: Mandatory fields for product details.
- **Variant Array**: Allows dynamic addition and removal of product variants.
- **Create Product Button**: Submits the form data to create a new product.

## TypeScript Component (`create-product.component.ts`)

### Imports and Decorator

- **Imports**: Necessary Angular modules, form controls, Firebase services, and custom services.
- **Component Decorator**: Defines the selector, standalone status, imports, template, and style URLs.

### Class Definition

- **Properties**: Includes image preview, file selection, loading state, and message variables.
- **Constructor**: Initializes Firebase services and storage.
- **Image Handling Methods**: Functions to handle image selection, preview, and removal.
- **Image Upload Method**: Uploads the selected image to Firebase storage and retrieves the URL.
- **Variants Getter**: Returns the form array of variants.
- **Variant Management Methods**: Functions to add and remove variants dynamically.
- **Form Submission**: Handles the form submission, image upload, and displays appropriate messages.

## Functionality

- **Creating a Product**: Users can create a product by filling in the title, code, and adding variants.
- **Image Upload**: Optional feature to upload an image for the product.
- **Variant Management**: Users can add multiple variants, specify names, reorder, and remove them during the creation process.
- **Form Validation**: Ensures mandatory fields are filled before submission.
- **Feedback Mechanism**: Displays messages based on the action's success or failure.




## Data.Service.ts 

### Overview
`DataService` is an Angular service responsible for managing product data and forms. It includes functionalities for creating, editing, filtering, and searching products.

## Dependencies
- `@angular/core`
- `@angular/forms`

## Conclusion

The `fliproom` project is a comprehensive Angular-based application, equipped with a robust set of Angular modules and enhanced by styling frameworks like Tailwind CSS and DaisyUI. A significant feature of this project is its integration with Firebase, particularly leveraging Firebase's cloud storage capabilities for handling image uploads. This integration not only provides a scalable and secure solution for storing media but also enhances the application's overall functionality.

In addition to the frontend technologies, the project's development dependencies indicate a strong emphasis on testing and quality assurance, utilizing Jasmine and Karma for thorough testing routines. TypeScript's inclusion underscores the project's commitment to type-safe coding, ensuring a more robust and error-resistant codebase.

Overall, `fliproom` represents a well-rounded web application, balancing front-end interactivity and aesthetics with backend reliability and storage efficiency, making it suitable for modern web application standards.

## Future Improvements

As the `fliproomnew` project continues to evolve, several enhancements can be considered to augment its functionality and user experience. Key areas for future improvements include:

1. **Toast Notifications**: Implementing toast messages for user interactions can significantly enhance the user experience. Utilizing standard packages like `@ngneat/hot-toast` or `ngx-toastr` can provide elegant and informative feedback for actions like form submissions, errors, and other notifications.

2. **UI Enhancement with HyperUI and DaisyUI**: To further improve the visual appeal and user interface, integrating HyperUI along with the existing DaisyUI can offer more diverse and aesthetically pleasing UI components. This combination can lead to a more engaging and visually cohesive user experience.

3. **Login Feature**: Introducing a login feature would add a layer of personalization and security. This could involve user authentication and authorization, possibly using Firebase Authentication, to manage user sessions and access control.

4. **Database Persistence with Firestore**: Leveraging Firestore for database persistence would not only provide real-time data syncing but also ensure scalable and efficient data management. This integration would be particularly beneficial for features like product management, user profiles, and other dynamic data interactions.

These enhancements aim to make `fliproom` more user-friendly, visually appealing, and functionally robust, aligning it with the best practices of modern web application development.
