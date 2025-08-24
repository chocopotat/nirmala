import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useApp, mockDesigns } from '../context/AppContext';

export function DashboardLogin() {
  const { setCurrentPage, setIsDashboardLoggedIn } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'nirmala admin' && password === 'nirmala') {
      setIsDashboardLoggedIn(true);
      setCurrentPage('dashboard');
      setError('');
    } else {
      setError('Username atau password salah');
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🏢</span>
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dashboard Login
          </CardTitle>
          <p className="text-gray-600 text-sm">Akses khusus untuk admin</p>
          
          {/* Keyboard Shortcut Info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-xs text-blue-700 space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <span className="bg-blue-100 px-2 py-1 rounded text-xs font-mono">Ctrl+Shift+A</span>
                <span>→ Akses Dashboard</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="bg-blue-100 px-2 py-1 rounded text-xs font-mono">Ctrl+Shift+H</span>
                <span>→ Kembali ke Home</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nirmala admin"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="nirmala"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <div className="space-y-2">
            <Button 
              onClick={handleLogin}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Login Dashboard
            </Button>
            <Button 
              onClick={handleBackToHome}
              variant="outline"
              className="w-full"
            >
              Kembali ke Website
            </Button>
          </div>
          
          {/* Alternative Access Info */}
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-gray-500">
              Atau gunakan <span className="font-mono bg-gray-100 px-1 rounded">Ctrl+Shift+H</span> untuk kembali
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Dashboard() {
  const { orders, setCurrentPage, setIsDashboardLoggedIn } = useApp();

  const getDesignInfo = (designId: string) => {
    return mockDesigns.find(d => d.id === designId);
  };

  const calculateOrderTotal = (order: any) => {
    const design = getDesignInfo(order.designId);
    if (!design) return 0;
    
    if (design.type === 'digital') {
      return design.price;
    } else {
      // For print invitations, calculate based on quantity
      const basePrice = design.price; // Price for 50 pcs
      const additionalQuantity = Math.max(0, order.quantity - 50);
      const additionalPrice = Math.ceil(additionalQuantity / 50) * basePrice;
      return basePrice + additionalPrice;
    }
  };

  const handleLogout = () => {
    setIsDashboardLoggedIn(false);
    setCurrentPage('dashboard-login');
  };

  const handleBackToWebsite = () => {
    setIsDashboardLoggedIn(false);
    setCurrentPage('home');
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    digitalOrders: orders.filter(o => o.designType === 'digital').length,
    printOrders: orders.filter(o => o.designType === 'cetak').length,
    totalRevenue: orders.reduce((total, order) => total + calculateOrderTotal(order), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🏢</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nirmala Dashboard
                </h1>
                <p className="text-sm text-gray-500">Admin Panel</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Keyboard Shortcut Reminder */}
              <div className="hidden md:flex items-center space-x-3 text-xs text-gray-500 mr-4">
                <div className="flex items-center space-x-1">
                  <span className="bg-gray-100 px-2 py-1 rounded font-mono">Ctrl+Shift+H</span>
                  <span>Home</span>
                </div>
              </div>
              
              <Button 
                onClick={handleBackToWebsite}
                variant="outline"
                size="sm"
              >
                Lihat Website
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
              <p className="text-gray-600">Kelola dan monitor pesanan undangan</p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <span>⌨️</span>
                  <span>Keyboard shortcuts aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <span className="text-xl">📋</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Pesanan</p>
                  <p className="text-xl font-bold">{stats.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                  <span className="text-xl">⏳</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Menunggu</p>
                  <p className="text-xl font-bold">{stats.pendingOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <span className="text-xl">✅</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Selesai</p>
                  <p className="text-xl font-bold">{stats.completedOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <span className="text-xl">💻</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Digital</p>
                  <p className="text-xl font-bold">{stats.digitalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <span className="text-xl">🖨️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Cetak</p>
                  <p className="text-xl font-bold">{stats.printOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Revenue</p>
                  <p className="text-lg font-bold">Rp {(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Data Pesanan Customer</span>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                {orders.length} Total Orders
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gray-400">📝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Pesanan</h3>
                <p className="text-gray-500 mb-4">Pesanan customer akan muncul di sini</p>
                <div className="inline-flex items-center space-x-2 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg">
                  <span>💡</span>
                  <span>Gunakan <span className="font-mono bg-white px-1 rounded">Ctrl+Shift+H</span> untuk kembali ke website</span>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Desain</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Acara</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tanggal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => {
                      const design = getDesignInfo(order.designId);
                      const total = calculateOrderTotal(order);
                      
                      return (
                        <TableRow key={order.id} className="hover:bg-gray-50">
                          <TableCell className="font-mono text-sm">#{order.id}</TableCell>
                          <TableCell className="font-medium">{order.customerName}</TableCell>
                          <TableCell>{order.whatsapp}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {design?.name || `Design ${order.designId}`}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={order.designType === 'digital' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                            >
                              {order.designType === 'digital' ? 'Digital' : 'Cetak'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {order.designType === 'cetak' ? `${order.quantity} pcs` : '1 link'}
                          </TableCell>
                          <TableCell className="font-semibold">
                            Rp {total.toLocaleString('id-ID')}
                          </TableCell>
                          <TableCell>{order.eventDate}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={order.status === 'pending' ? 'secondary' : 'default'}
                              className={order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                            >
                              {order.status === 'pending' ? 'Pending' : 'Complete'}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.orderDate}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details */}
        {orders.length > 0 && (
          <Card className="mt-6 shadow-sm">
            <CardHeader>
              <CardTitle>Detail Pesanan Lengkap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orders.map((order, index) => {
                  const design = getDesignInfo(order.designId);
                  const total = calculateOrderTotal(order);
                  
                  return (
                    <div key={order.id} className="border rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">Order #{order.id}</h4>
                          <div className="flex gap-2 mt-2">
                            <Badge className={order.designType === 'digital' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                              {order.designType === 'digital' ? 'Digital' : 'Cetak'}
                            </Badge>
                            <Badge variant="outline">
                              {design?.name || `Design ${order.designId}`}
                            </Badge>
                            <Badge 
                              variant={order.status === 'pending' ? 'secondary' : 'default'}
                              className={order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                            >
                              {order.status === 'pending' ? 'Pending' : 'Complete'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-purple-600">
                            Rp {total.toLocaleString('id-ID')}
                          </p>
                          {order.designType === 'cetak' && (
                            <p className="text-sm text-gray-600">{order.quantity} pcs</p>
                          )}
                          <p className="text-sm text-gray-500">Order: {order.orderDate}</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-600">📞 Data Customer</h5>
                          <div className="space-y-2 text-sm bg-white p-4 rounded-lg">
                            <p><strong>Nama:</strong> {order.customerName}</p>
                            <p><strong>WhatsApp:</strong> {order.whatsapp}</p>
                            <p><strong>Email:</strong> {order.email}</p>
                            {order.designType === 'cetak' && order.address && (
                              <p><strong>Alamat Pengiriman:</strong> {order.address}</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-pink-600">💒 Detail Acara</h5>
                          <div className="space-y-2 text-sm bg-white p-4 rounded-lg">
                            <p><strong>Orang Tua Pria:</strong> {order.groomParents}</p>
                            <p><strong>Orang Tua Wanita:</strong> {order.brideParents}</p>
                            <p><strong>Tanggal Acara:</strong> {order.eventDate}</p>
                            <p><strong>Tempat:</strong> {order.eventVenue}</p>
                            {order.mapLink && (
                              <p><strong>Google Maps:</strong> 
                                <a href={order.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                  Lihat Lokasi
                                </a>
                              </p>
                            )}
                            {order.backgroundSong && <p><strong>Lagu Background:</strong> {order.backgroundSong}</p>}
                            {order.prewedPhoto && (
                              <p><strong>Foto Prewedding:</strong> 
                                <a href={order.prewedPhoto} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                  Lihat Foto
                                </a>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}