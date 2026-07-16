import React, { useState } from 'react';
import { Ticket, Plus, Search, Filter, Copy, CheckCircle2, Clock, Check } from 'lucide-react';

const allCoupons = [
  { code: 'BOOST2024', discount: '20%', usage: '145 / 500', status: 'active', expiry: '2024-12-31' },
  { code: 'NEWUSER50', discount: '$50', usage: '32 / 100', status: 'active', expiry: '2024-07-01' },
  { code: 'SUMMER', discount: '15%', usage: '500 / 500', status: 'expired', expiry: '2024-06-01' },
  { code: 'VIPCLIENT', discount: '30%', usage: '5 / 10', status: 'active', expiry: '2025-01-01' },
];

export function CouponsPage() {
  const [search, setSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredCoupons = allCoupons.filter(coupon => 
    coupon.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Ticket className="w-8 h-8 text-gold-500" />
            إدارة الكوبونات
          </h1>
          <p className="text-gray-400 text-sm mt-1">إنشاء وإدارة كوبونات الخصم والعروض الترويجية</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500 text-black hover:bg-gold-400 transition-colors text-sm font-bold">
          <Plus className="w-4 h-4" />
          إنشاء كوبون جديد
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4 items-center justify-between">
          <div className="flex-1 max-w-sm relative">
            <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث عن كوبون..." 
              className="w-full bg-[#0B0D10] border border-border rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-gray-300 hover:bg-surface-hover transition-colors text-sm font-medium bg-[#0B0D10]">
            <Filter className="w-4 h-4" />
            تصفية
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-[#0B0D10]/50 text-gray-400 border-b border-border text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">كود الخصم</th>
                <th className="px-6 py-4 font-medium">قيمة الخصم</th>
                <th className="px-6 py-4 font-medium">الاستخدام</th>
                <th className="px-6 py-4 font-medium">تاريخ الانتهاء</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCoupons.map((coupon, i) => (
                <tr key={i} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2 bg-[#0B0D10] border border-border px-3 py-1.5 rounded-lg">
                      <span className="font-mono text-gold-500 font-bold">{coupon.code}</span>
                      <button onClick={() => handleCopy(coupon.code)} className="text-gray-500 hover:text-white transition-colors" title="نسخ الكود">
                        {copiedCode === coupon.code ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-white text-lg">{coupon.discount}</td>
                  <td className="px-6 py-4 text-gray-300 font-mono text-xs">{coupon.usage}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{coupon.expiry}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      coupon.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      'bg-gray-500/10 text-gray-500 border-gray-500/20'
                    }`}>
                      {coupon.status === 'active' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {coupon.status === 'active' ? 'نشط' : 'منتهي'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gold-500 hover:underline text-sm font-medium">تعديل</button>
                  </td>
                </tr>
              ))}
              {filteredCoupons.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 bg-[#0B0D10]/50">لا توجد كوبونات تطابق بحثك</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
