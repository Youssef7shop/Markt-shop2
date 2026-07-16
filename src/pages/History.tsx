import React, { useState } from 'react';
import { History, Search, Filter, User, Wallet, ClipboardList, Shield } from 'lucide-react';

const allActivities = [
  { id: 1, type: 'user', icon: User, text: 'قام أحمد خالد بتحديث ملفه الشخصي', date: '2024-06-09 14:30', user: 'أحمد خالد' },
  { id: 2, type: 'order', icon: ClipboardList, text: 'تم إنشاء طلب جديد للخدمة "تصميم شعار"', date: '2024-06-09 13:15', user: 'سارة محمد' },
  { id: 3, type: 'wallet', icon: Wallet, text: 'تمت عملية سحب أرباح بقيمة $150.00', date: '2024-06-08 10:45', user: 'ليلى حسن' },
  { id: 4, type: 'security', icon: Shield, text: 'محاولة تسجيل دخول فاشلة', date: '2024-06-08 08:20', user: 'غير معروف' },
  { id: 5, type: 'user', icon: User, text: 'تم تسجيل حساب جديد', date: '2024-06-07 20:10', user: 'عمر سعيد' },
];

export function HistoryPage() {
  const [search, setSearch] = useState('');

  const filteredActivities = allActivities.filter(activity => 
    activity.text.toLowerCase().includes(search.toLowerCase()) || 
    activity.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <History className="w-8 h-8 text-gold-500" />
            سجل النشاطات
          </h1>
          <p className="text-gray-400 text-sm mt-1">مراقبة وتتبع جميع الأنشطة على المنصة</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-gray-300 hover:bg-surface-hover transition-colors text-sm font-medium">
            <Filter className="w-4 h-4 text-gold-500" />
            تصفية
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex gap-4 mb-8">
          <div className="flex-1 max-w-sm relative">
            <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث في السجل..." 
              className="w-full bg-[#0B0D10] border border-border rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white"
            />
          </div>
        </div>

        <div className="relative border-r-2 border-border pr-6 space-y-8 my-4 mr-2">
          {filteredActivities.length === 0 && (
            <div className="text-center py-8 text-gray-500">لا توجد نشاطات تطابق بحثك</div>
          )}
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="relative">
              <span className="absolute -right-[35px] top-1 w-6 h-6 rounded-full bg-[#0B0D10] border-2 border-gold-500 flex items-center justify-center">
                <activity.icon className="w-3 h-3 text-gold-500" />
              </span>
              <div className="bg-[#0B0D10] border border-border rounded-xl p-4 hover:border-gold-500/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-white text-sm">{activity.text}</h4>
                  <span className="text-xs text-gray-500 font-mono" dir="ltr">{activity.date}</span>
                </div>
                <p className="text-xs text-gray-400">بواسطة: <span className="text-gold-500">{activity.user}</span></p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center border-t border-border pt-6">
          <button className="px-6 py-2 border border-gold-500/30 text-gold-500 rounded-lg text-sm hover:bg-gold-500/10 transition-colors">
            تحميل المزيد
          </button>
        </div>
      </div>
    </div>
  );
}
