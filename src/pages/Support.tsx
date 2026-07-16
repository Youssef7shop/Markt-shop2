import React, { useState } from 'react';
import { HeadphonesIcon, MessageCircle, FileText, Search, Plus, PhoneCall } from 'lucide-react';

const allTickets = [
  { id: '#TKT-5021', subject: 'مشكلة في سحب الرصيد', user: 'محمد علي', status: 'open', priority: 'high', date: 'منذ ساعتين' },
  { id: '#TKT-5020', subject: 'استفسار عن تفعيل الحساب', user: 'نور أحمد', status: 'in_progress', priority: 'medium', date: 'منذ 5 ساعات' },
  { id: '#TKT-5019', subject: 'طلب تعديل خدمة', user: 'سارة محمد', status: 'closed', priority: 'low', date: 'أمس' },
];

export function SupportPage() {
  const [search, setSearch] = useState('');

  const filteredTickets = allTickets.filter(ticket => 
    ticket.id.toLowerCase().includes(search.toLowerCase()) || 
    ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
    ticket.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <HeadphonesIcon className="w-8 h-8 text-gold-500" />
            الدعم والمساعدة
          </h1>
          <p className="text-gray-400 text-sm mt-1">إدارة تذاكر الدعم الفني واستفسارات المستخدمين</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500/10 border border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-black transition-colors text-sm font-bold">
          <Plus className="w-4 h-4" />
          تذكرة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gold-500/10 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white mb-2">تذاكر مفتوحة</h3>
          <p className="text-3xl font-bold text-gold-500">24</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white mb-2">قيد المعالجة</h3>
          <p className="text-3xl font-bold text-blue-500">12</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white mb-2">تذاكر مغلقة (اليوم)</h3>
          <p className="text-3xl font-bold text-green-500">45</p>
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
              placeholder="البحث برقم التذكرة أو الموضوع..." 
              className="w-full bg-[#0B0D10] border border-border rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-[#0B0D10]/50 text-gray-400 border-b border-border text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">رقم التذكرة</th>
                <th className="px-6 py-4 font-medium">الموضوع</th>
                <th className="px-6 py-4 font-medium">المستخدم</th>
                <th className="px-6 py-4 font-medium">الأولوية</th>
                <th className="px-6 py-4 font-medium">الوقت</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTickets.map((ticket, i) => (
                <tr key={i} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-300">{ticket.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{ticket.subject}</td>
                  <td className="px-6 py-4 text-gray-300">{ticket.user}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-md ${
                      ticket.priority === 'high' ? 'bg-red-500/10 text-red-500' :
                      ticket.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {ticket.priority === 'high' ? 'عالية' : ticket.priority === 'medium' ? 'متوسطة' : 'عادية'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{ticket.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium ${
                      ticket.status === 'open' ? 'text-green-500' :
                      ticket.status === 'in_progress' ? 'text-yellow-500' :
                      'text-gray-500'
                    }`}>
                      {ticket.status === 'open' ? 'مفتوحة' : ticket.status === 'in_progress' ? 'قيد المعالجة' : 'مغلقة'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gold-500 hover:underline text-sm font-medium">عرض التفاصيل</button>
                  </td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 bg-[#0B0D10]/50">لا توجد تذاكر تطابق بحثك</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
