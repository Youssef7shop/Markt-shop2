// forgot-password.js
document.getElementById('forgotForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password.html',
    });
    const msg = document.getElementById('resetMsg');
    if (error) {
        msg.style.color = 'red';
        msg.textContent = error.message;
    } else {
        msg.style.color = 'green';
        msg.textContent = 'تم إرسال رابط الاستعادة إلى بريدك.';
    }
});