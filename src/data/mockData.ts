// This file contains example data for the application
// We use this instead of a real database for the demo version

export const mockData = {
  // List of suppliers with their details
  suppliers: [
    {
      id: 1,
      name: 'Tech Solutions Ltd',
      contactPerson: 'Wellington Moyo',
      email: 'wellington@techsolutions.co.zw',
      phone: '+263 77 123 4567',
      address: '123 Tech Street, Harare',
      status: 'active'
    },
    {
      id: 2,
      name: 'Digital Innovations',
      contactPerson: 'Esther Ndlovu',
      email: 'esther@digitalinnovations.co.zw',
      phone: '+263 77 234 5678',
      address: '456 Innovation Drive, Bulawayo',
      status: 'active'
    }
  ],

  // List of products in stock
  products: [
    {
      id: 1,
      sku: 'EL-1001',
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      costPrice: 89.99,
      sellingPrice: 149.99,
      minStockLevel: 10,    // Alert when stock goes below this
      maxStockLevel: 100,   // Maximum stock to maintain
      status: 'active'
    },
    {
      id: 2,
      sku: 'CL-2001',
      name: "Men's Casual T-Shirt",
      description: 'Comfortable cotton t-shirt for men',
      costPrice: 8.99,
      sellingPrice: 24.99,
      minStockLevel: 50,
      maxStockLevel: 500,
      status: 'active'
    }
  ],

  // List of customer orders
  orders: [
    {
      id: 'ORD-2024-001',
      customerName: 'Tendai Nyoni',
      customerEmail: 'tendai.n@email.co.zw',
      orderDate: '2024-03-01',
      status: 'delivered',
      totalAmount: 192.48,
      paymentMethod: 'credit_card',
      paymentStatus: 'paid'
    }
  ],

  // List of warehouses and their details
  warehouses: [
    {
      id: 'WH001',
      name: 'Main Warehouse',
      location: 'Harare Central',
      capacity: '5000 sqft',
      occupancy: '75%',
      manager: 'Tinevimbo Moyo'
    },
    {
      id: 'WH002',
      name: 'South Branch',
      location: 'Bulawayo',
      capacity: '3000 sqft',
      occupancy: '60%',
      manager: 'Andrew Sibanda'
    }
  ]
}; 