import React, { useState } from 'react';
import { ClipboardList, Search, Filter, Download, Eye, CheckCircle2, Clock, XCircle, Plus, Loader2 } from 'lucide-react';
import { useGoogleSheets } from '../lib/googleSheets';

const initialOrders = [
  { id: '#ORD-9021', service: 'تصميم شعار وهوية بصرية', client: 'أحمد خالد', provider: 'عمر سعيد', price: 150.00, date: '2024-06-09', status: 'completed' },
  { id: '#ORD-9022', service: 'برمجة موقع تعريفي', client: 'سارة محمد', provider: 'ليلى حسن', price: 450.00, date: '2024-06-08', status: 'in_progress' },
  { id: '#ORD-9023', service: 'إدارة حملة إعلانية', client: 'محمد علي', provider: 'نور أحمد', price: 200.00, date: '2024-06-08', status: 'pending' },
  { id: '#ORD-9024', service: 'كتابة محتوى تسويقي', client: 'خالد إبراهيم', provider: 'سارة محمد', price: 75.00, date: '2024-06-07', status: 'cancelled' },
  { id: '#ORD-9025', service: 'تحسين محركات البحث SEO', client: 'ليلى حسن', provider: 'أحمد خالد', price: 300.00, date: '2024-06-06', status: 'completed' },
];

export function OrdersPage() {
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState(initialOrders);
  const [isCreating, setIsCreating] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { logToSheet } = useGoogleSheets();

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };
  
  const filteredOrders = orders.filter(order => 
    order.service.toLowerCase().includes(search.toLowerCase()) || 
    order.id.toLowerCase().includes(search.toLowerCase()) ||
    order.client.toLowerCase().includes(search.toLowerCase())
  );

  const handleNewOrder = () => {
    setIsCreating(true);
    setTimeout(async () => {
      const newOrder = {
        id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        service: 'خدمة جديدة مخصصة',
        client: 'عميل جديد',
        provider: 'قيد التعيين',
        price: 100.00,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };

      try {
        await logToSheet('Order', [
          newOrder.id,
          newOrder.service,
          newOrder.client,
          newOrder.provider,
          newOrder.price,
          newOrder.date,
          newOrder.status
        ]);
      } catch (err) {
        console.error('Error logging to sheet', err);
      }

      setOrders([newOrder, ...orders]);
      setIsCreating(false);
    }, 1000);
  };

  return (
    <div className="p-8 animate-in fade-in duration-500 relative">
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-surface border border-border text-white px-4 py-3 rounded-xl flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4 z-50">
          <CheckCircle2 className="w-5 h-5 text-gold-500" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-gold-500" />
            إدارة الطلبات
          </h1>
          <p className="text-gray-400 text-sm mt-1">متابعة جميع الطلبات والحالات الخاصة بها</p>
        </div>
        <div className="flex items-center gap-3 flex-row-reverse">
          <button 
            onClick={() => {
              handleNewOrder();
              showToast('تم إضافة طلب جديد');
            }}
            disabled={isCreating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500 text-black hover:bg-gold-400 transition-colors text-sm font-bold disabled:opacity-50"
          >
            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {isCreating ? 'جاري الإنشاء...' : 'طلب جديد'}
          </button>
          <button onClick={() => showToast('تم تطبيق التصفية')} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gold-500/50 text-gold-500 hover:bg-gold-500/10 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" />
            تصفية
          </button>
          <button onClick={() => showToast('جاري تصدير البيانات...')} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-gray-300 hover:bg-surface-hover transition-colors text-sm font-medium">
            <Download className="w-4 h-4 text-gray-400" />
            تصدير
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4">
          <div className="flex-1 max-w-sm relative">
            <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث برقم الطلب أو اسم الخدمة..." 
              className="w-full bg-[#0B0D10] border border-border rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-[#0B0D10]/50 text-gray-400 border-b border-border text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">رقم الطلب</th>
                <th className="px-6 py-4 font-medium">الخدمة</th>
                <th className="px-6 py-4 font-medium">العميل</th>
                <th className="px-6 py-4 font-medium">مقدم الخدمة</th>
                <th className="px-6 py-4 font-medium">السعر</th>
                <th className="px-6 py-4 font-medium">تاريخ الطلب</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order, i) => (
                <tr key={i} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-300">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{order.service}</td>
                  <td className="px-6 py-4 text-gray-300">{order.client}</td>
                  <td className="px-6 py-4 text-gray-300">{order.provider}</td>
                  <td className="px-6 py-4 font-medium text-gold-500">${order.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-400">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      order.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      order.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      order.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                      {order.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {order.status === 'cancelled' && <XCircle className="w-3.5 h-3.5" />}
                      {order.status === 'in_progress' && <Clock className="w-3.5 h-3.5" />}
                      {order.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                      
                      {order.status === 'completed' && 'مكتمل'}
                      {order.status === 'cancelled' && 'ملغي'}
                      {order.status === 'in_progress' && 'قيد التنفيذ'}
                      {order.status === 'pending' && 'بانتظار الموافقة'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => showToast('تم فتح تفاصيل الطلب')} className="p-1.5 text-gray-400 hover:text-white rounded border border-border bg-[#0B0D10] hover:bg-surface-hover transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 bg-[#0B0D10]/50">لا توجد طلبات تطابق بحثك</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
