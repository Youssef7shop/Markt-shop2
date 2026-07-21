// js/supabase.js
// js/supabase.js

// 1. ضع رابط مشروعك ومفتاحك هنا
const SUPABASE_URL = 'https://eupuhvrhdqaxfpodbuxa.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_wZyQ8Okfuw5JIVOvuXpAcw_u8klN0gT'; // المفتاح الطويل

// 2. تهيئة العميل
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 3. ربطه بكائن window ليتمكن register.js من قراءته
window.supabaseClient = supabase;

// 4. رسالة تأكيد لمعرفة ما إذا كان الملف يعمل فعلاً
console.log("Supabase Client Loaded:", window.supabaseClient);