// provider-services.js

let currentProviderId = null;

document.addEventListener('DOMContentLoaded', async () => {
    const user = await requireAuth(['provider', 'admin']);
    if (!user) return;

    // جلب معرف المزود المرتبط بالمستخدم الحالي[cite: 1]
    const { data: providerData } = await window.supabaseClient
        .from('providers')
        .select('id')
        .eq('user_id', user.id)
        .single();
        
    currentProviderId = providerData.id;

    loadServices();

    // التعامل مع نموذج إضافة/تعديل خدمة[cite: 1]
    document.getElementById('serviceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('serviceTitle').value;
        const description = document.getElementById('serviceDesc').value;
        const price = document.getElementById('servicePrice').value;
        const categoryId = document.getElementById('serviceCategory').value; // يُفترض تعبئته من جدول categories[cite: 1]

        const newService = {
            provider_id: currentProviderId,
            category_id: categoryId || null,
            title: title,
            description: description,
            price: parseFloat(price),
            status: 'active'
        };

        // إدخال الخدمة (Create)[cite: 1]
        const { error } = await window.supabaseClient
            .from('services')
            .insert([newService]);

        if (!error) {
            alert('تمت إضافة الخدمة بنجاح');
            document.getElementById('serviceForm').reset();
            loadServices(); // تحديث الجدول
        } else {
            alert('خطأ في الإضافة: ' + error.message);
        }
    });
});

// دالة جلب وعرض الخدمات (Read)[cite: 1]
async function loadServices() {
    const { data: services, error } = await window.supabaseClient
        .from('services')
        .select('*')
        .eq('provider_id', currentProviderId)
        .order('created_at', { ascending: false });

    if (error) return console.error(error);

    const tbody = document.getElementById('servicesTableBody');
    tbody.innerHTML = '';

    services.forEach(service => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${service.title}</td>
            <td>$${service.price}</td>
            <td><span class="status-badge status-${service.status}">${service.status}</span></td>
            <td>
                <button onclick="deleteService('${service.id}')" class="btn btn-outline" style="color:red; border-color:red;">حذف</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// دالة الحذف (Delete)[cite: 1]
async function deleteService(serviceId) {
    if(!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;
    
    const { error } = await window.supabaseClient
        .from('services')
        .delete()
        .eq('id', serviceId);

    if (!error) {
        loadServices();
    } else {
        alert('حدث خطأ أثناء الحذف.');
    }
}