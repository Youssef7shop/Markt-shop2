import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
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
  Inbox as InboxIcon
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
  { id: 'users', icon: Users, label: 'المستخدمين' },
  { id: 'orders', icon: ClipboardList, label: 'الطلبات' },
  { id: 'services', icon: LayoutGrid, label: 'الخدمات' },
  { id: 'transactions', icon: CreditCard, label: 'المعاملات المالية' },
  { id: 'wallet', icon: Wallet, label: 'المحفظة' },
  { id: 'coupons', icon: Ticket, label: 'الكوبونات' },
  { id: 'reports', icon: BarChart3, label: 'التقارير' },
  { id: 'ai', icon: Sparkles, label: 'الذكاء الاصطناعي' },
  { id: 'inbox', icon: InboxIcon, label: 'صندوق البريد', badge: '4' },
  { id: 'support', icon: HeadphonesIcon, label: 'الدعم والمساعدة', badge: '3' },
  { id: 'settings', icon: Settings, label: 'الإعدادات' },
  { id: 'history', icon: History, label: 'سجل النشاطات' },
];

export function Sidebar({ activePage, onPageChange }: { activePage: string; onPageChange: (id: string) => void }) {
  return (
    <aside className="w-64 bg-surface h-screen fixed top-0 right-0 border-l border-border flex flex-col z-20 overflow-y-auto">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center text-black font-bold text-xl">
            B
          </div>
          <span className="text-xl font-bold tracking-wide">
            Boostify <span className="text-gold-500 text-xs align-top bg-gold-500/10 px-1.5 py-0.5 rounded ml-1">AI</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activePage === item.id 
                ? 'bg-[#0B0D10] text-gold-500 border border-gold-500/50' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-hover'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
            {item.badge && (
              <span className="mr-auto bg-gold-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Support Box */}
      <div className="p-4 mt-auto">
        <div className="bg-surface-hover rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
              <HeadphonesIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-gold-500">تحتاج مساعدة؟</p>
              <p className="text-xs text-gray-400">فريق الدعم متاح لمساعدتك</p>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 mb-4">24/7</div>
          <button className="w-full py-2.5 rounded-lg border border-gold-500/30 text-gold-500 hover:bg-gold-500 hover:text-black transition-colors text-sm font-bold">
            تواصل مع الدعم
          </button>
        </div>
      </div>
    </aside>
  );
}
