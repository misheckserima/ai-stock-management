import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Import models
const { default: User } = await import('../src/models/User.mjs');
const { default: Category } = await import('../src/models/Category.mjs');
const { default: Product } = await import('../src/models/Product.mjs');
const { default: Supplier } = await import('../src/models/Supplier.mjs');
const { default: Warehouse } = await import('../src/models/Warehouse.mjs');
const { default: Inventory } = await import('../src/models/Inventory.mjs');
const { default: PurchaseOrder } = await import('../src/models/PurchaseOrder.mjs');
const { default: PurchaseOrderItem } = await import('../src/models/PurchaseOrderItem.mjs');
const { default: SalesOrder } = await import('../src/models/SalesOrder.mjs');
const { default: SalesOrderItem } = await import('../src/models/SalesOrderItem.mjs');
const { default: StockMovement } = await import('../src/models/StockMovement.mjs');
const { default: Expense } = await import('../src/models/Expense.mjs');
const { default: StockAdjustment } = await import('../src/models/StockAdjustment.mjs');
const { default: LowStockAlert } = await import('../src/models/LowStockAlert.mjs');
const { default: Report } = await import('../src/models/Report.mjs');

// Import seed data
import {
  categories,
  suppliers,
  users,
  warehouses,
  products,
  purchaseOrders,
  purchaseOrderItems,
  salesOrders,
  salesOrderItems,
  stockMovements,
  expenses,
  stockAdjustments,
  lowStockAlerts,
  reports,
} from '../src/data/seed/index.js';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stockwise';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Supplier.deleteMany({}),
      Product.deleteMany({}),
      Warehouse.deleteMany({}),
      Inventory.deleteMany({}),
      PurchaseOrder.deleteMany({}),
      PurchaseOrderItem.deleteMany({}),
      SalesOrder.deleteMany({}),
      SalesOrderItem.deleteMany({}),
      StockMovement.deleteMany({}),
      Expense.deleteMany({}),
      StockAdjustment.deleteMany({}),
      LowStockAlert.deleteMany({}),
      Report.deleteMany({}),
    ]);
    console.log('Cleared all existing data');

    // Create users with hashed passwords
    console.log('Creating users...');
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return User.create({
          ...user,
          password: hashedPassword,
        });
      })
    );
    console.log(`Created ${createdUsers.length} users`);

    // Create categories
    console.log('Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);
      { name: 'Food & Beverages', description: 'Food and drink products' },
      { name: 'Office Supplies', description: 'Office and stationery items' },
      { name: 'Furniture', description: 'Home and office furniture' },
    ]);
    console.log(`Created ${categories.length} categories`);

    // Create suppliers
    console.log('Creating suppliers...');
    const suppliers = await Supplier.create([
      {
        name: 'TechGadgets Inc.',
        contactPerson: 'John Smith',
        email: 'john@techgadgets.com',
        phone: '+1 (555) 123-4567',
        address: '123 Tech Street, San Francisco, CA 94107',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        postalCode: '94107',
        paymentTerms: 'Net 30',
      },
      {
        name: 'Fashion World Ltd.',
        contactPerson: 'Sarah Johnson',
        email: 'sarah@fashionworld.com',
        phone: '+1 (555) 987-6543',
        address: '456 Fashion Ave, New York, NY 10018',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10018',
        paymentTerms: 'Net 15',
      },
      {
        name: 'Global Foods Corp.',
        contactPerson: 'Michael Chen',
        email: 'michael@globalfoods.com',
        phone: '+1 (555) 456-7890',
        address: '789 Food Court, Chicago, IL 60601',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        postalCode: '60601',
        paymentTerms: 'Net 30',
      },
    ]);
    console.log(`Created ${suppliers.length} suppliers`);

    // Create products
    console.log('Creating products...');
    const products = await Product.create([
      {
        sku: 'EL-1001',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        category: categories[0]._id,
        supplier: suppliers[0]._id,
        costPrice: 89.99,
        sellingPrice: 149.99,
        minStockLevel: 10,
        maxStockLevel: 100,
        unitOfMeasure: 'piece',
        barcode: '123456789012',
      },
      {
        sku: 'CL-2001',
        name: 'Men\'s Casual T-Shirt',
        description: 'Comfortable cotton t-shirt for men',
        category: categories[1]._id,
        supplier: suppliers[1]._id,
        costPrice: 8.99,
        sellingPrice: 24.99,
        minStockLevel: 50,
        maxStockLevel: 500,
        unitOfMeasure: 'piece',
        barcode: '234567890123',
      },
      {
        sku: 'FB-3001',
        name: 'Organic Coffee Beans',
        description: 'Premium organic coffee beans, 1kg',
        category: categories[2]._id,
        supplier: suppliers[2]._id,
        costPrice: 14.99,
        sellingPrice: 29.99,
        minStockLevel: 20,
        maxStockLevel: 200,
        unitOfMeasure: 'kg',
        barcode: '345678901234',
      },
      {
        sku: 'OS-4001',
        name: 'Stapler',
        description: 'Standard office stapler',
        category: categories[3]._id,
        supplier: suppliers[0]._id,
        costPrice: 3.49,
        sellingPrice: 7.99,
        minStockLevel: 30,
        maxStockLevel: 300,
        unitOfMeasure: 'piece',
        barcode: '456789012345',
      },
      {
        sku: 'FN-5001',
        name: 'Ergonomic Office Chair',
        description: 'Comfortable ergonomic chair for office use',
        category: categories[4]._id,
        supplier: suppliers[1]._id,
        costPrice: 129.99,
        sellingPrice: 249.99,
        minStockLevel: 5,
        maxStockLevel: 50,
        unitOfMeasure: 'piece',
        barcode: '567890123456',
      },
    ]);
    console.log(`Created ${products.length} products`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
