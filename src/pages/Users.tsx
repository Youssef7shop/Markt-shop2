import React, { useState } from 'react';
import { 
  Users, UserCheck, UserPlus, Crown, UserX, Clock, 
  Search, Filter, Download, Plus, ChevronDown, MoreVertical, Shield, CheckCircle2, XCircle, Clock4,
  Edit, Briefcase, ChevronLeft, Loader2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Stat, User } from '../types';
import { useGoogleSheets } from '../lib/googleSheets';

const userChartData = [
  { name: 'يناير', users: 1200 },
  { name: 'فبراير', users: 1900 },
  { name: 'مارس', users: 2400 },
  { name: 'أبريل', users: 3100 },
  { name: 'مايو', users: 4800 },
  { name: 'يونيو', users: 5400 },
];

const recentRegistrations = [
  { name: 'أحمد محمود', role: 'عميل', time: 'منذ 10 دقائق' },
  { name: 'سارة خالد', role: 'مقدم خدمة', time: 'منذ 45 دقيقة' },
  { name: 'خالد إبراهيم', role: 'عميل', time: 'منذ ساعتين' },
  { name: 'منى جمال', role: 'مقدم خدمة', time: 'منذ 3 ساعات' },
];

const stats: Stat[] = [
  { title: 'إجمالي المستخدمين', value: '24,532', trend: '18.7%', isPositive: true, icon: Users, color: 'text-gold-500' },
  { title: 'المستخدمين النشطين', value: '18,932', trend: '16.3%', isPositive: true, icon: UserCheck, color: 'text-green-500' },
  { title: 'المستخدمين الجدد', value: '2,540', trend: '22.4%', isPositive: true, icon: UserPlus, color: 'text-gold-500' },
  { title: 'المستخدمين المميزين', value: '5,832', trend: '14.8%', isPositive: true, icon: Crown, color: 'text-gold-500' },
  { title: 'المستخدمين الموقوفين', value: '236', trend: '4.3%', isPositive: false, icon: UserX, color: 'text-red-500' },
  { title: 'حسابات بانتظار التفعيل', value: '128', trend: '2.1%', isPositive: false, icon: Clock, color: 'text-gold-500' },
];

const mockUsers: User[] = [
  {
    id: '#USR-0001', name: 'أحمد خالد', email: 'ahmed.khalid@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    role: 'admin', roleLabel: 'مميز', balance: 245.75, balanceLabel: 'محفظة', status: 'active', statusLabel: 'نشط',
    lastSeen: 'متصل الآن', lastSeenTime: '', registrationDate: '2024 - 06 - 09', registrationTime: 'منذ 2 ساعة'
  },
  {
    id: '#USR-0002', name: 'سارة محمد', email: 'sara.mohamed@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    role: 'client', roleLabel: 'عميل', balance: 156.30, balanceLabel: 'محفظة', status: 'active', statusLabel: 'نشط',
    lastSeen: 'منذ 30 دقيقة', lastSeenTime: '', registrationDate: '2024 - 06 - 08', registrationTime: 'منذ 30 دقيقة'
  },
  {
    id: '#USR-0003', name: 'محمد علي', email: 'mohamed.ali@example.com', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces',
    role: 'client', roleLabel: 'عميل', balance: 82.45, balanceLabel: 'محفظة', status: 'active', statusLabel: 'نشط',
    lastSeen: 'منذ 1 يوم', lastSeenTime: '', registrationDate: '2024 - 06 - 07', registrationTime: 'منذ 1 يوم'
  },
  {
    id: '#USR-0004', name: 'ليلى حسن', email: 'layla.hassan@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
    role: 'provider', roleLabel: 'جديد', balance: 0.00, balanceLabel: 'محفظة', status: 'active', statusLabel: 'نشط',
    lastSeen: 'منذ 3 ساعات', lastSeenTime: '', registrationDate: '2024 - 06 - 07', registrationTime: 'منذ 2 يوم'
  },
  {
    id: '#USR-0005', name: 'عمر سعيد', email: 'omer.saeed@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    role: 'client', roleLabel: 'عميل', balance: 65.00, balanceLabel: 'محفظة', status: 'suspended', statusLabel: 'موقوف',
    lastSeen: 'منذ 2 يوم', lastSeenTime: '', registrationDate: '2024 - 06 - 06', registrationTime: 'منذ 3 يوم'
  },
  {
    id: '#USR-0006', name: 'نور أحمد', email: 'noor.ahmed@example.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
    role: 'provider', roleLabel: 'جديد', balance: 0.00, balanceLabel: 'محفظة', status: 'pending', statusLabel: 'بانتظار التفعيل',
    lastSeen: 'منذ 1 يوم', lastSeenTime: '', registrationDate: '2024 - 06 - 05', registrationTime: 'منذ 4 يوم'
  },
  {
    id: '#USR-0007', name: 'خالد إبراهيم', email: 'khaled.ibrahim@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
    role: 'client', roleLabel: 'عميل', balance: 120.50, balanceLabel: 'محفظة', status: 'suspended', statusLabel: 'موقوف',
    lastSeen: 'منذ 5 يوم', lastSeenTime: '', registrationDate: '2024 - 06 - 04', registrationTime: 'منذ 5 يوم'
  },
];

