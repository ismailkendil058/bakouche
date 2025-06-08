
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, User, Phone, MapPin, Package, Mail } from 'lucide-react';

interface Order {
  id: number;
  customer: string;
  pack: string;
  phone: string;
  status: string;
  address?: string;
  email?: string;
}

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

const OrderDetails = ({ order, onClose }: OrderDetailsProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardHeader className="relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <CardTitle className="text-2xl text-gray-900">
            Détails de la commande #{order.id}
          </CardTitle>
          <CardDescription>
            Informations complètes de la commande
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Client</p>
              <p className="font-semibold">{order.customer}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Téléphone</p>
              <p className="font-semibold">{order.phone}</p>
            </div>
          </div>
          
          {order.email && (
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{order.email}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <Package className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Pack commandé</p>
              <p className="font-semibold">{order.pack}</p>
            </div>
          </div>
          
          {order.address && (
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Adresse de livraison</p>
                <p className="font-semibold">{order.address}</p>
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Statut</p>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
              order.status === 'Confirmé' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {order.status}
            </span>
          </div>
          
          <div className="pt-4">
            <Button onClick={onClose} className="w-full">
              Fermer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
