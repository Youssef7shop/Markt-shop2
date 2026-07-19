// provider-profile.js

document.addEventListener('DOMContentLoaded', async () => {
    // 1. حماية الصفحة والتأكد من أن المستخدم مقدّم خدمة
    const user = await requireAuth(['provider', 'admin']);
    if (!user) return;

    document.getElementById('logoutBtn').addEventListener('click', logout);

    // 2. جلب بيانات المزود من جدول providers
    const { data: providerData, error: providerError } = await window.supabaseClient
        .from('providers')
        .select('id, bio, skills, rating_avg, is_verified')
        .eq('user_id', user.id)
        .single();

    if (providerError) {
        console.error("Error fetching provider data:", providerError);
        return;
    }

    // تعبئة البيانات في الواجهة
    if (providerData.bio) document.getElementById('bio').value = providerData.bio;
    if (providerData.skills) document.getElementById('skills').value = providerData.skills.join('، ');
    
    document.getElementById('ratingBadge').textContent = `⭐ ${providerData.rating_avg}`;
    
    const verifyBadge = document.getElementById('verificationBadge');
    if (providerData.is_verified) {
        verifyBadge.textContent = 'موثق ✓';
        verifyBadge.style.backgroundColor = '#D1FAE5';
        verifyBadge.style.color = '#065F46';
    }

    // 3. حفظ التعديلات في قاعدة البيانات (Update CRUD)[cite: 1]
    document.getElementById('providerProfileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('saveBtn');
        const msg = document.getElementById('statusMsg');
        
        btn.disabled = true;
        btn.textContent = 'جاري الحفظ...';
        msg.textContent = '';

        const bio = document.getElementById('bio').value;
        const skillsArray = document.getElementById('skills').value.split('،').map(s => s.trim()).filter(s => s);

        const { error: updateError } = await window.supabaseClient
            .from('providers')
            .update({ bio: bio, skills: skillsArray })
            .eq('id', providerData.id);

        if (updateError) {
            msg.style.color = 'red';
            msg.textContent = 'حدث خطأ أثناء الحفظ: ' + updateError.message;
        } else {
            msg.style.color = 'green';
            msg.textContent = 'تم حفظ التعديلات بنجاح!';
        }

        btn.disabled = false;
        btn.textContent = 'حفظ التعديلات';
    });
});