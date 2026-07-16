import React, { useState } from 'react';
import { LayoutGrid, Plus, Search, Filter, Star, CheckCircle2 } from 'lucide-react';
import { useRole } from '../lib/roleContext';

const initialServices = [
  { id: 1, title: 'تصميم شعار وهوية بصرية كاملة', provider: 'أحمد خالد', rating: 4.9, reviews: 124, price: 150, image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop', category: 'تصميم وجرافيك' },
  { id: 2, title: 'برمجة موقع تعريفي احترافي (React)', provider: 'عمر سعيد', rating: 4.8, reviews: 89, price: 300, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop', category: 'تطوير المواقع' },
  { id: 3, title: 'إدارة حسابات السوشيال ميديا (شهرياً)', provider: 'ليلى حسن', rating: 5.0, reviews: 42, price: 250, image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop', category: 'التسويق الرقمي' },
  { id: 4, title: 'مونتاج فيديو احترافي لليوتيوب', provider: 'محمد علي', rating: 4.7, reviews: 156, price: 80, image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop', category: 'فيديو وأنيميشن' },
  { id: 5, title: 'كتابة محتوى تسويقي متوافق مع SEO', provider: 'نور أحمد', rating: 4.9, reviews: 67, price: 50, image: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?w=400&h=300&fit=crop', category: 'كتابة وترجمة' },
  { id: 6, title: 'تطوير تطبيق موبايل (Flutter)', provider: 'سارة محمد', rating: 4.6, reviews: 34, price: 800, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop', category: 'تطبيقات الهاتف' },
];

export function ServicesPage() {
  const [search, setSearch] = useState('');
  const [services, setServices] = useState(initialServices);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const { role } = useRole();

  const handleAddService = () => {
    const newService = {
      id: Date.now(),
      title: 'خدمة جديدة مخصصة',
      provider: 'مقدم خدمة',
      rating: 0,
      reviews: 0,
      price: 100,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
      category: 'أخرى'
    };
    setServices([newService, ...services]);
    showToast('تمت إضافة الخدمة بنجاح');
  };

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(search.toLowerCase()) || 
    service.provider.toLowerCase().includes(search.toLowerCase())
  );

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
            <LayoutGrid className="w-8 h-8 text-gold-500" />
            إدارة الخدمات
          </h1>
          <p className="text-gray-400 text-sm mt-1">تصفح وإدارة الخدمات المعروضة في المنصة</p>
        </div>
        <div className="flex items-center gap-3">
          {(role === 'admin' || role === 'client') && (
            <button onClick={handleAddService} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B0D10] border border-gold-500/50 text-gold-500 hover:bg-gold-500/10 transition-colors text-sm font-bold">
              <Plus className="w-4 h-4" />
              إضافة خدمة جديدة
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="البحث عن خدمة..." 
            className="w-full bg-[#0B0D10] border border-border rounded-lg pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-gray-300 hover:bg-surface-hover transition-colors text-sm font-medium bg-[#0B0D10]">
          <Filter className="w-4 h-4" />
          تصفية
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-surface rounded-xl border border-border">
            لا توجد خدمات تطابق بحثك
          </div>
        )}
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-surface border border-border rounded-xl overflow-hidden hover:border-gold-500/30 transition-colors group cursor-pointer flex flex-col">
            <div className="h-48 overflow-hidden relative border-b border-border">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium border border-white/10">
                {service.category}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-white mb-2 leading-snug line-clamp-2 hover:text-gold-500 transition-colors">{service.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-400 text-sm">{service.provider}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                <div className="flex items-center text-gold-500 text-sm font-bold">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {service.rating} <span className="text-gray-500 font-normal mr-1">({service.reviews})</span>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <div className="text-xl font-bold text-white">
                  ${service.price}
                </div>
                <button onClick={() => showToast('تم فتح نافذة التعديل')} className="px-4 py-2 bg-[#0B0D10] border border-gold-500/30 text-gold-500 rounded-lg text-sm font-bold hover:bg-gold-500/10 transition-colors">
                  تعديل
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
