// js/supabase.js

// استخدم المفاتيح الخاصة بك من إعدادات مشروع Supabase
// تنبيه: في بيئة الإنتاج يفضل استخدام متغيرات البيئة إذا كنت تستخدم سيرفر،
// أو إبقاء مفتاح ANON_KEY فقط في الواجهة الأمامية مع RLS قوي.[cite: 1]
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ZKS8NSq_B6PjkyRorDzWZw_Iy7bx2Rc';

// تهيئة العميل
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// تصدير الكائن لاستخدامه في باقي الملفات
window.supabaseClient = supabase;

console.log("Supabase Client Initialized Successfully.");