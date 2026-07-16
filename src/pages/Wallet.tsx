import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Plus, CreditCard, Building2, History } from 'lucide-react';

const transactions = [
  { id: 'TRX-1092', type: 'deposit', amount: 500.00, method: 'PayPal', date: '2024-06-09 14:30', status: 'completed' },
  { id: 'TRX-1091', type: 'withdrawal', amount: 150.00, method: 'Bank Transfer', date: '2024-06-08 10:15', status: 'pending' },
  { id: 'TRX-1090', type: 'payment', amount: 75.00, method: 'Wallet Balance', date: '2024-06-07 16:45', status: 'completed' },
  { id: 'TRX-1089', type: 'deposit', amount: 200.00, method: 'Credit Card', date: '2024-06-05 09:20', status: 'completed' },
  { id: 'TRX-1088', type: 'withdrawal', amount: 300.00, method: 'PayPal', date: '2024-06-01 11:10', status: 'completed' },
];

export function WalletPage() {
  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Wallet className="w-8 h-8 text-gold-500" />
            المحفظة
          </h1>
          <p className="text-gray-400 text-sm mt-1">إدارة رصيدك والمعاملات المالية</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-gold-600 to-gold-400 rounded-2xl p-6 text-black shadow-lg shadow-gold-500/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
          <div className="relative z-10">
            <p className="text-black/80 font-medium mb-1">الرصيد المتاح</p>
            <h2 className="text-4xl font-bold mb-6">$12,450.00</h2>
            <div className="flex gap-3">
              <button className="flex-1 bg-black text-white py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-black/80 transition-colors">
                <Plus className="w-4 h-4" />
                إضافة رصيد
              </button>
              <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-black border border-black/10 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-colors">
                <ArrowUpRight className="w-4 h-4" />
                سحب الأرباح
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#0B0D10] border border-border text-green-500 flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">إجمالي المداخيل (هذا الشهر)</p>
              <h3 className="text-2xl font-bold text-white">$4,250.00</h3>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0B0D10] border border-border text-red-500 flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">إجمالي المصروفات (هذا الشهر)</p>
              <h3 className="text-2xl font-bold text-white">$1,120.00</h3>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">طرق الدفع المحفوظة</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-[#0B0D10]">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-white">•••• 4242</p>
                  <p className="text-xs text-gray-500">تنتهي في 12/25</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-[#0B0D10]">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-white">حساب بنكي</p>
                  <p className="text-xs text-gray-500">ينتهي بـ 8932</p>
                </div>
              </div>
            </div>
            <button className="w-full py-2.5 border border-dashed border-border rounded-lg text-gold-500 text-sm hover:border-gold-500/50 hover:bg-gold-500/5 transition-colors font-medium">
              + إضافة طريقة دفع
            </button>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-gold-500" />
            سجل المعاملات
          </h3>
          <button className="text-sm text-gold-500 hover:underline">عرض الكل</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-[#0B0D10]/50 text-gray-400 border-b border-border text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">رقم المعاملة</th>
                <th className="px-6 py-4 font-medium">النوع</th>
                <th className="px-6 py-4 font-medium">المبلغ</th>
                <th className="px-6 py-4 font-medium">الطريقة</th>
                <th className="px-6 py-4 font-medium">التاريخ</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((trx, i) => (
                <tr key={i} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-300">{trx.id}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${
                      trx.type === 'deposit' ? 'text-green-500' :
                      trx.type === 'withdrawal' ? 'text-red-500' : 'text-gold-500'
                    }`}>
                      {trx.type === 'deposit' && <ArrowDownRight className="w-4 h-4" />}
                      {trx.type === 'withdrawal' && <ArrowUpRight className="w-4 h-4" />}
                      {trx.type === 'payment' && <CreditCard className="w-4 h-4" />}
                      {trx.type === 'deposit' ? 'إيداع' : trx.type === 'withdrawal' ? 'سحب' : 'دفعة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">${trx.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-300">{trx.method}</td>
                  <td className="px-6 py-4 text-gray-400">{trx.date}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      trx.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                      {trx.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
