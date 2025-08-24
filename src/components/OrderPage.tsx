import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { useApp, mockDesigns } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function OrderPage() {
  const { selectedDesign, setSelectedDesign, orderData, setOrderData, addOrder } = useApp();
  const [showPreview, setShowPreview] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | number) => {
    setOrderData({ ...orderData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!orderData.customerName) newErrors.customerName = 'Nama wajib diisi';
    if (!orderData.whatsapp) newErrors.whatsapp = 'No WhatsApp wajib diisi';
    if (!orderData.email) newErrors.email = 'Email wajib diisi';
    if (!orderData.designId) newErrors.designId = 'Pilih desain terlebih dahulu';
    if (!orderData.groomParents) newErrors.groomParents = 'Nama orang tua mempelai pria wajib diisi';
    if (!orderData.brideParents) newErrors.brideParents = 'Nama orang tua mempelai wanita wajib diisi';
    if (!orderData.eventDate) newErrors.eventDate = 'Tanggal acara wajib diisi';
    if (!orderData.eventVenue) newErrors.eventVenue = 'Tempat acara wajib diisi';
    
    // Validation for print invitations
    if (orderData.designType === 'cetak') {
      if (!orderData.address) newErrors.address = 'Alamat pengiriman wajib diisi untuk undangan cetak';
      if (orderData.quantity < 50) newErrors.quantity = 'Minimal pemesanan undangan cetak adalah 50 pcs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreviewOrder = () => {
    if (validateForm()) {
      setShowPreview(true);
    }
  };

  const handleConfirmOrder = () => {
    addOrder(orderData);
    setShowPreview(false);
    setShowInvoice(true);
  };

  const handleBackToEdit = () => {
    setShowPreview(false);
  };

  const currentDesign = selectedDesign || mockDesigns.find(d => d.id === orderData.designId);

  const calculateTotal = () => {
    if (!currentDesign) return 0;
    if (currentDesign.type === 'digital') {
      return currentDesign.price;
    } else {
      // For print invitations, calculate based on quantity
      const basePrice = currentDesign.price; // Price for 50 pcs
      const additionalQuantity = Math.max(0, orderData.quantity - 50);
      const additionalPrice = Math.ceil(additionalQuantity / 50) * basePrice;
      return basePrice + additionalPrice;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Pesan Undangan
          </h1>
          <p className="text-gray-600">Isi form di bawah untuk memesan undangan impian Anda</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>Data Pemesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Data Diri</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="customerName">Nama Lengkap *</Label>
                    <Input
                      id="customerName"
                      value={orderData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className={errors.customerName ? 'border-red-500' : ''}
                    />
                    {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="whatsapp">No WhatsApp *</Label>
                    <Input
                      id="whatsapp"
                      value={orderData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="08123456789"
                      className={errors.whatsapp ? 'border-red-500' : ''}
                    />
                    {errors.whatsapp && <p className="text-red-500 text-sm">{errors.whatsapp}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Design Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Pilih Desain</h3>
                <div>
                  <Label htmlFor="design">Desain Undangan *</Label>
                  <Select 
                    value={orderData.designId} 
                    onValueChange={(value) => {
                      const design = mockDesigns.find(d => d.id === value);
                      if (design) {
                        handleInputChange('designId', value);
                        handleInputChange('designType', design.type);
                        handleInputChange('quantity', design.type === 'cetak' ? 50 : 1);
                        setSelectedDesign(design);
                      }
                    }}
                  >
                    <SelectTrigger className={errors.designId ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Pilih desain undangan" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDesigns.map((design) => (
                        <SelectItem key={design.id} value={design.id}>
                          {design.name} ({design.type}) - Rp {design.price.toLocaleString('id-ID')}
                          {design.type === 'cetak' && ' / 50 pcs'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.designId && <p className="text-red-500 text-sm">{errors.designId}</p>}
                </div>
              </div>

              {/* Quantity and Address for Print Invitations */}
              {orderData.designType === 'cetak' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Detail Undangan Cetak</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="quantity">Jumlah Undangan (minimal 50 pcs) *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="50"
                        step="10"
                        value={orderData.quantity}
                        onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 50)}
                        className={errors.quantity ? 'border-red-500' : ''}
                      />
                      {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                      <p className="text-sm text-gray-500 mt-1">
                        Tambahan setiap kelipatan 50 pcs: Rp {currentDesign?.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Alamat Pengiriman *</Label>
                      <Textarea
                        id="address"
                        value={orderData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Alamat lengkap untuk pengiriman undangan cetak"
                        className={errors.address ? 'border-red-500' : ''}
                      />
                      {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Wedding Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Detail Pernikahan</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="groomParents">Nama Orang Tua Mempelai Pria *</Label>
                    <Input
                      id="groomParents"
                      value={orderData.groomParents}
                      onChange={(e) => handleInputChange('groomParents', e.target.value)}
                      placeholder="Bapak ... & Ibu ..."
                      className={errors.groomParents ? 'border-red-500' : ''}
                    />
                    {errors.groomParents && <p className="text-red-500 text-sm">{errors.groomParents}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="brideParents">Nama Orang Tua Mempelai Wanita *</Label>
                    <Input
                      id="brideParents"
                      value={orderData.brideParents}
                      onChange={(e) => handleInputChange('brideParents', e.target.value)}
                      placeholder="Bapak ... & Ibu ..."
                      className={errors.brideParents ? 'border-red-500' : ''}
                    />
                    {errors.brideParents && <p className="text-red-500 text-sm">{errors.brideParents}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="eventDate">Tanggal Acara *</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={orderData.eventDate}
                      onChange={(e) => handleInputChange('eventDate', e.target.value)}
                      className={errors.eventDate ? 'border-red-500' : ''}
                    />
                    {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="eventVenue">Tempat Acara *</Label>
                    <Textarea
                      id="eventVenue"
                      value={orderData.eventVenue}
                      onChange={(e) => handleInputChange('eventVenue', e.target.value)}
                      placeholder="Alamat lengkap tempat acara"
                      className={errors.eventVenue ? 'border-red-500' : ''}
                    />
                    {errors.eventVenue && <p className="text-red-500 text-sm">{errors.eventVenue}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="mapLink">Link Google Maps</Label>
                    <Input
                      id="mapLink"
                      value={orderData.mapLink}
                      onChange={(e) => handleInputChange('mapLink', e.target.value)}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="backgroundSong">Lagu Background {orderData.designType === 'digital' && '(untuk undangan digital)'}</Label>
                    <Input
                      id="backgroundSong"
                      value={orderData.backgroundSong}
                      onChange={(e) => handleInputChange('backgroundSong', e.target.value)}
                      placeholder="Nama lagu dan penyanyi"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="prewedPhoto">Foto Prewedding (URL)</Label>
                    <Input
                      id="prewedPhoto"
                      value={orderData.prewedPhoto}
                      onChange={(e) => handleInputChange('prewedPhoto', e.target.value)}
                      placeholder="Link foto prewedding"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handlePreviewOrder}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                Preview & Pesan Sekarang
              </Button>
            </CardContent>
          </Card>

          {/* Design Preview */}
          {currentDesign && (
            <Card className="lg:sticky lg:top-4">
              <CardHeader>
                <CardTitle>Desain Terpilih</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ImageWithFallback
                    src={currentDesign.image}
                    alt={currentDesign.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{currentDesign.name}</h3>
                    <div className="flex gap-2 mb-2">
                      <Badge className="mb-2">{currentDesign.category}</Badge>
                      <Badge className={currentDesign.type === 'digital' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                        {currentDesign.type === 'digital' ? 'Digital' : 'Cetak'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{currentDesign.description}</p>
                    
                    {currentDesign.type === 'cetak' && orderData.quantity > 0 && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm">
                          <strong>Jumlah:</strong> {orderData.quantity} pcs
                        </p>
                        <p className="text-sm">
                          <strong>Harga dasar (50 pcs):</strong> Rp {currentDesign.price.toLocaleString('id-ID')}
                        </p>
                        {orderData.quantity > 50 && (
                          <p className="text-sm">
                            <strong>Tambahan:</strong> {orderData.quantity - 50} pcs
                          </p>
                        )}
                      </div>
                    )}
                    
                    <p className="font-bold text-purple-600 text-xl mt-2">
                      Total: Rp {calculateTotal().toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Preview Pesanan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {currentDesign && (
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={currentDesign.image}
                    alt={currentDesign.name}
                    className="w-24 h-32 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{currentDesign.name}</h3>
                    <div className="flex gap-2 mb-2">
                      <Badge className={currentDesign.type === 'digital' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                        {currentDesign.type === 'digital' ? 'Digital' : 'Cetak'}
                      </Badge>
                    </div>
                    <p className="text-purple-600 font-bold">
                      Total: Rp {calculateTotal().toLocaleString('id-ID')}
                    </p>
                    {currentDesign.type === 'cetak' && (
                      <p className="text-sm text-gray-600">Jumlah: {orderData.quantity} pcs</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Nama:</strong> {orderData.customerName}
                </div>
                <div>
                  <strong>WhatsApp:</strong> {orderData.whatsapp}
                </div>
                <div>
                  <strong>Email:</strong> {orderData.email}
                </div>
                <div>
                  <strong>Tanggal Acara:</strong> {orderData.eventDate}
                </div>
                {orderData.designType === 'cetak' && orderData.address && (
                  <div className="col-span-2">
                    <strong>Alamat Pengiriman:</strong> {orderData.address}
                  </div>
                )}
                <div className="col-span-2">
                  <strong>Orang Tua Mempelai Pria:</strong> {orderData.groomParents}
                </div>
                <div className="col-span-2">
                  <strong>Orang Tua Mempelai Wanita:</strong> {orderData.brideParents}
                </div>
                <div className="col-span-2">
                  <strong>Tempat Acara:</strong> {orderData.eventVenue}
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={handleBackToEdit} className="flex-1">
                  Perbaiki
                </Button>
                <Button onClick={handleConfirmOrder} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Pesan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Invoice Dialog */}
        <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Invoice Pembayaran</DialogTitle>
            </DialogHeader>
            <div className="text-center space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Total Pembayaran</h3>
                <p className="text-2xl font-bold text-purple-600">
                  Rp {calculateTotal().toLocaleString('id-ID')}
                </p>
                {currentDesign?.type === 'cetak' && (
                  <p className="text-sm text-gray-600">
                    {orderData.quantity} pcs undangan cetak
                  </p>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Scan QR Code untuk pembayaran:</p>
                <div className="w-32 h-32 bg-gray-300 mx-auto rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500">QR Code</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                Setelah pembayaran, data pesanan akan dikirim ke WhatsApp Anda dan diproses oleh admin.
                {currentDesign?.type === 'cetak' && ' Undangan cetak akan dikirim ke alamat yang telah ditentukan.'}
              </p>
              
              <Button 
                onClick={() => setShowInvoice(false)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Selesai
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}