import React, { useState } from 'react';
import { CreditCard, Search, Download, Filter, ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';

const allTransactions = [
  { id: 'TRX-1092', user: 'أحمد خالد', type: 'deposit', amount: 500.00, method: 'PayPal', date: '2024-06-09 14:30', status: 'completed' },
  { id: 'TRX-1091', user: 'سارة محمد', type: 'withdrawal', amount: 150.00, method: 'Bank Transfer', date: '2024-06-08 10:15', status: 'pending' },
  { id: 'TRX-1090', user: 'محمد علي', type: 'payment', amount: 75.00, method: 'Wallet Balance', date: '2024-06-07 16:45', status: 'completed' },
  { id: 'TRX-1089', user: 'ليلى حسن', type: 'refund', amount: 200.00, method: 'Credit Card', date: '2024-06-05 09:20', status: 'completed' },
  { id: 'TRX-1088', user: 'عمر سعيد', type: 'withdrawal', amount: 300.00, method: 'PayPal', date: '2024-06-01 11:10', status: 'failed' },
];

export function TransactionsPage() {
  const [search, setSearch] = useState('');

  const filteredTransactions = allTransactions.filter(trx => 
    trx.id.toLowerCase().includes(search.toLowerCase()) || 
    trx.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-gold-500" />
            المعاملات المالية
          </h1>
          <p className="text-gray-400 text-sm mt-1">سجل شامل لجميع المدفوعات والسحوبات في المنصة</p>
        </div>
        <div className="flex items-center gap-3 flex-row-reverse">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-gray-300 hover:bg-surface-hover transition-colors text-sm font-medium">
            <Download className="w-4 h-4 text-gray-400" />
            تصدير الكشف
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">إجمالي الإيداعات</p>
          <h3 className="text-xl font-bold text-green-500">+$24,500.00</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">إجمالي السحوبات</p>
          <h3 className="text-xl font-bold text-red-500">-$12,340.00</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">العمولات المحصلة</p>
          <h3 className="text-xl font-bold text-gold-500">$3,450.00</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">معاملات معلقة</p>
          <h3 className="text-xl font-bold text-yellow-500">8</h3>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4 items-center justify-between">
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث برقم المعاملة أو اسم المستخدم..." 
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
                <th className="px-6 py-4 font-medium">رقم المعاملة</th>
                <th className="px-6 py-4 font-medium">المستخدم</th>
                <th className="px-6 py-4 font-medium">النوع</th>
                <th className="px-6 py-4 font-medium">المبلغ</th>
                <th className="px-6 py-4 font-medium">وسيلة الدفع</th>
                <th className="px-6 py-4 font-medium">التاريخ</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.map((trx, i) => (
                <tr key={i} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-300">{trx.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{trx.user}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${
                      trx.type === 'deposit' ? 'text-green-500' :
                      trx.type === 'withdrawal' ? 'text-red-500' : 
                      trx.type === 'refund' ? 'text-blue-400' : 'text-gold-500'
                    }`}>
                      {trx.type === 'deposit' && <ArrowDownRight className="w-4 h-4" />}
                      {trx.type === 'withdrawal' && <ArrowUpRight className="w-4 h-4" />}
                      {trx.type === 'payment' && <CreditCard className="w-4 h-4" />}
                      {trx.type === 'refund' && <RefreshCcw className="w-4 h-4" />}
                      
                      {trx.type === 'deposit' ? 'إيداع' : 
                       trx.type === 'withdrawal' ? 'سحب' : 
                       trx.type === 'refund' ? 'استرجاع' : 'دفعة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">${trx.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-300 text-xs">{trx.method}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs font-mono">{trx.date}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      trx.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      trx.status === 'failed' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                      {trx.status === 'completed' ? 'مكتمل' : trx.status === 'failed' ? 'مرفوض' : 'معلق'}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 bg-[#0B0D10]/50">لا توجد معاملات تطابق بحثك</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
