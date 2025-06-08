
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, MapPin, Phone, User, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderFormProps {
  pack: {
    id: number;
    title: string;
    price: string;
  };
  onClose: () => void;
}

const OrderForm = ({ pack, onClose }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Simulate order submission
    console.log('Order submitted:', { pack, customerInfo: formData });
    
    toast({
      title: "Commande reçue !",
      description: `Votre commande pour ${pack.title} a été enregistrée. Nous vous contacterons bientôt.`,
    });
    
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <CardTitle className="text-2xl text-gray-900">Commander {pack.title}</CardTitle>
          <CardDescription>
            Prix: <span className="font-semibold text-blue-600">{pack.price}</span>
            <br />
            <span className="text-green-600 font-medium">✓ Livraison gratuite à Rouiba</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Nom complet *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Votre nom complet"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Téléphone *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0XXX XX XX XX"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="votre.email@exemple.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Adresse de livraison *
              </Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Votre adresse complète à Rouiba"
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes supplémentaires</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Instructions spéciales, étage, code d'accès..."
                rows={2}
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Information de livraison</h4>
              <p className="text-blue-800 text-sm">
                • Livraison gratuite dans toute la commune de Rouiba<br />
                • Délai de livraison: 24-48h<br />
                • Paiement à la livraison
              </p>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Annuler
              </Button>
              <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700">
                Confirmer la commande
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderForm;
