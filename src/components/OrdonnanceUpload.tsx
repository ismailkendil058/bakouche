
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Phone, User, Camera, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OrdonnanceUpload = () => {
  const [uploadData, setUploadData] = useState({
    fullName: '',
    phone: '',
    notes: '',
    file: null as File | null
  });
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadData(prev => ({ ...prev, file }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUploadData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadData.fullName || !uploadData.phone || !uploadData.file) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires et joindre votre ordonnance",
        variant: "destructive"
      });
      return;
    }

    console.log('Ordonnance upload:', uploadData);
    
    toast({
      title: "Ordonnance reçue !",
      description: "Nous vérifierons la disponibilité et vous contacterons dans les plus brefs délais.",
    });
    
    // Reset form
    setUploadData({
      fullName: '',
      phone: '',
      notes: '',
      file: null
    });
    (document.getElementById('ordonnance-file') as HTMLInputElement).value = '';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-gray-900 mb-4">Vérification d'Ordonnance</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Envoyez-nous votre ordonnance pour vérifier la disponibilité des médicaments. 
          Notre équipe vous contactera rapidement.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Envoyer votre ordonnance</CardTitle>
          <CardDescription>
            Formats acceptés: JPG, PNG, PDF (max 5MB)
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
                  value={uploadData.fullName}
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
                  value={uploadData.phone}
                  onChange={handleInputChange}
                  placeholder="0XXX XX XX XX"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ordonnance-file" className="flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Ordonnance *
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex space-x-4">
                    <Camera className="w-12 h-12 text-gray-400" />
                    <Image className="w-12 h-12 text-gray-400" />
                  </div>
                  <Input
                    id="ordonnance-file"
                    type="file"
                    accept="image/*,application/pdf"
                    capture="environment"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  <div className="space-y-2">
                    <Label 
                      htmlFor="ordonnance-file" 
                      className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium block"
                    >
                      Prendre une photo ou choisir depuis la galerie
                    </Label>
                    <p className="text-sm text-gray-500">
                      Photographiez directement votre ordonnance ou sélectionnez depuis vos photos
                    </p>
                  </div>
                  {uploadData.file && (
                    <p className="text-green-600 font-medium">
                      ✓ {uploadData.file.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes ou questions</Label>
              <Textarea
                id="notes"
                name="notes"
                value={uploadData.notes}
                onChange={handleInputChange}
                placeholder="Questions sur les médicaments, substitutions possibles..."
                rows={3}
              />
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Procédure de vérification</h4>
              <div className="text-green-800 text-sm space-y-1">
                <p>1. Envoi de votre ordonnance via ce formulaire</p>
                <p>2. Vérification de la disponibilité par notre pharmacien</p>
                <p>3. Contact téléphonique pour confirmation (sous 2h)</p>
                <p>4. Préparation de votre commande</p>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              Envoyer l'ordonnance
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdonnanceUpload;
