import React, { useState } from 'react';
import { Mail, Search, Inbox as InboxIcon, Send, Archive, Trash2, Star, Clock, CheckCircle2 } from 'lucide-react';

const mockMessages = [
  { id: 1, sender: 'مستخدم 1', subject: 'هل يمكنني الاستفسار عن خدمتي؟', preview: 'السلام عليكم، لقد قمت بطلب خدمة تصميم شعار وأود معرفة متى سيتم التسليم...', date: 'منذ 10 دقائق', isUnread: true, isStarred: false },
  { id: 2, sender: 'سارة أحمد', subject: 'مشكلة في الدفع', preview: 'حاولت الدفع بالبطاقة ولكن تظهر لي رسالة خطأ، الرجاء المساعدة...', date: 'منذ ساعتين', isUnread: true, isStarred: true },
  { id: 3, sender: 'محمد عبد الله', subject: 'طلب تعديل على التصميم', preview: 'التصميم ممتاز ولكن أود تعديل الألوان لتكون أكثر سطوعاً...', date: 'أمس', isUnread: false, isStarred: false },
  { id: 4, sender: 'فريق الدعم', subject: 'تحديث بخصوص الخادم', preview: 'سيتم عمل صيانة دورية للخادم يوم الجمعة القادم الساعة 2 صباحاً...', date: 'منذ 3 أيام', isUnread: false, isStarred: false },
  { id: 5, sender: 'عميل مميز', subject: 'استفسار عن الخطة السنوية', preview: 'أرغب بترقية حسابي للخطة السنوية، هل يوجد خصم متاح؟', date: 'الأسبوع الماضي', isUnread: false, isStarred: true },
];

export function InboxPage() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };
  
  const filteredMessages = mockMessages.filter(msg => {
    const matchesSearch = msg.sender.toLowerCase().includes(search.toLowerCase()) || 
                         msg.subject.toLowerCase().includes(search.toLowerCase());
    
    let matchesTab = false;
    if (activeTab === 'inbox') matchesTab = true; // Show all in inbox for mockup
    else if (activeTab === 'starred') matchesTab = msg.isStarred;
    else if (activeTab === 'sent') matchesTab = false; // Mock empty state
    else if (activeTab === 'archive') matchesTab = false;
    else if (activeTab === 'trash') matchesTab = false;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-8 animate-in fade-in duration-500 flex h-[calc(100vh-5rem)] relative">
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-surface border border-border text-white px-4 py-3 rounded-xl flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4 z-50">
          <CheckCircle2 className="w-5 h-5 text-gold-500" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}
      {/* Sidebar for Inbox */}
      <div className="w-64 border-l border-border pr-0 pl-6 flex flex-col">
        <button 
          onClick={() => showToast('تم فتح نافذة إنشاء رسالة جديدة')}
          className="w-full bg-gold-500 text-black font-bold py-3 rounded-xl mb-6 hover:bg-gold-400 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          رسالة جديدة
        </button>
        
        <div className="space-y-2">
          <button 
            onClick={() => setActiveTab('inbox')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${activeTab === 'inbox' ? 'bg-[#0B0D10] text-gold-500 border border-gold-500/50' : 'text-gray-400 hover:text-white hover:bg-surface-hover'}`}
          >
            <div className="flex items-center gap-3">
              <InboxIcon className="w-5 h-5" />
              <span>البريد الوارد</span>
            </div>
            <span className="bg-gold-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">4</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('starred')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${activeTab === 'starred' ? 'bg-[#0B0D10] text-gold-500 border border-gold-500/50' : 'text-gray-400 hover:text-white hover:bg-surface-hover'}`}
          >
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5" />
              <span>المميزة بنجمة</span>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('sent')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${activeTab === 'sent' ? 'bg-[#0B0D10] text-gold-500 border border-gold-500/50' : 'text-gray-400 hover:text-white hover:bg-surface-hover'}`}
          >
            <div className="flex items-center gap-3">
              <Send className="w-5 h-5" />
              <span>المرسلة</span>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('archive')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${activeTab === 'archive' ? 'bg-[#0B0D10] text-gold-500 border border-gold-500/50' : 'text-gray-400 hover:text-white hover:bg-surface-hover'}`}
          >
            <div className="flex items-center gap-3">
              <Archive className="w-5 h-5" />
              <span>الأرشيف</span>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('trash')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${activeTab === 'trash' ? 'bg-[#0B0D10] text-gold-500 border border-gold-500/50' : 'text-gray-400 hover:text-white hover:bg-surface-hover'}`}
          >
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5" />
              <span>المهملات</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pl-0 pr-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Mail className="w-8 h-8 text-gold-500" />
            صندوق البريد
          </h1>
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث في الرسائل..." 
              className="w-full bg-[#0B0D10] border border-border rounded-lg pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white"
            />
          </div>
        </div>
        
        <div className="flex-1 bg-surface border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border bg-[#0B0D10]/50">
            <div className="flex items-center gap-4">
              <input type="checkbox" onChange={(e) => showToast(e.target.checked ? 'تم تحديد كل الرسائل' : 'تم إلغاء التحديد')} className="w-4 h-4 rounded border-gray-600 bg-surface text-gold-500 focus:ring-gold-500 focus:ring-offset-surface" />
              <button onClick={() => showToast('تم نقل الرسائل المحددة للأرشيف')} className="text-gray-400 hover:text-white transition-colors"><Archive className="w-4 h-4" /></button>
              <button onClick={() => showToast('تم نقل الرسائل المحددة للمهملات')} className="text-gray-400 hover:text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="text-sm text-gray-400">
              عرض 1-5 من 24
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((msg) => (
              <div key={msg.id} className={`flex items-center gap-4 p-4 border-b border-border hover:bg-surface-hover transition-colors cursor-pointer ${msg.isUnread ? 'bg-[#0B0D10]/30' : ''}`}>
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-surface text-gold-500 focus:ring-gold-500 focus:ring-offset-surface" />
                <button className={`focus:outline-none ${msg.isStarred ? 'text-gold-500' : 'text-gray-600 hover:text-gray-400'}`}>
                  <Star className="w-4 h-4" fill={msg.isStarred ? "currentColor" : "none"} />
                </button>
                <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                  <div className={`col-span-3 lg:col-span-2 text-sm ${msg.isUnread ? 'font-bold text-white' : 'text-gray-300'}`}>
                    {msg.sender}
                  </div>
                  <div className="col-span-6 lg:col-span-8 flex items-center gap-2 truncate">
                    <span className={`text-sm ${msg.isUnread ? 'font-bold text-white' : 'text-gray-300'}`}>{msg.subject}</span>
                    <span className="text-gray-500 text-sm truncate">- {msg.preview}</span>
                  </div>
                  <div className={`col-span-3 lg:col-span-2 text-left text-xs ${msg.isUnread ? 'font-bold text-gold-500' : 'text-gray-500'}`}>
                    {msg.date}
                  </div>
                </div>
              </div>
            ))}
            {filteredMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Mail className="w-12 h-12 mb-4 opacity-20" />
                <p>لا توجد رسائل مطابقة لبحثك</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
