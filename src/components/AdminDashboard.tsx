
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Package, FileText, Users, Settings, Trash2, Edit, Plus, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PackForm from '@/components/PackForm';
import OrderDetails from '@/components/OrderDetails';
import OrdonnanceDetails from '@/components/OrdonnanceDetails';

interface Order {
  id: number;
  customer: string;
  pack: string;
  phone: string;
  status: string;
  address?: string;
  email?: string;
}

interface Ordonnance {
  id: number;
  customer: string;
  phone: string;
  date: string;
  status: string;
  email?: string;
  imageUrl?: string;
}

interface AdminDashboardProps {
  onBack: () => void;
  promoPacks: any[];
  setPromoPacks: React.Dispatch<React.SetStateAction<any[]>>;
}

const AdminDashboard = ({ onBack, promoPacks, setPromoPacks }: AdminDashboardProps) => {
  const [newPassword, setNewPassword] = useState('');
  const [showPackForm, setShowPackForm] = useState(false);
  const [editingPack, setEditingPack] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showOrdonnanceDetails, setShowOrdonnanceDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrdonnance, setSelectedOrdonnance] = useState<Ordonnance | null>(null);
  const [pharmacyInfo, setPharmacyInfo] = useState({
    name: 'Pharmacie Bakouche',
    phone: '+213 XXX XXX XXX',
    address: 'Centre-ville Rouiba, Alger, Algérie'
  });
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customer: 'Ahmed Benali', pack: 'Pack Famille Santé', phone: '0555123456', status: 'En attente', address: 'Rue des Martyrs, Rouiba', email: 'ahmed@email.com' },
    { id: 2, customer: 'Fatima Cherif', pack: 'Pack Beauté & Bien-être', phone: '0666789012', status: 'Confirmé', address: 'Cité 20 Août, Rouiba', email: 'fatima@email.com' },
    { id: 3, customer: 'Mohamed Meziane', pack: 'Pack Hygiène Complète', phone: '0777345678', status: 'Livré', address: 'Boulevard Principal, Rouiba', email: 'mohamed@email.com' }
  ]);
  
  const [ordonnances, setOrdonnances] = useState<Ordonnance[]>([
    { id: 1, customer: 'Sarah Brahim', phone: '0555987654', date: '2024-01-15', status: 'À vérifier', email: 'sarah@email.com', imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9' },
    { id: 2, customer: 'Karim Ouali', phone: '0666543210', date: '2024-01-14', status: 'Disponible', email: 'karim@email.com', imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901' },
    { id: 3, customer: 'Amina Kaci', phone: '0777890123', date: '2024-01-13', status: 'Contacté', email: 'amina@email.com', imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1' }
  ]);

  const { toast } = useToast();

  const handlePasswordChange = () => {
    if (newPassword.length < 4) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 4 caractères",
        variant: "destructive"
      });
      return;
    }

    console.log('Password changed to:', newPassword);
    toast({
      title: "Mot de passe modifié",
      description: "Le mot de passe administrateur a été mis à jour avec succès",
    });
    setNewPassword('');
  };

  const handlePharmacyInfoUpdate = () => {
    console.log('Pharmacy info updated:', pharmacyInfo);
    toast({
      title: "Informations mises à jour",
      description: "Les informations de la pharmacie ont été sauvegardées",
    });
  };

  const handleOrderStatusChange = (orderId: number, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Statut modifié",
      description: `Le statut de la commande a été changé à "${newStatus}"`,
    });
  };

  const handleOrdonnanceStatusChange = (ordonnanceId: number, newStatus: string) => {
    setOrdonnances(prev => prev.map(ordonnance => 
      ordonnance.id === ordonnanceId ? { ...ordonnance, status: newStatus } : ordonnance
    ));
    toast({
      title: "Statut modifié",
      description: `Le statut de l'ordonnance a été changé à "${newStatus}"`,
    });
  };

  const handleDeletePack = (packId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce pack ?')) {
      setPromoPacks(prev => prev.filter(pack => pack.id !== packId));
      toast({
        title: "Pack supprimé",
        description: "Le pack a été supprimé avec succès",
      });
    }
  };

  const handleEditPack = (pack: any) => {
    setEditingPack(pack);
    setShowPackForm(true);
  };

  const handleSavePack = (packData: any) => {
    if (editingPack) {
      setPromoPacks(prev => prev.map(pack => 
        pack.id === editingPack.id ? packData : pack
      ));
    } else {
      setPromoPacks(prev => [...prev, packData]);
    }
    setEditingPack(null);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleViewOrdonnance = (ordonnance: Ordonnance) => {
    setSelectedOrdonnance(ordonnance);
    setShowOrdonnanceDetails(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente':
      case 'À vérifier':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmé':
      case 'Disponible':
        return 'bg-blue-100 text-blue-800';
      case 'Livré':
      case 'Contacté':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au site
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord Admin</h1>
              <p className="text-gray-600">Gestion de Pharmacie Bakouche</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Commandes totales</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ordonnances</p>
                  <p className="text-2xl font-bold text-gray-900">{ordonnances.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Clients actifs</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Settings className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Packs actifs</p>
                  <p className="text-2xl font-bold text-gray-900">{promoPacks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="ordonnances">Ordonnances</TabsTrigger>
            <TabsTrigger value="packs">Packs</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des commandes</CardTitle>
                <CardDescription>Liste des commandes de packs promotionnels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{order.customer}</h4>
                        <p className="text-gray-600">{order.pack}</p>
                        <p className="text-sm text-gray-500">{order.phone}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <select 
                          value={order.status}
                          onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                        >
                          <option value="En attente">En attente</option>
                          <option value="Confirmé">Confirmé</option>
                          <option value="Livré">Livré</option>
                        </select>
                        <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ordonnances Tab */}
          <TabsContent value="ordonnances">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des ordonnances</CardTitle>
                <CardDescription>Vérification et suivi des ordonnances reçues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ordonnances.map((ordonnance) => (
                    <div key={ordonnance.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{ordonnance.customer}</h4>
                        <p className="text-gray-600">{ordonnance.phone}</p>
                        <p className="text-sm text-gray-500">Reçu le {ordonnance.date}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <select 
                          value={ordonnance.status}
                          onChange={(e) => handleOrdonnanceStatusChange(ordonnance.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ordonnance.status)}`}
                        >
                          <option value="À vérifier">À vérifier</option>
                          <option value="Disponible">Disponible</option>
                          <option value="Contacté">Contacté</option>
                        </select>
                        <Button variant="outline" size="sm" onClick={() => handleViewOrdonnance(ordonnance)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Packs Tab */}
          <TabsContent value="packs">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des packs</CardTitle>
                <CardDescription>Créer et modifier les packs promotionnels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button 
                  className="w-full"
                  onClick={() => {
                    setEditingPack(null);
                    setShowPackForm(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un nouveau pack
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {promoPacks.map((pack) => (
                    <div key={pack.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{pack.title}</h4>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditPack(pack)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeletePack(pack.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{pack.description}</p>
                      <p className="text-sm font-medium text-blue-600">{pack.price} (était {pack.originalPrice})</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de sécurité</CardTitle>
                  <CardDescription>Modifier le mot de passe administrateur</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Entrez le nouveau mot de passe"
                    />
                  </div>
                  <Button onClick={handlePasswordChange}>
                    Changer le mot de passe
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations de la pharmacie</CardTitle>
                  <CardDescription>Modifier les informations affichées sur le site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pharmacyName">Nom de la pharmacie</Label>
                      <Input 
                        id="pharmacyName" 
                        value={pharmacyInfo.name}
                        onChange={(e) => setPharmacyInfo(prev => ({...prev, name: e.target.value}))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input 
                        id="phone" 
                        value={pharmacyInfo.phone}
                        onChange={(e) => setPharmacyInfo(prev => ({...prev, phone: e.target.value}))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Textarea 
                      id="address" 
                      value={pharmacyInfo.address}
                      onChange={(e) => setPharmacyInfo(prev => ({...prev, address: e.target.value}))}
                    />
                  </div>
                  <Button onClick={handlePharmacyInfoUpdate}>
                    Sauvegarder les modifications
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Pack Form Modal */}
      {showPackForm && (
        <PackForm 
          pack={editingPack}
          onClose={() => {
            setShowPackForm(false);
            setEditingPack(null);
          }}
          onSave={handleSavePack}
        />
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <OrderDetails 
          order={selectedOrder}
          onClose={() => {
            setShowOrderDetails(false);
            setSelectedOrder(null);
          }}
        />
      )}

      {/* Ordonnance Details Modal */}
      {showOrdonnanceDetails && selectedOrdonnance && (
        <OrdonnanceDetails 
          ordonnance={selectedOrdonnance}
          onClose={() => {
            setShowOrdonnanceDetails(false);
            setSelectedOrdonnance(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
