import React from 'react';
import { BarChart3, Download, Calendar, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from 'recharts';

const salesData = [
  { name: 'يناير', sales: 4000 },
  { name: 'فبراير', sales: 3000 },
  { name: 'مارس', sales: 5000 },
  { name: 'أبريل', sales: 2780 },
  { name: 'مايو', sales: 6890 },
  { name: 'يونيو', sales: 8390 },
];

const categoryData = [
  { name: 'تصميم', value: 400 },
  { name: 'برمجة', value: 300 },
  { name: 'تسويق', value: 300 },
  { name: 'كتابة', value: 200 },
];
const COLORS = ['#E2B93B', '#C9A02C', '#FCD34D', '#FFF3C4'];

export function ReportsPage() {
  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-gold-500" />
            التقارير والإحصائيات
          </h1>
          <p className="text-gray-400 text-sm mt-1">تحليل مفصل لأداء المنصة والمبيعات والمستخدمين</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-gray-300 hover:bg-surface-hover transition-colors text-sm font-medium">
            <Calendar className="w-4 h-4 text-gold-500" />
            هذا العام
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500 text-black hover:bg-gold-400 transition-colors text-sm font-bold">
            <Download className="w-4 h-4" />
            تصدير التقرير
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-bold text-white mb-6">المبيعات الشهرية</h3>
          <div className="h-[300px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2E37" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#13161B', borderColor: '#2A2E37', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#E2B93B' }}
                  cursor={{ fill: '#1A1D24' }}
                />
                <Bar dataKey="sales" fill="#E2B93B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-gold-500" />
            توزيع الخدمات حسب الأقسام
          </h3>
          <div className="h-[300px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#13161B', borderColor: '#2A2E37', borderRadius: '8px', color: '#fff' }}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
