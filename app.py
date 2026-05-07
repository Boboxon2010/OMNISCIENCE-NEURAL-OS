import streamlit as st
import numpy as np
import re # Matnli qidiruv uchun mantiqiy kutubxona

# 1. AI LOGIC SOLVER ENGINE (Mantiqiy Yechuvchi)
def ai_math_solver(user_input):
    user_input = user_input.lower().strip()
    
    # a) Kvadrat tenglama aniqlash (AI Pattern Recognition)
    if "tenglama" in user_input or "x^2" in user_input:
        nums = re.findall(r'[-+]?\d*\.?\d+', user_input)
        if len(nums) >= 3:
            a, b, c = float(nums[0]), float(nums[1]), float(nums[2])
            d = b**2 - 4*a*c
            if d >= 0:
                x1 = (-b + np.sqrt(d)) / (2*a)
                x2 = (-b - np.sqrt(d)) / (2*a)
                return f"🤖 AI Tahlili: Kvadrat tenglama aniqlandi. Yechim: x1={x1}, x2={x2}. Diskriminant D={d}."
            return f"🤖 AI Tahlili: Diskriminant {d} < 0. Haqiqiy ildizlar yo'q."

    # b) Geometrik shakllar tahlili
    if "aylana" in user_input:
        r = re.findall(r'\d+\.?\d*', user_input)
        if r:
            radius = float(r[0])
            S = np.pi * (radius**2)
            L = 2 * np.pi * radius
            return f"🤖 AI Tahlili: Aylana parametrlari: Yuzi S={S:.2f}, Uzunligi L={L:.2f}."

    # c) Nazariy bilimlar bazasi
    kb = {
        "pifagor": "Pifagor teoremasi to'g'ri burchakli uchburchak uchun: a² + b² = c².",
        "hosila": "Hosila funksiyaning o'zgarish tezligini bildiradi.",
        "integral": "Integral egri chiziq ostidagi yuzani ifodalaydi."
    }
    
    for key in kb:
        if key in user_input:
            return f"📚 AI Bilimi: {kb[key]}"
            
    return "😔 AI Xulosasi: So'rovingiz tushunarsiz. Iltimos, 'tenglama 1 -5 6' yoki 'aylana 5' kabi aniqroq yozing."

# 2. INTERFEYS (UI)
st.markdown('<div class="ai-card">', unsafe_allow_html=True)
st.subheader("🧠 Haqiqiy AI Qidiruv va Masala Yechuvchi")

user_query = st.text_input("Masalani yoki tushunchani yozing:", placeholder="Masalan: 'tenglama 1 -7 12' yoki 'aylana radiusi 10'")

if user_query:
    response = ai_math_solver(user_query)
    # AI javobini "Liquid Glass" uslubida chiqarish
    st.markdown(f"""
        <div style="background: rgba(0, 210, 255, 0.1); border-radius: 15px; padding: 20px; border: 1px solid #00d2ff;">
            <p style="color: #00d2ff; font-weight: bold; margin: 0;">{response}</p>
        </div>
    """, unsafe_allow_html=True)
st.markdown('</div>', unsafe_allow_html=True)