// reset-password.js
document.getElementById('updatePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const { error } = await window.supabaseClient.auth.updateUser({
        password: newPassword
    });
    
    if (error) {
        alert('حدث خطأ: ' + error.message);
    } else {
        alert('تم تغيير كلمة المرور بنجاح');
        window.location.href = 'login.html';
    }
});