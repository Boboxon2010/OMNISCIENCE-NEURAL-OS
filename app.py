import streamlit as st
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import re
from scipy.integrate import simpson

# 1. SAHIFA KONFIGURATSIYASI (To'liq ekran)
st.set_page_config(page_title="Infinity Math OS", layout="wide", initial_sidebar_state="collapsed")

# 2. PREMIUM DARK & LIQUID CSS
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;900&family=Inter:wght@300;400;600&display=swap');
    
    .stApp {
        background: radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%);
        color: #f8fafc;
        font-family: 'Inter', sans-serif;
    }
    
    .glass-panel {
        background: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 25px;
        margin-bottom: 20px;
        transition: 0.3s ease;
    }
    
    .glass-panel:hover {
        border-color: #00d2ff;
        box-shadow: 0 0 20px rgba(0, 210, 255, 0.1);
    }

    .hero-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 3.5rem;
        background: linear-gradient(to right, #00d2ff, #9d50bb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        font-weight: 900;
    }
    </style>
    """, unsafe_allow_html=True)

st.markdown('<h1 class="hero-title">INFINITY MATH OS</h1>', unsafe_allow_html=True)

# 3. AI LOGIC & SEARCH ENGINE
def ai_logic_solver(q):
    q = q.lower().strip()
    if "tenglama" in q:
        nums = re.findall(r'[-+]?\d*\.?\d+', q)
        if len(nums) >= 3:
            a, b, c = map(float, nums[:3])
            d = b**2 - 4*a*c
            return f"🤖 AI: Kvadrat tenglama aniqlandi. D={d}. " + (f"x1={(-b+np.sqrt(d))/(2*a):.2f}" if d>=0 else "Ildiz yo'q.")
    if "aylana" in q:
        r = re.findall(r'\d+\.?\d*', q)
        if r: return f"🤖 AI: Radiusi {r[0]} bo'lgan aylana yuzi: {np.pi*float(r[0])**2:.2f}"
    return "🧠 AI: Matematik so'rov kutilmoqda..."

# AI Qidiruv paneli
with st.container():
    st.markdown('<div class="glass-panel">', unsafe_allow_html=True)
    q_col, r_col = st.columns([2, 1])
    user_query = q_col.text_input("🔍 AI Solver:", placeholder="Masalan: 'tenglama 1 -5 6'")
    r_col.info(ai_logic_solver(user_query) if user_query else "So'rovni kiriting...")
    st.markdown('</div>', unsafe_allow_html=True)

# 4. DASHBOARD (Yonma-yon grafiklar)
col1, col2 = st.columns(2)

with col1:
    st.markdown('<div class="glass-panel">', unsafe_allow_html=True)
    st.subheader("📊 Funksiyalar Dinamikasi")
    f_type = st.selectbox("Tur:", ["Sinusoida", "Parabola", "Eksponenta"])
    
    x = np.linspace(-10, 10, 500)
    y = np.sin(x) if f_type == "Sinusoida" else (x**2 if f_type == "Parabola" else np.exp(x/2))
    
    fig, ax = plt.subplots(figsize=(10, 5))
    fig.patch.set_alpha(0)
    ax.set_facecolor('#0f172a')
    ax.plot(x, y, color='#00d2ff', lw=3)
    ax.fill_between(x, y, color='#00d2ff', alpha=0.1)
    ax.tick_params(colors='gray')
    st.pyplot(fig)
    st.markdown('</div>', unsafe_allow_html=True)

with col2:
    st.markdown('<div class="glass-panel">', unsafe_allow_html=True)
    st.subheader("🧬 Massivlar Analitikasi")
    size = st.slider("Hajm:", 20, 200, 100)
    data = np.random.randn(size).cumsum()
    
    st.line_chart(pd.DataFrame(data, columns=["Trend"]), height=250)
    
    m1, m2 = st.columns(2)
    m1.metric("O'rtacha", f"{np.mean(data):.2f}")
    m2.metric("Maksimum", f"{np.max(data):.2f}")
    st.markdown('</div>', unsafe_allow_html=True)

# 5. FORMULA LABORATORIYASI
st.markdown('<div class="glass-panel">', unsafe_allow_html=True)
st.subheader("🧪 Formula Laboratoriyasi")
c1, c2, c3 = st.columns(3)
c1.latex(r"x_{1,2} = \frac{-b \pm \sqrt{D}}{2a}")
c2.latex(r"\int_{a}^{b} f(x) dx")
c3.latex(r"e^{i\pi} + 1 = 0")
st.markdown('</div>', unsafe_allow_html=True)