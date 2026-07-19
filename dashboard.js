// dashboard.js

document.addEventListener('DOMContentLoaded', async () => {
    // 1. حماية الصفحة وجلب بيانات العميل[cite: 1]
    const user = await requireAuth(['client', 'provider']); // السماح للمزود برؤية لوحة العميل أيضاً لطلب خدمات
    if (!user) return;

    document.getElementById('welcomeMsg').textContent = `مرحباً، ${user.full_name}`;

    // تفعيل زر تسجيل الخروج
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // 2. جلب بيانات المحفظة (Wallet)[cite: 1]
    const { data: walletData, error: walletError } = await window.supabaseClient
        .from('wallets')
        .select('balance, currency')
        .eq('user_id', user.id)
        .single();

    if (!walletError && walletData) {
        document.getElementById('walletBalance').textContent = `الرصيد: ${walletData.balance}${walletData.currency === 'USD' ? '$' : ''}`;
    }

    // 3. جلب إحصائيات الطلبات[cite: 1]
    const { data: ordersData, error: ordersError } = await window.supabaseClient
        .from('orders')
        .select(`
            id, status, price, created_at,
            services(title),
            providers(users(full_name))
        `)
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

    if (!ordersError && ordersData) {
        document.getElementById('totalOrders').textContent = ordersData.length;
        document.getElementById('pendingOrders').textContent = ordersData.filter(o => o.status === 'pending').length;

        // 4. تعبئة جدول الطلبات الحديثة
        const tbody = document.getElementById('recentOrdersTable');
        tbody.innerHTML = ''; // مسح المحتوى الافتراضي

        // عرض أحدث 5 طلبات
        ordersData.slice(0, 5).forEach(order => {
            const tr = document.createElement('tr');
            
            // استخراج أسماء العلاقات بناءً على هيكل الجداول[cite: 1]
            const serviceName = order.services?.title || 'خدمة محذوفة';
            const providerName = order.providers?.users?.full_name || 'غير معروف';
            const dateStr = new Date(order.created_at).toLocaleDateString('ar-EG');

            tr.innerHTML = `
                <td>${serviceName}</td>
                <td>${providerName}</td>
                <td>$${order.price}</td>
                <td><span class="status-${order.status}">${order.status}</span></td>
                <td>${dateStr}</td>
            `;
            tbody.appendChild(tr);
        });

        if (ordersData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">لا توجد طلبات حتى الآن.</td></tr>';
        }
    }
});