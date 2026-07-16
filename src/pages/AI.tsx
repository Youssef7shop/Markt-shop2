import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Bot, Send, User, Loader2 } from 'lucide-react';

export function AIPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'أهلاً بك في مساعد Boostify الذكي. كيف يمكنني مساعدتك في تحليل البيانات أو إدارة المنصة اليوم؟' },
    { role: 'user', text: 'أريد تقرير مختصر عن أداء المبيعات هذا الشهر مقارنة بالشهر الماضي.' },
    { role: 'assistant', text: 'بناءً على البيانات الحالية، إجمالي المبيعات هذا الشهر بلغ $45,231، وهو يمثل زيادة بنسبة 20.1% مقارنة بالشهر الماضي. الأقسام الأكثر نمواً هي "تطوير المواقع" و "التسويق الرقمي". هل ترغب في إنشاء تقرير مفصل بصيغة PDF؟' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: 'عذراً، هذا مجرد عرض تجريبي. لربط الذكاء الاصطناعي الفعلي، يجب دمج واجهة برمجة التطبيقات (API) الخاصة بـ Gemini.' 
      }]);
    }, 1500);
  };

  return (
    <div className="p-8 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-gold-500" />
          الذكاء الاصطناعي
        </h1>
        <p className="text-gray-400 text-sm mt-1">مساعد ذكي لتحليل البيانات، إنشاء التقارير واقتراحات التحسين</p>
      </div>

      <div className="flex-1 bg-surface border border-border rounded-xl flex flex-col overflow-hidden min-h-[500px]">
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'mr-auto flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                msg.role === 'assistant' ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' : 'bg-[#0B0D10] text-gray-400 border border-border'
              }`}>
                {msg.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
              </div>
              <div className={`p-4 rounded-xl text-sm leading-relaxed ${
                msg.role === 'assistant' ? 'bg-[#0B0D10] border border-border text-gray-300' : 'bg-gold-500 text-black font-medium'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 max-w-3xl">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gold-500/10 text-gold-500 border border-gold-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <div className="p-4 rounded-xl text-sm leading-relaxed bg-[#0B0D10] border border-border text-gray-300 flex items-center gap-1.5 h-[52px]">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-border bg-[#0B0D10]">
          <div className="relative flex items-center max-w-4xl mx-auto">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب رسالتك أو استفسارك هنا..." 
              className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-white"
            />
            <button 
              onClick={handleSend}
              className="absolute left-2 w-8 h-8 flex items-center justify-center bg-gold-500 text-black rounded-lg hover:bg-gold-400 transition-colors">
              <Send className="w-4 h-4 -mr-1" />
            </button>
          </div>
          <div className="text-center mt-2 text-xs text-gray-500">
            قد يقدم الذكاء الاصطناعي معلومات غير دقيقة. يرجى التحقق من البيانات الهامة.
          </div>
        </div>
      </div>
    </div>
  );
}