export function UsersPage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [isCreating, setIsCreating] = useState(false);
  const { logToSheet } = useGoogleSheets();
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleNewUser = () => {
    setIsCreating(true);
    setTimeout(async () => {
      const newUser: User = {
        id: `#USR-${Math.floor(1000 + Math.random() * 9000)}`,
        name: 'مستخدم جديد',
        email: `newuser${Math.floor(Math.random() * 1000)}@example.com`,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=150&h=150&fit=crop&crop=faces`,
        role: 'client',
        roleLabel: 'عميل',
        balance: 0.00,
        balanceLabel: 'محفظة',
        status: 'pending',
        statusLabel: 'بانتظار التفعيل',
        lastSeen: 'الآن',
        lastSeenTime: '',
        registrationDate: new Date().toISOString().split('T')[0],
        registrationTime: 'الآن'
      };
      
      try {
        await logToSheet('User', [
          newUser.id,
          newUser.name,
          newUser.email,
          newUser.roleLabel,
          newUser.statusLabel,
          newUser.registrationDate
        ]);
      } catch (err) {
        console.error('Error logging to sheet', err);
      }

      setUsers([newUser, ...users]);
      setIsCreating(false);
    }, 1000);
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Users className="w-8 h-8 text-gold-500" />
            إدارة المستخدمين
          </h1>
          <p className="text-gray-400 text-sm mt-1">إدارة جميع المستخدمين والصلاحيات والحسابات</p>
        </div>
        <div className="flex items-center gap-3 flex-row-reverse">
          <button 
            onClick={handleNewUser}
            disabled={isCreating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500 text-black hover:bg-gold-400 transition-colors text-sm font-bold disabled:opacity-50"
          >
            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {isCreating ? 'جاري الإضافة...' : 'إضافة مستخدم'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gold-500/50 text-gold-500 hover:bg-gold-500/10 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" />
            تصفية
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-gray-300 hover:bg-surface-hover transition-colors text-sm font-medium">
            <Download className="w-4 h-4 text-gray-400" />
            تصدير
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-surface border border-border rounded-xl p-4 flex flex-col justify-between hover:border-gold-500/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <p className="text-gray-400 text-xs font-medium">{stat.title}</p>
              <div className={`p-2 rounded-lg bg-[#0B0D10] border border-border flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
              <p className={`text-xs flex items-center gap-1 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                <span>{stat.isPositive ? '↑' : '↓'}</span>
                <span>{stat.trend}</span>
                <span className="text-gray-500 mr-1">من الشهر الماضي</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold mb-6 text-white">نمو المستخدمين</h2>
          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userChartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E2B93B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E2B93B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2E37" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#13161B', borderColor: '#2A2E37', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#E2B93B' }}
                />
                <Area type="monotone" dataKey="users" stroke="#E2B93B" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-bold mb-6 text-white">أحدث التسجيلات</h2>
          <div className="space-y-6 flex-1">
            {recentRegistrations.map((user, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-gold-500 outline outline-4 outline-gold-500/10"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-300">
                    <span className="font-bold text-white">{user.name}</span> سجل كـ <span className="text-gold-500">{user.role}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 font-mono">
                    <Clock className="w-3 h-3" />
                    {user.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-border flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-[200px] max-w-sm relative">
            <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث عن مستخدم..." 
              className="w-full bg-[#0B0D10] border border-border rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {['جميع المجموعات', 'جميع الحالات', 'جميع البلدان'].map((filter, i) => (
              <button key={i} className="flex items-center justify-between gap-4 px-4 py-2 bg-[#0B0D10] border border-border rounded-lg text-sm text-gray-300 hover:border-gray-600 transition-colors min-w-[140px]">
                {filter}
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            ))}
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0B0D10] border border-border rounded-lg text-sm text-gray-300 hover:border-gray-600 transition-colors">
              <span className="text-gray-500">↑↓</span>
              الأحدث أولاً
              <Clock4 className="w-4 h-4 text-gray-500 mr-2" />
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
          <thead className="bg-[#0B0D10]/50 text-gray-400 border-b border-border text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">المستخدم</th>
              <th className="px-6 py-4 font-medium">البريد الإلكتروني</th>
              <th className="px-6 py-4 font-medium">المجموعة</th>
              <th className="px-6 py-4 font-medium">الرصيد</th>
              <th className="px-6 py-4 font-medium">الحالة</th>
              <th className="px-6 py-4 font-medium">آخر ظهور</th>
              <th className="px-6 py-4 font-medium">تاريخ التسجيل</th>
              <th className="px-6 py-4 font-medium">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredUsers.map((user, idx) => (
              <tr key={idx} className="hover:bg-surface-hover/50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-border object-cover" />
                    <div>
                      <div className="font-bold text-gray-200">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B0D10] text-xs font-medium ${
                    user.role === 'admin' ? 'text-gold-500' :
                    user.role === 'client' ? 'text-gold-500' :
                    'text-gray-400'
                  }`}>
                    {user.role === 'admin' && <Crown className="w-3.5 h-3.5" />}
                    {user.role === 'client' && <Briefcase className="w-3.5 h-3.5" />}
                    {user.role === 'provider' && <ChevronLeft className="w-3.5 h-3.5" />}
                    {user.roleLabel}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-200">${user.balance.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">{user.balanceLabel}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    user.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    user.status === 'suspended' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                    'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                  }`}>
                    {user.status === 'active' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {user.status === 'suspended' && <XCircle className="w-3.5 h-3.5" />}
                    {user.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                    {user.statusLabel}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : user.status === 'suspended' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                    <span className="text-gray-300 text-sm">{user.lastSeen}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-300">{user.registrationDate}</div>
                  <div className="text-xs text-gray-500">{user.registrationTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 text-gold-500 hover:text-white rounded border border-gold-500/30 bg-[#0B0D10] hover:bg-gold-500/10 transition-colors">
                      <Shield className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gold-500 hover:text-white rounded border border-gold-500/30 bg-[#0B0D10] hover:bg-gold-500/10 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-white rounded border border-border bg-[#0B0D10] hover:bg-surface-hover transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500 bg-[#0B0D10]/50">لا يوجد مستخدمين يطابقون بحثك</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-gray-400">
          <div>عرض 1 إلى 10 من 24,532 مستخدم</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              عرض في الصفحة
              <select className="bg-[#0B0D10] border border-border rounded px-2 py-1 text-white outline-none">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-border hover:bg-surface-hover transition-colors">
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-gold-500 text-black font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-border hover:bg-surface-hover transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-border hover:bg-surface-hover transition-colors">3</button>
              <span className="px-2">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-border hover:bg-surface-hover transition-colors">123</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-border hover:bg-surface-hover transition-colors">
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
