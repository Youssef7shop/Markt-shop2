import React, { useState, useEffect } from 'react';
import { Search, Plus, Bell, MessageSquare, Moon, Sun, CheckCircle2, ChevronDown } from 'lucide-react';
import { useRole, UserRole } from '../lib/roleContext';

export function Header({ onPageChange }: { onPageChange: (id: string) => void }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [search, setSearch] = useState('');
  const [showToast, setShowToast] = useState<{show: boolean, message: string}>({ show: false, message: '' });
  const [showRoleSelect, setShowRoleSelect] = useState(false);
  const { role, setRole } = useRole();

  const roleLabels: Record<UserRole, string> = {
    admin: 'مدير النظام',
    client: 'عميل',
    guest: 'زائر'
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    showNotificationToast(isDarkMode ? "المظهر الفاتح قيد التطوير حالياً" : "تم تفعيل المظهر الداكن");
  };

  const handleNewOrder = () => {
    onPageChange('orders');
    showNotificationToast("تم فتح صفحة الطلبات!");
  };

  const showNotificationToast = (message: string) => {
    setShowToast({ show: true, message });
    setTimeout(() => setShowToast({ show: false, message: '' }), 3000);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      showNotificationToast(`جاري البحث عن: ${search}`);
      setSearch('');
    }
  };

  return (
    <header className="h-20 bg-surface border-b border-border flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-gray-500 absolute right-4" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="البحث عن مستخدم أو طلب..." 
            className="w-full bg-[#0B0D10] border border-border rounded-xl pr-12 pl-16 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-gray-300 placeholder-gray-600"
          />
          <div className="absolute left-3 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-xs font-sans text-gray-500 bg-surface rounded border border-border">
              ⌘
            </kbd>
            <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-xs font-sans text-gray-500 bg-surface rounded border border-border">
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-6 mr-8">
        <button 
          onClick={handleNewOrder}
          className="hidden md:flex items-center gap-2 bg-[#0B0D10] text-gold-500 border border-gold-500/50 hover:bg-gold-500/10 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors relative"
        >
          <Plus className="w-4 h-4" />
          <span>طلب جديد</span>
        </button>

        {/* Toast Notification */}
        {showToast.show && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-surface border border-border text-white px-4 py-3 rounded-xl flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4 z-50">
            <CheckCircle2 className="w-5 h-5 text-gold-500" />
            <span className="text-sm font-bold">{showToast.message}</span>
          </div>
        )}

        <div className="flex items-center gap-4 border-r border-border pr-6 relative">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); }}
              className="relative text-gray-400 hover:text-white transition-colors"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-black text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-surface">7</span>
            </button>
            
            {showNotifications && (
              <div className="absolute top-10 left-0 w-80 bg-surface border border-border rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-border bg-[#0B0D10]/50">
                  <h3 className="font-bold text-white text-sm">الإشعارات</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border-b border-border hover:bg-surface-hover/50 transition-colors cursor-pointer text-right">
                      <p className="text-sm text-gray-300 mb-1">تم تحديث حالة الطلب #ORD-902{i}</p>
                      <span className="text-xs text-gray-500">منذ {i * 10} دقيقة</span>
                    </div>
                  ))}
                </div>
                <div 
                  onClick={() => {
                    onPageChange('notifications');
                    setShowNotifications(false);
                  }}
                  className="p-3 text-center border-t border-border hover:bg-surface-hover transition-colors cursor-pointer"
                >
                  <span className="text-sm text-gold-500">عرض الكل</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Messages */}
          <div className="relative">
            <button 
              onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); }}
              className="relative text-gray-400 hover:text-white transition-colors"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-black text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-surface">4</span>
            </button>
            
            {showMessages && (
              <div className="absolute top-10 left-0 w-80 bg-surface border border-border rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-border bg-[#0B0D10]/50">
                  <h3 className="font-bold text-white text-sm">الرسائل</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border-b border-border hover:bg-surface-hover/50 transition-colors cursor-pointer flex gap-3 text-right">
                      <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="avatar" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="text-sm font-bold text-white mb-0.5">مستخدم {i}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">هل يمكنني الاستفسار عن خدمتي؟</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div 
                  onClick={() => {
                    onPageChange('inbox');
                    setShowMessages(false);
                  }}
                  className="p-3 text-center border-t border-border hover:bg-surface-hover transition-colors cursor-pointer"
                >
                  <span className="text-sm text-gold-500">فتح صندوق البريد</span>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={toggleTheme}
            className="text-gray-400 hover:text-white transition-colors"
            title="تبديل المظهر"
          >
            {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6 text-gold-500" />}
          </button>
        </div>

        <div className="relative">
          <div 
            onClick={() => setShowRoleSelect(!showRoleSelect)}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" 
              alt="User avatar" 
              className="w-10 h-10 rounded-xl border border-border object-cover"
            />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">أحمد خالد</p>
              <p className="text-xs text-gold-500 flex items-center gap-1 justify-end">
                {roleLabels[role]}
                <ChevronDown className="w-3 h-3 ml-1" />
                <span className="w-2 h-2 rounded-full bg-gold-500 block"></span>
              </p>
            </div>
          </div>
          {showRoleSelect && (
            <div className="absolute top-14 right-0 w-48 bg-surface border border-border rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-2">
                {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setShowRoleSelect(false);
                      showNotificationToast(`تم تغيير الدور إلى ${roleLabels[r]}`);
                    }}
                    className={`w-full text-right px-4 py-2 text-sm rounded-lg transition-colors ${
                      role === r ? 'bg-gold-500/10 text-gold-500 font-bold' : 'text-gray-300 hover:bg-surface-hover'
                    }`}
                  >
                    {roleLabels[r]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
