import React from 'react';
import { 
  BarChart3, TrendingUp, Users, CreditCard, LayoutGrid, 
  ArrowUpRight, ArrowDownRight, Clock 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'يناير', revenue: 4000, orders: 240 },
  { name: 'فبراير', revenue: 3000, orders: 139 },
  { name: 'مارس', revenue: 5000, orders: 380 },
  { name: 'أبريل', revenue: 2780, orders: 190 },
  { name: 'مايو', revenue: 6890, orders: 480 },
  { name: 'يونيو', revenue: 8390, orders: 520 },
];

const recentActivities = [
  { user: 'أحمد خالد', action: 'قام بشراء خدمة', target: 'تصميم شعار احترافي', time: 'منذ 10 دقائق', type: 'order' },
  { user: 'سارة محمد', action: 'سجلت حساب جديد كـ', target: 'مقدم خدمة', time: 'منذ ساعة', type: 'user' },
  { user: 'محمد علي', action: 'أضاف رصيد بقيمة', target: '$50.00', time: 'منذ ساعتين', type: 'wallet' },
  { user: 'ليلى حسن', action: 'سلمت طلب', target: 'برمجة تطبيق موبايل', time: 'منذ 3 ساعات', type: 'order' },
];

export function DashboardPage() {
  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-gold-500" />
          لوحة التحكم
        </h1>
        <p className="text-gray-400 text-sm mt-1">نظرة عامة على أداء المنصة والإحصائيات الرئيسية</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'إجمالي الأرباح', value: '$45,231.89', trend: '+20.1%', icon: TrendingUp, positive: true },
          { title: 'المستخدمين النشطين', value: '18,932', trend: '+16.3%', icon: Users, positive: true },
          { title: 'الطلبات المكتملة', value: '1,423', trend: '+5.4%', icon: LayoutGrid, positive: true },
          { title: 'المعاملات المالية', value: '892', trend: '-2.1%', icon: CreditCard, positive: false },
        ].map((stat, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between hover:border-gold-500/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <div className="p-2 rounded-lg bg-[#0B0D10] border border-border text-gold-500">
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
              <p className={`text-xs flex items-center gap-1 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <span>{stat.trend}</span>
                <span className="text-gray-500 mr-1">من الشهر الماضي</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold mb-6">نظرة عامة على الإيرادات</h2>
          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E2B93B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E2B93B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2E37" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#13161B', borderColor: '#2A2E37', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#E2B93B' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#E2B93B" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-bold mb-6">سجل النشاطات الحديثة</h2>
          <div className="space-y-6 flex-1">
            {recentActivities.map((act, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-gold-500 outline outline-4 outline-gold-500/10"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-300">
                    <span className="font-bold text-white">{act.user}</span> {act.action} <span className="text-gold-500">{act.target}</span>
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {act.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-lg border border-border text-gray-300 hover:bg-surface-hover transition-colors text-sm font-medium">
            عرض كل النشاطات
          </button>
        </div>
      </div>
    </div>
  );
}
