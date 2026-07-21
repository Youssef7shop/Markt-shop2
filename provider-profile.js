// profile.js

document.addEventListener('DOMContentLoaded', async () => {
    // 1. التحقق من تسجيل دخول المستخدم
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const profileForm = document.getElementById('profileForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // 2. جلب البيانات من جدول users
    async function loadProfile() {
        const { data, error } = await window.supabaseClient
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        if (data) {
            fullNameInput.value = data.full_name || '';
            emailInput.value = user.email || '';
            phoneInput.value = data.phone || '';
        }
    }

    // 3. تحديث البيانات عند إرسال النموذج
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const { error } = await window.supabaseClient
            .from('users')
            .update({
                full_name: fullNameInput.value,
                phone: phoneInput.value
            })
            .eq('id', user.id);

        if (error) {
            alert('حدث خطأ أثناء الحفظ: ' + error.message);
        } else {
            alert('تم تحديث الملف الشخصي بنجاح!');
        }
    });

    loadProfile();
});