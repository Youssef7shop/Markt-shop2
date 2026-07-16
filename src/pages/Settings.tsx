import React, { useState } from 'react';
import { Settings, User, Lock, Bell, Globe, Shield, Save, Camera, Loader2, CheckCircle2, History, Monitor, Smartphone, MapPin, FileSpreadsheet } from 'lucide-react';
import { useGoogleSheets, createSpreadsheet } from '../lib/googleSheets';
import { googleSignIn } from '../lib/auth';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const { accessToken, spreadsheetId, setAccessToken, setSpreadsheetId } = useGoogleSheets();
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [sheetLink, setSheetLink] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const login = async () => {
    try {
      const result = await googleSignIn();
      if (result?.accessToken) {
        setAccessToken(result.accessToken);
      }
    } catch (e) {
      console.error('Login failed', e);
    }
  };

  const handleCreateSheet = async () => {
    if (!accessToken) return;
    setIsCreatingSheet(true);
    try {
      const response = await createSpreadsheet(accessToken, 'Admin Dashboard Data');
      setSpreadsheetId(response.spreadsheetId);
      setSheetLink(response.spreadsheetUrl);
    } catch (e) {
      console.error('Failed to create sheet', e);
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleSave = (section: string) => {
    setSavingSection(section);
    setTimeout(() => {
      setSavingSection(null);
      setSavedSection(section);
      setTimeout(() => setSavedSection(null), 2000);
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'security', label: 'الأمان', icon: Lock },
    { id: 'login-history', label: 'سجل تسجيل الدخول', icon: History },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'general', label: 'إعدادات عامة', icon: Globe },
    { id: 'integrations', label: 'الربط والتكامل', icon: FileSpreadsheet },
  ];

  const loginHistory = [
    { id: 1, device: 'MacBook Pro - Chrome', ip: '192.168.1.105', location: 'الرياض, السعودية', date: '2024-06-09 14:30', status: 'current', type: 'desktop' },
    { id: 2, device: 'iPhone 13 Pro - Safari', ip: '172.20.10.2', location: 'جدة, السعودية', date: '2024-06-08 10:15', status: 'success', type: 'mobile' },
    { id: 3, device: 'Windows PC - Firefox', ip: '198.51.100.42', location: 'القاهرة, مصر', date: '2024-06-05 09:20', status: 'success', type: 'desktop' },
    { id: 4, device: 'Unknown Device - Chrome', ip: '203.0.113.19', location: 'موسكو, روسيا', date: '2024-06-01 11:10', status: 'failed', type: 'desktop' },
  ];

  return (
    <div className="p-8 animate-in fade-in duration-500 relative">
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-surface border border-border text-white px-4 py-3 rounded-xl flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4 z-50">
          <CheckCircle2 className="w-5 h-5 text-gold-500" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Settings className="w-8 h-8 text-gold-500" />
          الإعدادات
        </h1>
        <p className="text-gray-400 text-sm mt-1">إدارة إعدادات حسابك وتفضيلات النظام</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-right ${
                activeTab === tab.id
                  ? 'bg-gold-500/10 text-gold-500 border border-gold-500/50'
                  : 'text-gray-400 hover:text-white hover:bg-surface border border-transparent'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-surface border border-border rounded-xl p-8 min-h-[500px]">
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-bold text-white mb-6 border-b border-border pb-4">المعلومات الشخصية</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="relative group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" 
                    alt="User avatar" 
                    className="w-24 h-24 rounded-2xl border-2 border-border object-cover group-hover:border-gold-500/50 transition-colors"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">الصورة الشخصية</h3>
                  <p className="text-xs text-gray-500 mb-3">يُفضل أن تكون صورة مربعة بحجم لا يتجاوز 2MB</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => showToast('تم تحديث الصورة الشخصية بنجاح')}
                      className="px-4 py-2 bg-[#0B0D10] border border-gold-500/50 text-gold-500 rounded-lg text-xs font-bold hover:bg-gold-500/10 transition-colors"
                    >
                      تغيير الصورة
                    </button>
                    <button 
                      onClick={() => showToast('تم حذف الصورة الشخصية')}
                      className="px-4 py-2 bg-[#0B0D10] border border-border text-gray-400 rounded-lg text-xs font-medium hover:text-white transition-colors"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">الاسم الأول</label>
                  <input type="text" defaultValue="أحمد" className="w-full bg-[#0B0D10] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">اسم العائلة</label>
                  <input type="text" defaultValue="خالد" className="w-full bg-[#0B0D10] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">البريد الإلكتروني</label>
                  <input type="email" defaultValue="ahmed.khalid@example.com" className="w-full bg-[#0B0D10] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">رقم الهاتف</label>
                  <input type="tel" defaultValue="+966 50 123 4567" className="w-full bg-[#0B0D10] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white" dir="ltr" />
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-border flex justify-end">
                <button onClick={() => handleSave('profile')} disabled={savingSection === 'profile'} className="flex items-center gap-2 px-6 py-2.5 bg-gold-500 text-black rounded-lg text-sm font-bold hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {savingSection === 'profile' ? <Loader2 className="w-4 h-4 animate-spin" /> : savedSection === 'profile' ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {savingSection === 'profile' ? 'جاري الحفظ...' : savedSection === 'profile' ? 'تم الحفظ' : 'حفظ التغييرات'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-bold text-white mb-6 border-b border-border pb-4">إعدادات الأمان</h2>
              
              <div className="space-y-4 max-w-xl">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">كلمة المرور الحالية</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#0B0D10] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">كلمة المرور الجديدة</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#0B0D10] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">تأكيد كلمة المرور الجديدة</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#0B0D10] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white" />
                </div>
              </div>

              <div className="p-5 bg-[#0B0D10] border border-gold-500/30 rounded-xl mt-8 flex gap-4 items-start max-w-xl">
                <div className="p-2 bg-gold-500/10 rounded-lg">
                  <Shield className="w-6 h-6 text-gold-500 shrink-0" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">المصادقة الثنائية (2FA)</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">قم بتفعيل المصادقة الثنائية لحماية حسابك من الوصول غير المصرح به. سيتم طلب رمز مرور إضافي عند تسجيل الدخول.</p>
                  <button className="px-4 py-2 bg-gold-500 text-black rounded-lg text-xs font-bold hover:bg-gold-400 transition-colors">
                    تفعيل الآن
                  </button>
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-border flex justify-end">
                <button onClick={() => handleSave('security')} disabled={savingSection === 'security'} className="flex items-center gap-2 px-6 py-2.5 bg-gold-500 text-black rounded-lg text-sm font-bold hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {savingSection === 'security' ? <Loader2 className="w-4 h-4 animate-spin" /> : savedSection === 'security' ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {savingSection === 'security' ? 'جاري التحديث...' : savedSection === 'security' ? 'تم التحديث' : 'تحديث كلمة المرور'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'login-history' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-bold text-white mb-6 border-b border-border pb-4">سجل تسجيل الدخول (عناوين IP)</h2>
              <p className="text-sm text-gray-400 mb-6">
                هذه قائمة بأحدث عمليات تسجيل الدخول إلى حسابك، بما في ذلك عناوين الـ IP الخاصة بالأجهزة.
              </p>
              
              <div className="space-y-4">
                {loginHistory.map((login) => (
                  <div key={login.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#0B0D10] border border-border rounded-xl hover:border-gold-500/30 transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${login.status === 'failed' ? 'bg-red-500/10 text-red-500' : 'bg-gold-500/10 text-gold-500'}`}>
                        {login.type === 'desktop' ? <Monitor className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{login.device}</h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 font-mono">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {login.location}
                          </span>
                          <span className="text-gold-500 bg-gold-500/10 px-1.5 py-0.5 rounded">IP: {login.ip}</span>
                          <span dir="ltr">{login.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        login.status === 'current' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        login.status === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {login.status === 'current' ? 'الجهاز الحالي' : login.status === 'success' ? 'ناجح' : 'فشل'}
                      </span>
                      {login.status !== 'current' && (
                        <button className="text-xs text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
                          تسجيل خروج
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-bold text-white mb-6 border-b border-border pb-4">تفضيلات الإشعارات</h2>
              
              <div className="space-y-4">
                {[
                  { title: 'إشعارات الطلبات', desc: 'تلقي تنبيهات عند إنشاء طلب جديد أو تغيير حالته' },
                  { title: 'الرسائل الجديدة', desc: 'تنبيه عند تلقي رسالة جديدة من العملاء أو مقدمي الخدمات' },
                  { title: 'المعاملات المالية', desc: 'إشعار عند اكتمال عملية دفع أو سحب رصيد' },
                  { title: 'النشرة البريدية', desc: 'تلقي آخر الأخبار والتحديثات الخاصة بالمنصة' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#0B0D10] border border-border rounded-xl hover:border-gold-500/30 transition-colors">
                    <div>
                      <h4 className="text-white text-sm font-medium mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i !== 3} />
                      <div className="w-11 h-6 bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-gray-400 peer-checked:after:bg-black after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="pt-6 mt-8 border-t border-border flex justify-end">
                <button onClick={() => handleSave('notifications')} disabled={savingSection === 'notifications'} className="flex items-center gap-2 px-6 py-2.5 bg-gold-500 text-black rounded-lg text-sm font-bold hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {savingSection === 'notifications' ? <Loader2 className="w-4 h-4 animate-spin" /> : savedSection === 'notifications' ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {savingSection === 'notifications' ? 'جاري الحفظ...' : savedSection === 'notifications' ? 'تم الحفظ' : 'حفظ التفضيلات'}
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-bold text-white mb-6 border-b border-border pb-4">إعدادات عامة</h2>
              
              <div className="space-y-6 max-w-xl">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">لغة الواجهة</label>
                  <select className="w-full bg-[#0B0D10] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white">
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">المنطقة الزمنية</label>
                  <select className="w-full bg-[#0B0D10] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white" dir="ltr">
                    <option value="AST">(UTC+03:00) Riyadh</option>
                    <option value="GST">(UTC+04:00) Dubai</option>
                    <option value="EET">(UTC+02:00) Cairo</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-border flex justify-end">
                <button onClick={() => handleSave('general')} disabled={savingSection === 'general'} className="flex items-center gap-2 px-6 py-2.5 bg-gold-500 text-black rounded-lg text-sm font-bold hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {savingSection === 'general' ? <Loader2 className="w-4 h-4 animate-spin" /> : savedSection === 'general' ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {savingSection === 'general' ? 'جاري الحفظ...' : savedSection === 'general' ? 'تم الحفظ' : 'حفظ الإعدادات'}
                </button>
              </div>
            </div>
          )}
          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-bold text-white mb-6 border-b border-border pb-4">الربط والتكامل</h2>
              
              <div className="space-y-6 max-w-xl">
                <div className="p-5 bg-[#0B0D10] border border-border rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <FileSpreadsheet className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Google Sheets</h3>
                      <p className="text-xs text-gray-400">حفظ الطلبات والتسجيلات الجديدة تلقائياً</p>
                    </div>
                  </div>
                  
                  {!accessToken ? (
                    <button onClick={() => login()} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
                      تسجيل الدخول بحساب Google
                    </button>
                  ) : !spreadsheetId ? (
                    <div className="space-y-4">
                      <p className="text-sm text-green-500 font-medium">تم تسجيل الدخول بنجاح</p>
                      <button onClick={handleCreateSheet} disabled={isCreatingSheet} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gold-500 text-black rounded-lg text-sm font-bold hover:bg-gold-400 transition-colors disabled:opacity-50">
                        {isCreatingSheet ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
                        {isCreatingSheet ? 'جاري إنشاء الملف...' : 'إنشاء ملف Google Sheets'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-green-500 font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        تم ربط Google Sheets بنجاح
                      </p>
                      {sheetLink && (
                        <a href={sheetLink} target="_blank" rel="noopener noreferrer" className="block text-center w-full px-4 py-2.5 border border-gold-500/50 text-gold-500 rounded-lg text-sm font-bold hover:bg-gold-500/10 transition-colors">
                          فتح الملف
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
