// register.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const togglePwd = document.querySelector('.toggle-pwd');
    const pwdInput = document.getElementById('password');
    const errorMsg = document.getElementById('errorMessage');

    // زر إظهار/إخفاء كلمة المرور
    togglePwd.addEventListener('click', () => {
        const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
        pwdInput.setAttribute('type', type);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMsg.textContent = '';
        
        const fullName = document.getElementById('fullName').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const country = document.getElementById('country').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const role = document.querySelector('input[name="role"]:checked').value;

        if (password !== confirmPassword) {
            return errorMsg.textContent = 'كلمات المرور غير متطابقة';
        }

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري الإنشاء...';

        try {
            // 1. إنشاء الحساب في Supabase Auth
            const { data: authData, error: authError } = await window.supabaseClient.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            const userId = authData.user.id;

            // 2. إنشاء تلقائي لسجلات: users + wallets + settings + logs
            const { error: dbError } = await window.supabaseClient.from('users').insert([{
                id: userId,
                full_name: fullName,
                username: username,
                email: email,
                phone: phone,
                country: country,
                role: role
            }]);

            if (dbError) throw dbError;

            await window.supabaseClient.from('wallets').insert([{ user_id: userId }]);
            await window.supabaseClient.from('settings').insert([{ user_id: userId }]);
            
            // إذا كان المستخدم مقدم خدمة، ننشئ له سجل في جدول providers
            if (role === 'provider') {
                await window.supabaseClient.from('providers').insert([{ user_id: userId }]);
            }

            alert('تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني.');
            window.location.href = 'login.html';

        } catch (error) {
            errorMsg.textContent = error.message;
            submitBtn.disabled = false;
            submitBtn.textContent = 'إنشاء حساب';
        }
    });
});