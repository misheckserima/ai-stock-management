import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '@/middleware/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // The auth middleware adds the user to the request object
    const user = (req as any).user;
    
    res.status(200).json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authMiddleware(handler);
