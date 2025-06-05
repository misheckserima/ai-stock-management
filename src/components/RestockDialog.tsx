
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Package } from "lucide-react";

interface RestockDialogProps {
  productName: string;
  currentStock: number;
  onRestock: (quantity: number) => void;
}

const RestockDialog = ({ productName, currentStock, onRestock }: RestockDialogProps) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (quantity <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a quantity greater than 0.",
        variant: "destructive",
      });
      return;
    }
    
    onRestock(quantity);
    setOpen(false);
    setQuantity(0);
    
    toast({
      title: "Stock Updated",
      description: `Added ${quantity} units to ${productName}. New stock: ${currentStock + quantity}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Package className="w-4 h-4 mr-1" />
          Restock
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Restock Product</DialogTitle>
          <DialogDescription>
            Add inventory to {productName}. Current stock: {currentStock}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="col-span-3"
                placeholder="Enter quantity to add"
                required
              />
            </div>
            <div className="text-sm text-slate-600">
              New total stock will be: {currentStock + quantity}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Stock</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RestockDialog;
