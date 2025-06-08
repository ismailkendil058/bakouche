
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Star } from 'lucide-react';

interface PromoPackCardProps {
  pack: {
    id: number;
    title: string;
    description: string;
    price: string;
    originalPrice: string;
    image: string;
    items: string[];
  };
  onOrder: () => void;
}

const PromoPackCard = ({ pack, onOrder }: PromoPackCardProps) => {
  const discount = Math.round(((parseInt(pack.originalPrice) - parseInt(pack.price)) / parseInt(pack.originalPrice)) * 100);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        <img 
          src={pack.image} 
          alt={pack.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          -{discount}%
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
          {pack.title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {pack.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 flex items-center">
            <Package className="w-4 h-4 mr-2 text-blue-600" />
            Contenu du pack:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {pack.items.map((item, index) => (
              <li key={index} className="flex items-center">
                <Star className="w-3 h-3 mr-2 text-yellow-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-blue-600">{pack.price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">{pack.originalPrice}</span>
          </div>
        </div>
        
        <Button 
          onClick={onOrder}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        >
          Commander ce pack
        </Button>
      </CardContent>
    </Card>
  );
};

export default PromoPackCard;
