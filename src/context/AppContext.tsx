import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface InvitationDesign {
  id: string;
  name: string;
  category: string;
  type: 'digital' | 'cetak';
  price: number;
  image: string;
  previewUrl: string;
  digitalPreviewUrl?: string;
  description: string;
}

export interface OrderData {
  customerName: string;
  whatsapp: string;
  email: string;
  designId: string;
  designType: 'digital' | 'cetak';
  quantity: number;
  address: string;
  groomParents: string;
  brideParents: string;
  backgroundSong: string;
  prewedPhoto: string;
  eventDate: string;
  eventVenue: string;
  mapLink: string;
}

interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedDesign: InvitationDesign | null;
  setSelectedDesign: (design: InvitationDesign | null) => void;
  orderData: OrderData;
  setOrderData: (data: OrderData) => void;
  orders: (OrderData & { id: string; status: string; orderDate: string })[];
  addOrder: (order: OrderData) => void;
  isDashboardLoggedIn: boolean;
  setIsDashboardLoggedIn: (status: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const mockDesigns: InvitationDesign[] = [
  {
    id: '1',
    name: 'Elegant Rose Digital',
    category: 'Premium',
    type: 'digital',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=600&fit=crop',
    previewUrl: '#',
    digitalPreviewUrl: 'https://example-wedding-invitation.netlify.app/',
    description: 'Undangan digital elegant dengan motif mawar dan animasi menarik'
  },
  {
    id: '2',
    name: 'Modern Minimalist Print',
    category: 'Standard',
    type: 'cetak',
    price: 100000,
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=600&fit=crop',
    previewUrl: '#',
    description: 'Undangan cetak minimalis modern dengan kualitas kertas premium'
  },
  {
    id: '3',
    name: 'Vintage Classic Digital',
    category: 'Premium',
    type: 'digital',
    price: 175000,
    image: 'https://images.unsplash.com/photo-1606216794119-3f716bdfed8f?w=400&h=600&fit=crop',
    previewUrl: '#',
    digitalPreviewUrl: 'https://vintage-wedding-card.netlify.app/',
    description: 'Undangan digital vintage klasik dengan musik background dan efek parallax'
  },
  {
    id: '4',
    name: 'Floral Garden Print',
    category: 'Standard',
    type: 'cetak',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1606800052085-b8d973fa3fad?w=400&h=600&fit=crop',
    previewUrl: '#',
    description: 'Undangan cetak dengan motif bunga taman yang segar dan elegan'
  },
  {
    id: '5',
    name: 'Royal Wedding Digital',
    category: 'Premium',
    type: 'digital',
    price: 200000,
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=600&fit=crop',
    previewUrl: '#',
    digitalPreviewUrl: 'https://royal-wedding-invite.netlify.app/',
    description: 'Undangan digital mewah dengan animasi royal dan countdown timer'
  },
  {
    id: '6',
    name: 'Traditional Batik Print',
    category: 'Premium',
    type: 'cetak',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    previewUrl: '#',
    description: 'Undangan cetak dengan motif batik tradisional Indonesia yang ekslusif'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDesign, setSelectedDesign] = useState<InvitationDesign | null>(null);
  const [orderData, setOrderData] = useState<OrderData>({
    customerName: '',
    whatsapp: '',
    email: '',
    designId: '',
    designType: 'digital',
    quantity: 1,
    address: '',
    groomParents: '',
    brideParents: '',
    backgroundSong: '',
    prewedPhoto: '',
    eventDate: '',
    eventVenue: '',
    mapLink: ''
  });
  const [orders, setOrders] = useState<(OrderData & { id: string; status: string; orderDate: string })[]>([]);
  const [isDashboardLoggedIn, setIsDashboardLoggedIn] = useState(false);

  const addOrder = (order: OrderData) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0]
    };
    setOrders(prev => [...prev, newOrder]);
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      selectedDesign,
      setSelectedDesign,
      orderData,
      setOrderData,
      orders,
      addOrder,
      isDashboardLoggedIn,
      setIsDashboardLoggedIn
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}