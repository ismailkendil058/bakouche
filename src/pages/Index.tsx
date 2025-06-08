import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Upload, Package, Shield, Star, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import AdminDashboard from '@/components/AdminDashboard';
import PromoPackCard from '@/components/PromoPackCard';
import OrderForm from '@/components/OrderForm';
import OrdonnanceUpload from '@/components/OrdonnanceUpload';

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [promoPacks, setPromoPacks] = useState([
    {
      id: 1,
      title: "Pack Famille Santé",
      description: "Vitamines + Compléments alimentaires pour toute la famille",
      price: "2500 DA",
      originalPrice: "3200 DA",
      image: "data:image/png;base64,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",
      items: ["Multivitamines", "Vitamine D", "Omega 3", "Probiotiques"]
    },
    {
      id: 2,
      title: "Pack Beauté & Bien-être",
      description: "Soins cosmétiques et produits de beauté premium",
      price: "3800 DA",
      originalPrice: "4800 DA",
      image: "data:image/jpeg;base64,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",
      items: ["Crème hydratante", "Sérum anti-âge", "Protection solaire", "Masque purifiant"]
    },
    {
      id: 3,
      title: "Pack Hygiène Complète",
      description: "Produits d'hygiène quotidienne de qualité",
      price: "1800 DA",
      originalPrice: "2400 DA",
      image: "data:image/png;base64,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",
      items: ["Gel douche", "Shampooing", "Dentifrice", "Déodorant"]
    },
    {
      id: 4,
      title: "Pack Maman & Bébé",
      description: "Tout le nécessaire pour maman et bébé",
      price: "4200 DA",
      originalPrice: "5200 DA",
      image: "data:image/png;base64,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",
      items: ["Lait infantile", "Couches", "Crème bébé", "Vitamines grossesse"]
    }
  ]);
  const { toast } = useToast();

  const handleOrderPack = (pack) => {
    setSelectedPack(pack);
    setShowOrderForm(true);
  };

  const handleAdminAccess = () => {
    const password = prompt("Mot de passe administrateur:");
    if (password === "0000") {
      setShowAdmin(true);
    } else {
      toast({
        title: "Accès refusé",
        description: "Mot de passe incorrect",
        variant: "destructive"
      });
    }
  };

  if (showAdmin) {
    return <AdminDashboard onBack={() => setShowAdmin(false)} promoPacks={promoPacks} setPromoPacks={setPromoPacks} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pharmacie Bakouche</h1>
                <p className="text-sm text-gray-600">Votre santé, notre priorité</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#packs" className="text-gray-700 hover:text-blue-600 transition-colors">Packs Promo</a>
              <a href="#ordonnance" className="text-gray-700 hover:text-blue-600 transition-colors">Ordonnance</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">À propos</a>
              <button 
                onClick={handleAdminAccess}
                className="text-gray-500 hover:text-blue-600 transition-colors text-sm"
              >
                Admin
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Bienvenue chez <span className="text-blue-600">Pharmacie Bakouche</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez nos packs promotionnels exclusifs et bénéficiez de la livraison gratuite à Rouiba
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Produits certifiés</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700">Service de qualité</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Livraison gratuite Rouiba</span>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Packs Section */}
      <section id="packs" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Nos Packs Promotionnels</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Profitez de nos offres spéciales conçues pour répondre à tous vos besoins de santé et bien-être
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {promoPacks.map((pack) => (
              <PromoPackCard 
                key={pack.id} 
                pack={pack} 
                onOrder={() => handleOrderPack(pack)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ordonnance Upload Section */}
      <section id="ordonnance" className="py-16 px-4">
        <div className="container mx-auto">
          <OrdonnanceUpload />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-8">À Propos de Nous</h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Notre Mission</h4>
                <p className="text-gray-600 mb-6">
                  Depuis plus de 20 ans, la Pharmacie Bakouche s'engage à fournir des soins de santé de qualité 
                  à la communauté de Rouiba. Notre équipe de pharmaciens qualifiés vous accompagne dans votre 
                  parcours de santé avec professionnalisme et bienveillance.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Ouvert 7j/7 de 8h à 22h</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Pharmaciens diplômés d'État</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">Plus de 1000 références</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=600&q=80" 
                  alt="Pharmacie Bakouche" 
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Nous Contacter</h3>
            <p className="text-gray-600">Nous sommes là pour vous aider</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Adresse</h4>
                    <p className="text-gray-600">
                      pharmacie bakouche, Rouiba<br />
                      Alger, Algérie
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Téléphone</h4>
                    <p className="text-gray-600">0552 59 46 04</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                    <p className="text-gray-600">bakouche.pharma@gmail.com</p>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <div className="pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Suivez-nous</h4>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/pharmacie__bakouche?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/pharmacie__bakouche?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.2022918881453!2d3.2696794764026684!3d36.7417151709933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e45a8f7577445%3A0x2e6a8557a47728a3!2z2LXZitiv2YTZitipINio2YPZiNi0!5e0!3m2!1sen!2sdz!4v1749355361080!5m2!1sen!2sdz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pharmacie Bakouche Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="text-xl font-semibold">Pharmacie Bakouche</span>
          </div>
          <p className="text-gray-400 mb-4">Votre santé, notre priorité depuis 2019</p>
          <p className="text-gray-500 text-sm">© 2019 Pharmacie Bakouche. Tous droits réservés.</p>
        </div>
      </footer>

      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm 
          pack={selectedPack} 
          onClose={() => {
            setShowOrderForm(false);
            setSelectedPack(null);
          }} 
        />
      )}
    </div>
  );
};

export default Index;
