// js/auth-guard.js

async function requireAuth(allowedRoles = []) {
    // التحقق من وجود الجلسة محلياً
    const { data: { session }, error: sessionError } = await window.supabaseClient.auth.getSession();
    
    if (sessionError || !session) {
        window.location.href = 'login.html';
        return null;
    }

    const userId = session.user.id;

    // جلب بيانات المستخدم ودوره من قاعدة البيانات
    const { data: userData, error: userError } = await window.supabaseClient
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (userError || !userData) {
        window.location.href = 'login.html';
        return null;
    }

    // التحقق من الصلاحيات (Role-based Access)
    if (allowedRoles.length > 0 && !allowedRoles.includes(userData.role)) {
        // توجيه المستخدم إلى لوحته الصحيحة إذا حاول الدخول للوحة أخرى
        if (userData.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else if (userData.role === 'provider') {
            window.location.href = 'provider-profile.html';
        } else {
            window.location.href = 'dashboard.html';
        }
        return null;
    }

    return userData;
}

// دالة مساعدة لتسجيل الخروج[cite: 1]
async function logout() {
    const { error } = await window.supabaseClient.auth.signOut();
    if (!error) {
        window.location.href = 'login.html';
    }
}