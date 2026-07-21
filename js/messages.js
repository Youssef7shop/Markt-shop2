// js/messages.js

// 1. الاستماع للرسائل الجديدة لحظياً
const channel = window.supabaseClient
  .channel('public:messages')
  .on('postgres_changes', { 
      event: 'INSERT', 
      schema: 'public', 
      table: 'messages',
      filter: `conversation_id=eq.${currentConversationId}` // فلترة حسب المحادثة الحالية
  }, payload => {
      appendMessageToUI(payload.new); // إضافة الرسالة الجديدة للواجهة فوراً
  })
  .subscribe();

// 2. إرسال رسالة جديدة
async function sendMessage(content) {
    const { data, error } = await window.supabaseClient
        .from('messages')
        .insert([{
            conversation_id: currentConversationId,
            sender_id: currentUser.id,
            content: content
        }]);
    
    if (error) console.error('خطأ في الإرسال:', error);
}