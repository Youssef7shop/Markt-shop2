// login.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const togglePwd = document.getElementById('togglePwd');
    const pwdInput = document.getElementById('password');
    const errorMsg = document.getElementById('loginError');

    togglePwd.addEventListener('click', () => {
        const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
        pwdInput.setAttribute('type', type);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMsg.textContent = '';
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('loginBtn');

        loginBtn.disabled = true;
        loginBtn.textContent = 'جاري الدخول...';

        try {
            const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            // جلب دور المستخدم لتوجيهه للصفحة المناسبة[cite: 1]
            const { data: userData, error: userError } = await window.supabaseClient
                .from('users')
                .select('role')
                .eq('id', data.user.id)
                .single();

            if (userError) throw userError;

            // تسجيل العملية في logs[cite: 1]
            await window.supabaseClient.from('logs').insert([{
                user_id: data.user.id,
                action: 'login',
                ip_address: 'client-side', 
                device_info: navigator.userAgent
            }]);

            // التوجيه حسب الدور[cite: 1]
            if (userData.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else if (userData.role === 'provider') {
                window.location.href = 'dashboard.html'; // سيتم دمجها برمجياً مع auth-guard
            } else {
                window.location.href = 'dashboard.html';
            }

        } catch (error) {
            errorMsg.textContent = 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
            loginBtn.disabled = false;
            loginBtn.textContent = 'دخول';
        }
    });

    // تسجيل الدخول الاجتماعي (Google & GitHub)[cite: 1]
    document.getElementById('googleLogin').addEventListener('click', async () => {
        await window.supabaseClient.auth.signInWithOAuth({ provider: 'google' });
    });
    
    document.getElementById('githubLogin').addEventListener('click', async () => {
        await window.supabaseClient.auth.signInWithOAuth({ provider: 'github' });
    });
});