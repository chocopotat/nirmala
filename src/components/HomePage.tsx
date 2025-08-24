import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useApp, mockDesigns } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HomePage() {
  const { setCurrentPage, setSelectedDesign, setOrderData, orderData } = useApp();

  const handleOrderNow = (design: any) => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          {/* Mascot/Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-20 scale-110"></div>
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1700267642917-0df52f004f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbiUyMGVsZWdhbnQlMjBsb2dvJTIwbWFzY290fGVufDF8fHx8MTc1NjAzNDUwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Nirmala Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse delay-1000"></div>
              
              {/* Floating hearts */}
              <div className="absolute -top-4 left-8 text-pink-400 animate-bounce">
                <span className="text-2xl">💕</span>
              </div>
              <div className="absolute -bottom-4 right-8 text-purple-400 animate-bounce delay-500">
                <span className="text-2xl">💝</span>
              </div>
            </div>
          </div>

          {/* Brand Name */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                NIRMALA
              </h2>
              <div className="w-8 h-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-500 uppercase tracking-widest">Wedding Invitation Specialist</p>
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Undangan Digital & Cetak
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ciptakan undangan pernikahan yang memorable dengan desain terbaik dari Nirmala
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setCurrentPage('preset')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Lihat Desain
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setCurrentPage('order')}
              className="border-purple-300 text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Pesan Sekarang
            </Button>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 opacity-10">
          <div className="w-20 h-20 border-2 border-purple-300 rounded-full"></div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <div className="w-16 h-16 border-2 border-pink-300 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-5 opacity-10">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full"></div>
        </div>
        <div className="absolute top-1/4 right-5 opacity-10">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Nirmala?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Desain Profesional</h3>
              <p className="text-gray-600">Desain eksklusif dan menarik yang dibuat oleh tim profesional</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proses Cepat</h3>
              <p className="text-gray-600">Proses pemesanan mudah dan pengerjaan yang cepat</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kualitas Premium</h3>
              <p className="text-gray-600">Kualitas cetak terbaik dengan bahan premium untuk undangan cetak</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Jenis Layanan Kami</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💻</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Undangan Digital</h3>
                  <Badge className="bg-blue-100 text-blue-800 mb-4">Interactive</Badge>
                  <ul className="text-left space-y-2 text-gray-600 mb-6">
                    <li>✓ Animasi dan musik background</li>
                    <li>✓ Countdown timer acara</li>
                    <li>✓ Gallery foto prewedding</li>
                    <li>✓ Integrasi Google Maps</li>
                    <li>✓ Share mudah via link</li>
                    <li>✓ RSVP online</li>
                  </ul>
                  <p className="font-semibold text-blue-600">Mulai dari Rp 150.000</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🖨️</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Undangan Cetak</h3>
                  <Badge className="bg-green-100 text-green-800 mb-4">Premium Print</Badge>
                  <ul className="text-left space-y-2 text-gray-600 mb-6">
                    <li>✓ Kertas berkualitas tinggi</li>
                    <li>✓ Finishing mewah (emboss, foil)</li>
                    <li>✓ Berbagai ukuran tersedia</li>
                    <li>✓ Packaging eksklusif</li>
                    <li>✓ Gratis pengiriman Jakarta</li>
                    <li>✓ Minimal order 50 pcs</li>
                  </ul>
                  <p className="font-semibold text-green-600">Mulai dari Rp 100.000 / 50 pcs</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Carousel */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Koleksi Desain Terbaru</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDesigns.slice(0, 6).map((design) => (
              <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={design.image}
                    alt={design.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Badge className="bg-white text-gray-800 text-xs">
                      {design.category}
                    </Badge>
                    <Badge className={`text-xs ${
                      design.type === 'digital' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {design.type === 'digital' ? 'Digital' : 'Cetak'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{design.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{design.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-purple-600">
                        Rp {design.price.toLocaleString('id-ID')}
                      </span>
                      {design.type === 'cetak' && (
                        <span className="text-xs text-gray-500 block">/ 50 pcs</span>
                      )}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleOrderNow(design)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Pesan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => setCurrentPage('preset')}
              variant="outline"
              size="lg"
            >
              Lihat Semua Desain
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Membuat Undangan Impian Anda?</h2>
          <p className="text-xl mb-8 opacity-90">
            Pilih undangan digital yang interaktif atau undangan cetak yang mewah
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setCurrentPage('preset')}
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Lihat Koleksi
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setCurrentPage('order')}
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}