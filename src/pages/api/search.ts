import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Order from '@/models/Order';
import Supplier from '@/models/Supplier';
import { authMiddleware } from '@/middleware/auth';

interface SearchResult {
  id: string;
  name: string;
  type: 'product' | 'order' | 'supplier';
  sku?: string;
  status?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { q: searchQuery } = req.query;
    
    if (!searchQuery || typeof searchQuery !== 'string') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Search products
    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { sku: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ],
    }).limit(5);

    // Search orders
    const orders = await Order.find({
      $or: [
        { orderNumber: { $regex: searchQuery, $options: 'i' } },
        { 'customer.name': { $regex: searchQuery, $options: 'i' } },
        { 'customer.email': { $regex: searchQuery, $options: 'i' } },
      ],
    }).limit(5);

    // Search suppliers
    const suppliers = await Supplier.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { contactPerson: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
      ],
    }).limit(5);

    // Format results
    const results: SearchResult[] = [
      ...products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        type: 'product' as const,
        sku: product.sku,
        status: product.status,
      })),
      ...orders.map((order) => ({
        id: order._id.toString(),
        name: `Order #${order.orderNumber}`,
        type: 'order' as const,
        status: order.status,
      })),
      ...suppliers.map((supplier) => ({
        id: supplier._id.toString(),
        name: supplier.name,
        type: 'supplier' as const,
        status: supplier.status,
      })),
    ];

    res.status(200).json({ results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authMiddleware(handler);
