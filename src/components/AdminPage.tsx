import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useApp, mockDesigns } from '../context/AppContext';

export function AdminLogin() {
  const { setIsAdminLoggedIn } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'nirmala admin' && password === 'nirmala') {
      setIsAdminLoggedIn(true);
      setError('');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nirmala admin"
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
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <Button 
            onClick={handleLogin}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminDashboard() {
  const { orders } = useApp();

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

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    digitalOrders: orders.filter(o => o.designType === 'digital').length,
    printOrders: orders.filter(o => o.designType === 'cetak').length,
    totalRevenue: orders.reduce((total, order) => total + calculateOrderTotal(order), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Kelola pesanan undangan Nirmala</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card>
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

          <Card>
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

          <Card>
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

          <Card>
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

          <Card>
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

          <Card>
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
        <Card>
          <CardHeader>
            <CardTitle>Data Pemesanan</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Belum ada pesanan masuk
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Desain</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Tanggal Acara</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tgl Pesan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => {
                      const design = getDesignInfo(order.designId);
                      const total = calculateOrderTotal(order);
                      
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">{order.id}</TableCell>
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
                              {order.status === 'pending' ? 'Menunggu' : 'Selesai'}
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
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Detail Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.map((order) => {
                const design = getDesignInfo(order.designId);
                const total = calculateOrderTotal(order);
                
                return (
                  <div key={order.id} className="border rounded-lg p-4 mb-4 last:mb-0">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold">Order #{order.id}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge className={order.designType === 'digital' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                            {order.designType === 'digital' ? 'Digital' : 'Cetak'}
                          </Badge>
                          <Badge variant="outline">
                            {design?.name || `Design ${order.designId}`}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-purple-600">
                          Rp {total.toLocaleString('id-ID')}
                        </p>
                        {order.designType === 'cetak' && (
                          <p className="text-sm text-gray-600">{order.quantity} pcs</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Informasi Customer</h5>
                        <div className="space-y-1 text-sm">
                          <p><strong>Nama:</strong> {order.customerName}</p>
                          <p><strong>WhatsApp:</strong> {order.whatsapp}</p>
                          <p><strong>Email:</strong> {order.email}</p>
                          {order.designType === 'cetak' && order.address && (
                            <p><strong>Alamat:</strong> {order.address}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Detail Acara</h5>
                        <div className="space-y-1 text-sm">
                          <p><strong>Orang Tua Pria:</strong> {order.groomParents}</p>
                          <p><strong>Orang Tua Wanita:</strong> {order.brideParents}</p>
                          <p><strong>Tanggal Acara:</strong> {order.eventDate}</p>
                          <p><strong>Tempat:</strong> {order.eventVenue}</p>
                          {order.mapLink && <p><strong>Maps:</strong> <a href={order.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat Lokasi</a></p>}
                          {order.backgroundSong && <p><strong>Lagu:</strong> {order.backgroundSong}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}