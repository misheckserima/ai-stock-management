
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateTransferDialogProps {
  children?: React.ReactNode;
}

const CreateTransferDialog = ({ children }: CreateTransferDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fromWarehouse: "",
    toWarehouse: "",
    product: "",
    quantity: "",
    priority: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Creating transfer:", formData);
    
    toast({
      title: "Transfer Order Created",
      description: `Transfer from ${formData.fromWarehouse} to ${formData.toWarehouse} has been initiated.`,
    });
    
    setFormData({
      fromWarehouse: "",
      toWarehouse: "",
      product: "",
      quantity: "",
      priority: "",
    });
    setOpen(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <Truck className="w-4 h-4 mr-2" />
            Create Transfer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Transfer Order</DialogTitle>
          <DialogDescription>
            Transfer inventory between warehouse locations.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromWarehouse">From Warehouse</Label>
              <Select onValueChange={(value) => handleChange("fromWarehouse", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Warehouse</SelectItem>
                  <SelectItem value="west">West Coast Hub</SelectItem>
                  <SelectItem value="distribution">Distribution Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="toWarehouse">To Warehouse</Label>
              <Select onValueChange={(value) => handleChange("toWarehouse", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Warehouse</SelectItem>
                  <SelectItem value="west">West Coast Hub</SelectItem>
                  <SelectItem value="distribution">Distribution Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="product">Product</Label>
            <Select onValueChange={(value) => handleChange("product", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laptop">Laptop Stand</SelectItem>
                <SelectItem value="headphones">Wireless Headphones</SelectItem>
                <SelectItem value="cable">USB Cable</SelectItem>
                <SelectItem value="monitor">Monitor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                placeholder="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600">
              Create Transfer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransferDialog;
