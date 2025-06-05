
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddSaleDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    unitPrice: "",
    customer: "",
    paymentMethod: "",
  });
  const { toast } = useToast();

  // Mock inventory data - in real app this would come from database
  const availableProducts = [
    { id: "SKU-001", name: "Wireless Bluetooth Headphones", price: 89.99, stock: 45 },
    { id: "SKU-002", name: "Smart Phone Case", price: 24.99, stock: 8 },
    { id: "SKU-004", name: "Laptop Stand", price: 45.50, stock: 67 },
    { id: "SKU-005", name: "Wireless Mouse", price: 35.00, stock: 23 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProduct = availableProducts.find(p => p.id === formData.product);
    const quantity = parseInt(formData.quantity);
    const unitPrice = parseFloat(formData.unitPrice);
    
    if (!selectedProduct || quantity <= 0 || unitPrice <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please check all fields and ensure valid values.",
        variant: "destructive",
      });
      return;
    }
    
    if (quantity > selectedProduct.stock) {
      toast({
        title: "Insufficient Stock",
        description: `Only ${selectedProduct.stock} units available for ${selectedProduct.name}.`,
        variant: "destructive",
      });
      return;
    }
    
    const totalAmount = quantity * unitPrice;
    
    console.log("Recording sale:", {
      ...formData,
      totalAmount,
      saleDate: new Date().toISOString(),
    });
    
    // In real app, this would update the database and reduce inventory
    toast({
      title: "Sale Recorded Successfully",
      description: `Sale of ${quantity} ${selectedProduct.name} for $${totalAmount.toFixed(2)} has been recorded. Inventory updated.`,
    });
    
    setFormData({
      product: "",
      quantity: "",
      unitPrice: "",
      customer: "",
      paymentMethod: "",
    });
    setOpen(false);
  };

  const handleProductChange = (productId: string) => {
    const product = availableProducts.find(p => p.id === productId);
    setFormData(prev => ({
      ...prev,
      product: productId,
      unitPrice: product?.price.toString() || "",
    }));
  };

  const selectedProduct = availableProducts.find(p => p.id === formData.product);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-500 to-green-600">
          <Plus className="w-4 h-4 mr-2" />
          Record Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Record New Sale</DialogTitle>
          <DialogDescription>
            Record a sale and automatically update inventory levels.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="product">Product</Label>
            <Select onValueChange={handleProductChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {availableProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} (Stock: {product.stock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedProduct && (
              <p className="text-sm text-slate-600 mt-1">
                Available stock: {selectedProduct.stock} units
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={selectedProduct?.stock || 999}
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="unitPrice">Unit Price ($)</Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                min="0.01"
                value={formData.unitPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, unitPrice: e.target.value }))}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {formData.quantity && formData.unitPrice && (
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm font-medium text-slate-700">
                Total Amount: ${(parseInt(formData.quantity || "0") * parseFloat(formData.unitPrice || "0")).toFixed(2)}
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="customer">Customer (Optional)</Label>
            <Input
              id="customer"
              value={formData.customer}
              onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
              placeholder="Customer name"
            />
          </div>

          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Credit Card</SelectItem>
                <SelectItem value="debit">Debit Card</SelectItem>
                <SelectItem value="mobile">Mobile Payment</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-green-500 to-green-600">
              Record Sale
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSaleDialog;
