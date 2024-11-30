# Car Rental Web Application  

This is a **Car Rental Web Application** built with **Next.js** and deployed on **Vercel**. The app is designed for customers and vehicle providers to facilitate efficient car rental management.  

**Live Demo:** [da01-rent-car.vercel.app](https://da01-rent-car.vercel.app)  

---

## Features  

### General:  
- **Sign Up / Sign In** for both **Customers** and **Providers**.  
- Role-based functionality:  
  - **Customer**: Rent cars and view rental history.  
  - **Provider**: Manage vehicle listings and handle rental requests.  
- Update profiles with ease.  

### Customer-Specific:  
- Search and filter vehicles in a list view.  
- Send rental requests to providers.  
- View rental request history.  

### Provider-Specific:  
- Manage vehicle listings with full **CRUD (Create, Read, Update, Delete)** capabilities.  
- Respond to customer rental requests.  

---

## Routes
```
├── (auth)
│   ├──login            # Login page
│   ├──signup           # Register Page
│   └──providers        # Register for Providers
├── (main)
│   ├── /               # Landing Page
│   ├── /about-us       # About Page
│   ├── /cars           # List vehicles
│   ├── /my-account     # Account information (Login required)
└── (provider)
    └──/[id]
       ├── /            # Provider Dashboard            
       ├── /cars        # Provider list Vehicles
       ├── /my-account  # Provider information
       └── /reviews     # List reviews of user
```

## Contributing  

Contributions are welcome! If you encounter bugs or have feature suggestions, please open an issue or submit a pull request.  

---

Thank you for exploring the **Car Rental Web Application**! Check it out live at [da01-rent-car.vercel.app](https://da01-rent-car.vercel.app).  