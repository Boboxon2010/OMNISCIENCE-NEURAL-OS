import streamlit as st
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import re
from scipy.integrate import simpson

# 1. KONFIGURATSIYA VA FULL-SCREEN DIZAYN
st.set_page_config(page_title="Infinity Math OS", layout="wide", initial_sidebar_state="collapsed")

st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;900&family=Inter:wght@300;400;600&display=swap');
    
    .stApp {
        background: radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%);
        color: #f8fafc;
        font-family: 'Inter', sans-serif;
    }
    
    /* Premium Glass Cards */
    .glass-panel {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(25px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 25px;
        margin-bottom: 20px;
        transition: 0.4s ease;
    }
    
    .glass-panel:hover {
        border: 1px solid rgba(0, 210, 255, 0.5);
        box-shadow: 0 0 30px rgba(0, 210, 255, 0.2);
    }

    .hero-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 4rem;
        font-weight: 900;
        background: linear-gradient(to right, #00d2ff, #9d50bb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        margin-bottom: 0px;
    }
    </style>
    """, unsafe_allow_html=True)

# --- ASOSIY SAHIFA HEADER ---
st.markdown('<h1 class="hero-title">INFINITY MATH OS</h1>', unsafe_allow_html=True)
st.markdown('<p style="text-align:center; color:#94a3b8; font-size:1.2rem;">Matematik modellashtirish va AI tahlil tizimi</p>', unsafe_allow_html=True)

# 2. AI INTELLIGENCE & SEARCH (Top Section)
with st.container():
    st.markdown('<div class="glass-panel">', unsafe_allow_html=True)
    col_input, col_ai_res = st.columns([2, 1])
    
    with col_input:
        user_query = st.text_input("🔍 AI Solverga so'rov yuboring:", placeholder="Masalan: 'tenglama 1 -5 6' yoki 'sinus funksiyasi'")
    
    with col_ai_res:
        if user_query:
            st.info("AI: So'rov tahlil qilinmoqda...")
        else:
            st.caption("AI tizimi buyruqlarni kutmoqda.")
    st.markdown('</div>', unsafe_allow_html=True)

# 3. INTERAKTIV DASHBOARD (Main Content)
c1, c2 = st.columns([1, 1])

# --- CHAP KOLONNA: FUNKSIYALAR GALEREYASI ---
with c1:
    st.markdown('<div class="glass-panel">', unsafe_allow_html=True)
    st.subheader("📊 Funksiyalar Dinamikasi")
    
    selected_func = st.selectbox("Funksiya turini tanlang:", 
                                ["Parabola (Kvadratik)", "Trigonometrik (To'lqin)", "Eksponentsial (O'sish)", "Logarifmik"])
    
    x = np.linspace(-10, 10, 500)
    if "Parabola" in selected_func:
        y = x**2
        color = "#00d2ff"
    elif "Trigonometrik" in selected_func:
        y = np.sin(x)
        color = "#00ff88"
    elif "Eksponentsial" in selected_func:
        x_exp = np.linspace(0, 5, 100)
        y = np.exp(x_exp)
        x = x_exp
        color = "#ff007f"
    else:
        x_log = np.linspace(0.1, 10, 100)
        y = np.log(x_log)
        x = x_log
        color = "#f59e0b"

    fig, ax = plt.subplots(figsize=(10, 6))
    fig.patch.set_alpha(0)
    ax.set_facecolor('#0f172a')
    ax.plot(x, y, color=color, lw=3, label=selected_func)
    ax.fill_between(x, y, color=color, alpha=0.1)
    ax.tick_params(colors='gray')
    ax.grid(color='#1e293b', linestyle='--')
    st.pyplot(fig)
    st.markdown('</div>', unsafe_allow_html=True)

# --- O'NG KOLONNA: MASSIVLAR VA STATISTIKA ---
with c2:
    st.markdown('<div class="glass-panel">', unsafe_allow_html=True)
    st.subheader("🧬 Massivlar va Ma'lumotlar Tahlili")
    
    # Tasodifiy massiv generatsiyasi (Data Analysis visualization)
    arr_size = st.slider("Massiv hajmi:", 10, 100, 50)
    random_data = np.random.randn(arr_size).cumsum()
    
    df = pd.DataFrame(random_data, columns=["Qiymat"])
    st.line_chart(df, use_container_width=True)
    
    m1, m2, m3 = st.columns(3)
    m1.metric("O'rtacha qiymat", f"{np.mean(random_data):.2f}")
    m2.metric("Maksimum", f"{np.max(random_data):.2f}")
    m3.metric("Variatsiya", f"{np.var(random_data):.2f}")
    
    st.markdown("""
    **Massivlar haqida qisqacha:**
    Matematik massivlar (vektorlar) ma'lumotlarni tartibli saqlash va hisoblashda asosiy rol o'ynaydi. Python'da `numpy` kutubxonasi massivlar bilan ishlashning eng tezkor usuli hisoblanadi.
    """, unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

# 4. FORMULALAR VA MASALALAR (Bottom Section)
st.markdown('<div class="glass-panel">', unsafe_allow_html=True)
st.subheader("🧪 Professional Formula Laboratoriyasi")
f_col1, f_col2, f_col3 = st.columns(3)

with f_col1:
    st.markdown("**Algebra:**")
    st.latex(r"x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}")
    st.caption("Kvadrat tenglamani yechish formulasi")

with f_col2:
    st.markdown("**Geometriya:**")
    st.latex(r"V = \frac{4}{3}\pi r^3")
    st.caption("Shar hajmini hisoblash")

with f_col3:
    st.markdown("**Matematik Analiz:**")
    st.latex(r"\int_{a}^{b} f(x) dx = F(b) - F(a)")
    st.caption("Nyuton-Leybnits formulasi")
st.markdown('</div>', unsafe_allow_html=True)

st.markdown('<p style="text-align:center; color:#444;">Infinity Math OS | v6.0 | Professional Edition</p>', unsafe_allow_html=True)