import React from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  LayoutGrid, 
  CreditCard, 
  Wallet, 
  Ticket, 
  BarChart3, 
  Sparkles, 
  HeadphonesIcon, 
  Settings, 
  History,
  Bell
} from 'lucide-react';

const icons: Record<string, any> = {
  dashboard: LayoutDashboard,
  orders: ClipboardList,
  services: LayoutGrid,
  transactions: CreditCard,
  wallet: Wallet,
  coupons: Ticket,
  reports: BarChart3,
  ai: Sparkles,
  support: HeadphonesIcon,
  settings: Settings,
  history: History,
  notifications: Bell,
};

const labels: Record<string, string> = {
  dashboard: 'لوحة التحكم',
  orders: 'الطلبات',
  services: 'الخدمات',
  transactions: 'المعاملات المالية',
  wallet: 'المحفظة',
  coupons: 'الكوبونات',
  reports: 'التقارير',
  ai: 'الذكاء الاصطناعي',
  support: 'الدعم والمساعدة',
  settings: 'الإعدادات',
  history: 'سجل النشاطات',
  notifications: 'الإشعارات',
};

export function PlaceholderPage({ id }: { id: string }) {
  const Icon = icons[id] || LayoutDashboard;
  const label = labels[id] || 'الصفحة';

  return (
    <div className="p-8 flex flex-col items-center justify-center h-full text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-surface rounded-2xl border border-border flex items-center justify-center mb-6 shadow-lg shadow-black/50">
        <Icon className="w-12 h-12 text-gold-500" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">{label}</h1>
      <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
        هذه الصفحة قيد التطوير حالياً. سيتم إضافة الميزات والإحصائيات الخاصة بـ <span className="text-gold-500 font-medium">"{label}"</span> قريباً.
      </p>
    </div>
  );
}
