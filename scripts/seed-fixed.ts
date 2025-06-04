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

    // Create suppliers
    console.log('Creating suppliers...');
    const createdSuppliers = await Supplier.insertMany(suppliers);
    console.log(`Created ${createdSuppliers.length} suppliers`);

    // Update warehouses with manager references
    const updatedWarehouses = warehouses.map((warehouse) => ({
      ...warehouse,
      manager: createdUsers[0]._id, // First user is admin and will be the manager
    }));

    // Create warehouses
    console.log('Creating warehouses...');
    const createdWarehouses = await Warehouse.insertMany(updatedWarehouses);
    console.log(`Created ${createdWarehouses.length} warehouses`);

    // Update products with category and supplier references
    const updatedProducts = products.map((product, index) => ({
      ...product,
      category: createdCategories[index % createdCategories.length]._id,
      supplier: createdSuppliers[index % createdSuppliers.length]._id,
    }));

    // Create products
    console.log('Creating products...');
    const createdProducts = await Product.insertMany(updatedProducts);
    console.log(`Created ${createdProducts.length} products`);

    // Create inventory for products in warehouses
    console.log('Creating inventory records...');
    const inventoryPromises = [];
    
    for (const warehouse of createdWarehouses) {
      for (const product of createdProducts) {
        inventoryPromises.push(
          Inventory.create({
            product: product._id,
            warehouse: warehouse._id,
            quantityOnHand: Math.floor(Math.random() * 100) + 10, // Random quantity between 10-110
            reservedQuantity: 0,
          })
        );
      }
    }
    
    const createdInventory = await Promise.all(inventoryPromises);
    console.log(`Created ${createdInventory.length} inventory records`);

    // Create purchase orders
    console.log('Creating purchase orders...');
    const adminUser = createdUsers.find(user => user.role === 'admin');
    const updatedPurchaseOrders = purchaseOrders.map(po => ({
      ...po,
      supplier: createdSuppliers[0]._id,
      createdBy: adminUser._id,
    }));

    const createdPurchaseOrders = await Promise.all(
      updatedPurchaseOrders.map(po => PurchaseOrder.create(po))
    );
    console.log(`Created ${createdPurchaseOrders.length} purchase orders`);

    // Create purchase order items
    console.log('Creating purchase order items...');
    const createdPurchaseOrderItems = [];
    
    for (let i = 0; i < createdPurchaseOrders.length; i++) {
      const po = createdPurchaseOrders[i];
      const poItemData = {
        ...purchaseOrderItems[i % purchaseOrderItems.length],
        purchaseOrder: po._id,
        product: createdProducts[i % createdProducts.length]._id,
      };
      
      const poItem = await PurchaseOrderItem.create(poItemData);
      createdPurchaseOrderItems.push(poItem);
    }
    console.log(`Created ${createdPurchaseOrderItems.length} purchase order items`);

    // Create sales orders
    console.log('Creating sales orders...');
    const updatedSalesOrders = salesOrders.map(so => ({
      ...so,
      createdBy: adminUser._id,
    }));

    const createdSalesOrders = await Promise.all(
      updatedSalesOrders.map(so => SalesOrder.create(so))
    );
    console.log(`Created ${createdSalesOrders.length} sales orders`);

    // Create sales order items
    console.log('Creating sales order items...');
    const createdSalesOrderItems = [];
    
    for (let i = 0; i < createdSalesOrders.length; i++) {
      const so = createdSalesOrders[i];
      const soItemData = {
        ...salesOrderItems[i % salesOrderItems.length],
        salesOrder: so._id,
        product: createdProducts[i % createdProducts.length]._id,
      };
      
      const soItem = await SalesOrderItem.create(soItemData);
      createdSalesOrderItems.push(soItem);
    }
    console.log(`Created ${createdSalesOrderItems.length} sales order items`);

    // Create stock movements
    console.log('Creating stock movements...');
    const createdStockMovements = [];
    
    // Add stock movements for purchase orders
    for (const poItem of createdPurchaseOrderItems) {
      const movement = await StockMovement.create({
        product: poItem.product,
        warehouse: createdWarehouses[0]._id,
        movementType: 'in',
        referenceType: 'purchase_order',
        referenceId: poItem.purchaseOrder,
        quantity: poItem.quantityReceived,
        unitCost: poItem.unitCost,
        notes: 'Initial stock from purchase order',
        createdBy: adminUser._id,
      });
      createdStockMovements.push(movement);
    }
    
    // Add stock movements for sales orders
    for (const soItem of createdSalesOrderItems) {
      const movement = await StockMovement.create({
        product: soItem.product,
        warehouse: createdWarehouses[0]._id,
        movementType: 'out',
        referenceType: 'sales_order',
        referenceId: soItem.salesOrder,
        quantity: soItem.quantity,
        unitCost: 0, // Will be calculated based on inventory method (FIFO, LIFO, etc.)
        notes: 'Stock out for sales order',
        createdBy: adminUser._id,
      });
      createdStockMovements.push(movement);
    }
    
    console.log(`Created ${createdStockMovements.length} stock movements`);

    // Create expenses
    console.log('Creating expenses...');
    const createdExpenses = await Promise.all(
      expenses.map(expense => 
        Expense.create({
          ...expense,
          createdBy: adminUser._id,
        })
      )
    );
    console.log(`Created ${createdExpenses.length} expenses`);

    // Create stock adjustments
    console.log('Creating stock adjustments...');
    const createdStockAdjustments = [];
    
    for (let i = 0; i < Math.min(3, createdProducts.length); i++) {
      const adjustment = await StockAdjustment.create({
        ...stockAdjustments[0], // Using the first template
        product: createdProducts[i]._id,
        warehouse: createdWarehouses[0]._id,
        createdBy: adminUser._id,
      });
      createdStockAdjustments.push(adjustment);
    }
    console.log(`Created ${createdStockAdjustments.length} stock adjustments`);

    // Create low stock alerts
    console.log('Creating low stock alerts...');
    const createdLowStockAlerts = [];
    
    for (let i = 0; i < Math.min(2, createdProducts.length); i++) {
      const alert = await LowStockAlert.create({
        ...lowStockAlerts[0], // Using the first template
        product: createdProducts[i]._id,
        warehouse: createdWarehouses[0]._id,
        minQuantity: createdProducts[i].minStockLevel,
      });
      createdLowStockAlerts.push(alert);
    }
    console.log(`Created ${createdLowStockAlerts.length} low stock alerts`);

    // Create reports
    console.log('Creating reports...');
    const createdReports = await Promise.all(
      reports.map(report => 
        Report.create({
          ...report,
          generatedBy: adminUser._id,
        })
      )
    );
    console.log(`Created ${createdReports.length} reports`);

    console.log('\nDatabase seeded successfully!');
    console.log('\nSample login credentials:');
    console.log('Admin: admin@stockwise.com / admin123');
    console.log('Manager: manager@stockwise.com / manager123');
    console.log('Employee: employee@stockwise.com / employee123');
    console.log('\nYou can now start the application with: npm run dev');

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
