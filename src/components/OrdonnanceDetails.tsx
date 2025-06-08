
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, User, Phone, Calendar, Mail, Image } from 'lucide-react';

interface Ordonnance {
  id: number;
  customer: string;
  phone: string;
  date: string;
  status: string;
  email?: string;
  imageUrl?: string;
}

interface OrdonnanceDetailsProps {
  ordonnance: Ordonnance;
  onClose: () => void;
}

const OrdonnanceDetails = ({ ordonnance, onClose }: OrdonnanceDetailsProps) => {
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
          <CardTitle className="text-2xl text-gray-900">
            Détails de l'ordonnance #{ordonnance.id}
          </CardTitle>
          <CardDescription>
            Informations complètes de l'ordonnance
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Patient</p>
              <p className="font-semibold">{ordonnance.customer}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Téléphone</p>
              <p className="font-semibold">{ordonnance.phone}</p>
            </div>
          </div>
          
          {ordonnance.email && (
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{ordonnance.email}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Date de réception</p>
              <p className="font-semibold">{ordonnance.date}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Statut</p>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              ordonnance.status === 'À vérifier' ? 'bg-yellow-100 text-yellow-800' :
              ordonnance.status === 'Disponible' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {ordonnance.status}
            </span>
          </div>
          
          {ordonnance.imageUrl && (
            <div className="pt-4 border-t">
              <div className="flex items-center space-x-3 mb-4">
                <Image className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-gray-600">Image de l'ordonnance</p>
              </div>
              <img 
                src={ordonnance.imageUrl} 
                alt="Ordonnance" 
                className="w-full max-w-md mx-auto border rounded-lg shadow-sm"
              />
            </div>
          )}
          
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

export default OrdonnanceDetails;
