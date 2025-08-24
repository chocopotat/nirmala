import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useApp, mockDesigns } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PresetPage() {
  const { setCurrentPage, setSelectedDesign, setOrderData, orderData } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState<'all' | 'digital' | 'cetak'>('all');

  const categories = ['All', 'Premium', 'Standard'];
  
  const filteredDesigns = mockDesigns.filter(design => {
    const categoryMatch = selectedCategory === 'All' || design.category === selectedCategory;
    const typeMatch = selectedType === 'all' || design.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const handlePreview = (design: any) => {
    if (design.type === 'digital' && design.digitalPreviewUrl) {
      // Open digital invitation in new tab
      window.open(design.digitalPreviewUrl, '_blank', 'noopener,noreferrer');
    }
    // For print invitations, the preview dialog will handle the display
  };

  const handleOrder = (design: any) => {
    setSelectedDesign(design);
    setOrderData({
      ...orderData,
      designId: design.id,
      designType: design.type,
      quantity: design.type === 'cetak' ? 50 : 1
    });
    setCurrentPage('order');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Koleksi Desain Undangan
          </h1>
          <p className="text-gray-600 text-lg">
            Pilih dari berbagai desain digital dan cetak yang tersedia
          </p>
        </div>

        {/* Type Tabs */}
        <div className="flex justify-center mb-8">
          <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as 'all' | 'digital' | 'cetak')} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="digital">Digital</TabsTrigger>
              <TabsTrigger value="cetak">Cetak</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'ghost'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Design Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDesigns.map((design) => (
            <Card key={design.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={design.image}
                  alt={design.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge className="bg-white text-gray-800 shadow-md">
                    {design.category}
                  </Badge>
                  <Badge 
                    className={`shadow-md ${
                      design.type === 'digital' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {design.type === 'digital' ? 'Digital' : 'Cetak'}
                  </Badge>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    {design.type === 'digital' ? (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="bg-white hover:bg-gray-100"
                        onClick={() => handlePreview(design)}
                      >
                        Preview
                      </Button>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="secondary" className="bg-white hover:bg-gray-100">
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{design.name}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <ImageWithFallback
                              src={design.image}
                              alt={design.name}
                              className="w-full h-96 object-cover rounded-lg"
                            />
                            <div className="mt-4">
                              <p className="text-gray-600 mb-2">{design.description}</p>
                              <div className="flex items-center justify-between">
                                <p className="font-semibold text-lg text-purple-600">
                                  Rp {design.price.toLocaleString('id-ID')} / 50 pcs
                                </p>
                                <Badge className={design.type === 'digital' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                                  {design.type === 'digital' ? 'Digital' : 'Cetak'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    <Button 
                      size="sm" 
                      onClick={() => handleOrder(design)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Order
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-lg">{design.name}</CardTitle>
                </CardHeader>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {design.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-purple-600 text-lg">
                    Rp {design.price.toLocaleString('id-ID')}
                    {design.type === 'cetak' && <span className="text-sm font-normal text-gray-500"> / 50 pcs</span>}
                  </span>
                  <Badge className={design.type === 'digital' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                    {design.type === 'digital' ? 'Digital' : 'Cetak'}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  {design.type === 'digital' ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handlePreview(design)}
                    >
                      Preview
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{design.name}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <ImageWithFallback
                            src={design.image}
                            alt={design.name}
                            className="w-full h-96 object-cover rounded-lg"
                          />
                          <div className="mt-4">
                            <p className="text-gray-600 mb-2">{design.description}</p>
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-lg text-purple-600">
                                Rp {design.price.toLocaleString('id-ID')} / 50 pcs
                              </p>
                              <Badge className="bg-green-100 text-green-800">
                                Cetak
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  
                  <Button 
                    size="sm" 
                    onClick={() => handleOrder(design)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDesigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada desain untuk kategori ini</p>
          </div>
        )}
      </div>
    </div>
  );
}