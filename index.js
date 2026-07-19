// index.js

document.addEventListener('DOMContentLoaded', async () => {
    // التحقق من حالة تسجيل الدخول وتحديث شريط التنقل (Navbar)
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    
    if (session) {
        const authButtons = document.querySelector('.auth-buttons');
        authButtons.innerHTML = `
            <a href="dashboard.html" class="btn btn-primary">لوحة التحكم</a>
            <button id="logoutBtn" class="btn btn-outline">تسجيل الخروج</button>
        `;

        document.getElementById('logoutBtn').addEventListener('click', async () => {
            const { error } = await window.supabaseClient.auth.signOut();
            if (!error) {
                window.location.reload();
            } else {
                console.error('Error signing out:', error.message);
            }
        });
    }
});