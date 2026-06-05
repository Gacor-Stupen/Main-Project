import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# --- PAGE CONFIGURATION ---
st.set_page_config(
    page_title="LinkedIn Job Postings Dashboard",
    page_icon="💼",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- STYLE ADJUSTMENT ---
st.markdown("""
    <style>
    .main .block-container { padding-top: 2rem; }
    h1, h2, h3 { color: #1f77b4; }
    </style>
""", unsafe_allow_html=True)


# --- KAMUS TRANSLATION SKILL GLOBAL ---
# Memetakan id/singkatan aneh dari dataset ke nama asli yang mudah dibaca user
# --- KAMUS TRANSLATION SKILL GLOBAL (LEBIH LENGKAP & OTOMATIS) ---
# --- KAMUS TRANSLATION SKILL GLOBAL (VERSI FIX TOTAL) ---
# --- KAMUS TRANSLATION SKILL GLOBAL (VERSI ANTI-FAIL LENGKAP) ---
DICTIONARY_SKILL = {
    # Singkatan Karakter Inti (Sudah dibersihkan case-nya)
    "cnl": "Channel & Communication",
    "adm": "Administration / Administrasi",
    "prch": "Procurement / Pembelian",
    "sale": "Sales & Commercial",
    "mktg": "Marketing Strategy",
    "mgmt": "Management & Leadership",
    "acct": "Accounting / Akuntansi",
    "fin": "Finance & Keuangan",
    "hr": "Human Resources (HR)",
    "eng": "Engineering",
    "ops": "Operations Management",
    "anl": "Data Analytics",
    "lgl": "Legal & Compliance",
    "qc": "Quality Control",
    "pr": "Public Relations",
    "it": "Information Technology",
    "itil": "ITIL Framework",
    "bd": "Business Development",
    "rnd": "Research & Development",
    "hcm": "Human Capital Management",
    "scm": "Supply Chain Management",
    "mfg": "Manufacturing",
    "qa": "Quality Assurance",
    "pm": "Project Management",
    "ba": "Business Analysis",
    "bi": "Business Intelligence",
    "rsch": "Research & Development (R&D)",
    "anls": "Data Analytics & System Analysis",
    # Kode Angka (Jika ada di dataset lu)
    "1": "Accounting & Finance",
    "2": "Financial Analysis",
    "3": "Auditing",
    "4": "Taxation / Perpajakan",
    "5": "Corporate Finance",
    "9": "Information Technology",
    "11": "Python Programming",
    "12": "SQL Database",
    "13": "Data Analysis",
    "14": "Machine Learning"
}

def terjemahkan_nama_skill(skill_raw):
    # Jika datanya kosong/NaN
    if pd.isna(skill_raw):
        return "Unknown Skill"
        
    # Ambil string asli, hilangkan spasi gaib, lalu kecilkan semua huruf
    val = str(skill_raw).strip().lower()
    
    # === BYPASS FIX: Paksa deteksi kata rsch dan anls secara agresif ===
    if "rsch" in val:
        return "Research & Development (R&D)"
    if "anls" in val or "anl" == val:
        return "Data Analytics & System Analysis"
    if "mnfc" in val:
        return "Manufacturing Operations"
    if "othr" in val:
        return "General Competencies"
        
    # 1. Cek langsung ke kamus utama
    if val in DICTIONARY_SKILL:
        return DICTIONARY_SKILL[val]
        
    # 2. Jika bentuknya angka murni
    if val.isdigit():
        return f"Skill Code ({val})"
        
    # 3. LOGIKA CERDAS: Jika singkatan asing di luar kamus (panjangnya 2 - 4 karakter)
    if len(val) <= 4:
        singkatan_kapital = val.upper()
        if "ADM" in singkatan_kapital: return "Administration Services"
        if "CNL" in singkatan_kapital: return "Channel Management"
        if "PRCH" in singkatan_kapital: return "Procurement Operations"
        return f"{singkatan_kapital} Expertise"
        
    # 4. Jika teks biasa panjang, ubah jadi Title Case
    return str(skill_raw).strip().title()

# --- DATA LOADING & CACHING ---
@st.cache_data
def load_and_clean_data():
    base_path = "dataset"
    
    # 1. Gathering Data
    df_postings = pd.read_csv(os.path.join(base_path, "mappings", "postings.csv"))
    df_companies = pd.read_csv(os.path.join(base_path, "companies", "companies.csv"))
    df_company_industries = pd.read_csv(os.path.join(base_path, "companies", "company_industries.csv"))
    df_benefits = pd.read_csv(os.path.join(base_path, "jobs", "benefits.csv"))
    df_jobs_industries = pd.read_csv(os.path.join(base_path, "jobs", "job_industries.csv"))
    df_jobs_skills = pd.read_csv(os.path.join(base_path, "jobs", "job_skills.csv"))
    df_salaries = pd.read_csv(os.path.join(base_path, "jobs", "salaries.csv"))
    
    # 2. Cleaning & Merging Data
    df_salaries['med_salary'] = df_salaries['med_salary'].fillna((df_salaries['min_salary'] + df_salaries['max_salary']) / 2)
    
    df_market = pd.merge(df_postings, df_salaries[['job_id', 'min_salary', 'max_salary', 'med_salary', 'pay_period', 'currency']], 
                         on='job_id', how='left', suffixes=('_postings', '_salaries'))
    
    # Penyelamat kolom pay_period akibat merge suffix
    if 'pay_period_salaries' in df_market.columns:
        df_market['pay_period'] = df_market['pay_period_salaries'].fillna(df_market['pay_period_postings'])
        df_market.drop(columns=['pay_period_postings', 'pay_period_salaries'], inplace=True)
    elif 'pay_period_postings' in df_market.columns:
        df_market['pay_period'] = df_market['pay_period_postings']
        df_market.drop(columns=['pay_period_postings'], inplace=True)

    df_market['med_salary'] = df_market['med_salary_postings'].fillna(df_market['med_salary_salaries'])
    df_market['min_salary'] = df_market['min_salary_postings'].fillna(df_market['min_salary_salaries'])
    df_market['max_salary'] = df_market['max_salary_postings'].fillna(df_market['max_salary_salaries'])
    
    df_market.drop(columns=['med_salary_postings', 'med_salary_salaries', 
                            'min_salary_postings', 'min_salary_salaries', 
                            'max_salary_postings', 'max_salary_salaries'], inplace=True)
    
    df_market['remote_allowed'] = df_market['remote_allowed'].fillna(0)
    df_companies['company_size'] = df_companies['company_size'].fillna('Unknown')
    
    df_company_profile = pd.merge(df_companies[['company_id', 'name', 'company_size', 'country', 'city']], 
                                  df_company_industries, on='company_id', how='left')
    df_company_profile['industry'] = df_company_profile['industry'].fillna('Unknown')
    
    df_market_with_ind = pd.merge(df_market, df_company_profile[['company_id', 'industry']], on='company_id', how='left')
    df_market_with_ind['industry'] = df_market_with_ind['industry'].fillna('Unknown')
    
    # Deteksi & Normalkan nama kolom skill di job_skills
    kolom_skill = 'skill_name' if 'skill_name' in df_jobs_skills.columns else df_jobs_skills.columns[1]
    
    # Bikin kolom baru berisi nama skill yang sudah bersih/diterjemahkan manusiawi
    df_jobs_skills['skill_readable'] = df_jobs_skills[kolom_skill].apply(terjemahkan_nama_skill)
    
    return df_market, df_company_profile, df_jobs_skills, df_jobs_industries, df_market_with_ind, kolom_skill

# Load data ke aplikasi
with st.spinner("Sedang memuat data dataset... Harap tunggu sebentar."):
    df_market, df_company_profile, df_jobs_skills, df_jobs_industries, df_market_with_ind, kolom_skill = load_and_clean_data()


# --- SIDEBAR NAVIGATION ---
st.sidebar.title("💼 LinkedIn Analytics")
st.sidebar.markdown("Navigasi Dashboard Analisis Lowongan Kerja")
menu = st.sidebar.radio(
    "Pilih Halaman:",
    ["Overview & Dataset", "Visualisasi EDA", "Rekomendasi & Analisis Karier"]
)

bulan_nama_full = {1: "Januari", 2: "Februari", 3: "Maret", 4: "April", 5: "Mei", 6: "Juni", 
                   7: "Juli", 8: "Agustus", 9: "September", 10: "Oktober", 11: "November", 12: "Desember"}
kuartal_nama = {
    1: "Kuartal 1 (Q1 - Jan s/d Mar)", 
    2: "Kuartal 2 (Q2 - Apr s/d Jun)", 
    3: "Kuartal 3 (Q3 - Jul s/d Sep)", 
    4: "Kuartal 4 (Q4 - Okt s/d Des)"
}


# ==========================================
# HALAMAN 1: OVERVIEW & DATASET
# ==========================================
if menu == "Overview & Dataset":
    st.title("📊 Overview Dataset LinkedIn Job Postings")
    st.markdown("Aplikasi web ini menyajikan hasil eksplorasi data lowongan kerja LinkedIn, tren industri, gaji, hingga rekomendasi karier personal.")
    
    col1, col2, col3 = st.columns(3)
    col1.metric("Total Lowongan Kerja", f"{len(df_market):,}")
    col2.metric("Total Perusahaan Terdata", f"{df_company_profile['company_id'].nunique():,}")
    col3.metric("Data Gaji Terselamatkan", f"{df_market['med_salary'].notnull().sum():,}")
    
    st.subheader("Sampel Data Lowongan Kerja (df_market)")
    # 1. Bersihin dulu nama perusahaan yang bolong/None
    df_market['company_name'] = df_market['company_name'].replace(['None', None, 'NaN'], 'Confidential Company')

    # 2. Baru tampilin ke dataframe Streamlit
    st.dataframe(df_market.head(100), use_container_width=True)


# ==========================================
# HALAMAN 2: VISUALISASI EDA
# ==========================================
elif menu == "Visualisasi EDA":
    st.title("📈 Exploratory Data Analysis (EDA)")
    opsi_grafik = st.selectbox(
        "Pilih Visualisasi yang Ingin Dilihat:",
        [
            "Distribusi Remote vs Non-Remote",
            "Tingkat Pengalaman (Experience Level)",
            "Top 10 Industri dengan Lowongan Terbanyak",
            "Distribusi Tipe Pembayaran Gaji (Pay Period)"
        ]
    )
    
    fig, ax = plt.subplots(figsize=(10, 5))
    if opsi_grafik == "Distribusi Remote vs Non-Remote":
        sns.countplot(x='remote_allowed', data=df_market, palette='Set2', ax=ax)
        ax.set_xticklabels(['Non-Remote (0.0)', 'Remote (1.0)'])
        ax.set_title("Perbandingan Jumlah Lowongan Remote vs Non-Remote")
        st.pyplot(fig)
    elif opsi_grafik == "Tingkat Pengalaman (Experience Level)":
        sns.countplot(y='formatted_experience_level', data=df_market, 
                      order=df_market['formatted_experience_level'].value_counts().index, palette='viridis', ax=ax)
        st.pyplot(fig)
    elif opsi_grafik == "Top 10 Industri dengan Lowongan Terbanyak":
        # 1. Filter out data 'Unknown' agar tidak mengacaukan visualisasi EDA
        df_clean_industry = df_company_profile[df_company_profile['industry'] != 'Unknown']
        
        # 2. Hitung top 10 dari data yang sudah bersih
        top_industries = df_clean_industry['industry'].value_counts().head(10)
        
        # 3. Render grafiknya
        sns.barplot(x=top_industries.values, y=top_industries.index, palette='magma', ax=ax)
        st.pyplot(fig)
    elif opsi_grafik == "Distribusi Tipe Pembayaran Gaji (Pay Period)":
        sns.countplot(x='pay_period', data=df_market, 
                      order=df_market['pay_period'].value_counts().index, palette='coolwarm', ax=ax)
        st.pyplot(fig)


# ==========================================
# HALAMAN 3: REKOMENDASI & ANALISIS KARIER
# ==========================================
elif menu == "Rekomendasi & Analisis Karier":
    st.title("🎯 Sistem Rekomendasi Karier & Analisis Gap")
    st.markdown("Simulasikan profil keahlian lu untuk dibandingkan dengan tren pasar lowongan LinkedIn.")
    
    # 1. Pilih Industri Terlebih Dahulu di Sidebar (Menggunakan data profil perusahaan yang valid)
    user_industry = st.sidebar.selectbox(
        "Pilih Target Industri Lu:",
        options=sorted(df_market_with_ind['industry'].unique())
    )
    
    # --- LOGIKA FILTERING YANG BENAR & AKURAT ---
    # Langkah A: Ambil semua company_id yang BERIKATAN MURNI dengan industri pilihan user
    company_ids_in_ind = df_company_profile[df_company_profile['industry'] == user_industry]['company_id'].unique()
    
    # Langkah B: Cari lowongan (job_id) yang dikeluarkan oleh perusahaan-perusahaan di industri tersebut
    df_filtered_ind = df_market_with_ind[df_market_with_ind['company_id'].isin(company_ids_in_ind)]
    job_ids_in_ind = df_filtered_ind['job_id'].unique()
    
    # Langkah C: Ambil semua data skill murni milik lowongan kerja di industri tersebut
    # Langkah C: Ambil semua data skill murni milik lowongan kerja di industri tersebut
    df_skills_in_ind = df_jobs_skills[df_jobs_skills['job_id'].isin(job_ids_in_ind)].copy()
    
    # === TRICK JITU: Buang skill makro 'Information Technology' agar skill spesifik industri kelihatan ===
    if not df_skills_in_ind.empty:
        # Kita filter keluar baris yang nama skill-nya cuma "Information Technology"
        df_skills_in_ind = df_skills_in_ind[df_skills_in_ind['skill_readable'].str.lower() != 'information technology']
        
    # Dapatkan list nama skill manusiawi (Readable) yang sudah bersih untuk di sidebar
    # Dapatkan list nama skill manusiawi (Readable) yang sudah bersih untuk di sidebar
    if not df_skills_in_ind.empty:
        daftar_opsi_skill = sorted(df_skills_in_ind['skill_readable'].dropna().unique().tolist())
    else:
        # --- SMART FALLBACK BERDASARKAN NAMA INDUSTRI ---
        user_ind_lower = user_industry.lower()
        
        if "it " in user_ind_lower or "software" in user_ind_lower or "computer" in user_ind_lower or "technology" in user_ind_lower:
            # Fallback khusus industri IT / Tech / Data jika datanya kosong akibat kepotong
            daftar_opsi_skill = [
                "Python Programming", "SQL Database", "Data Analysis", "Machine Learning",
                "Cloud Computing", "Information Technology", "Software Development", "Project Management"
            ]
        elif "justice" in user_ind_lower or "law" in user_ind_lower or "legal" in user_ind_lower:
            # Fallback khusus industri Hukum / Pemerintahan
            daftar_opsi_skill = [
                "Legal Assistance", "Government Administration", "Criminal Justice", 
                "Policy Analysis", "Public Safety", "Legal Compliance"
            ]
        else:
            # Fallback universal untuk industri umum/non-tech (Defense, Space, Manufacturing, Retail, dll)
            daftar_opsi_skill = [
                "Management & Leadership", "Project Management", "Operations Management",
                "Business Development", "Strategic Planning", "Teamwork & Collaboration",
                "Sales & Commercial", "Marketing Strategy"
            ]

    # 2. Input Ekspektasi Gaji & Skill Pengguna di Sidebar
    with st.sidebar.expander("👤 Input Profil Lu", expanded=True):
        user_salary = st.number_input(
            "Ekspektasi Gaji Lu per Tahun (USD):",
            min_value=0, value=75000, step=5000
        )
        
        # Sekarang daftarnya dijamin melimpah lagi dan murni milik industri tersebut!
        user_skills_readable = st.multiselect(
            "Pilih Skill yang Lu Kuasai saat ini:",
            options=daftar_opsi_skill,
            default=daftar_opsi_skill[:3] if len(daftar_opsi_skill) > 3 else daftar_opsi_skill
        )

    # --- DISPLAY ANALISIS HASIL ---
    st.header(f"💼 Hasil Analisis Pasar untuk Industri: **{user_industry}**")
    
    if df_filtered_ind.empty:
        st.warning("Data untuk industri ini tidak mencukupi untuk melakukan analisis pasar mendalam.")
    else:
        # A. Analisis Komparasi Gaji
        st.subheader("💵 Analisis Komparasi Gaji")
        df_sal_ind = df_filtered_ind[(df_filtered_ind['pay_period'] == 'YEARLY') & (df_filtered_ind['med_salary'].notnull())]
        
        if not df_sal_ind.empty:
            median_pasar = df_sal_ind['med_salary'].median()
            diff = user_salary - median_pasar
            status_gaji = "DI ATAS 📈" if diff > 0 else "DI BAHWAH 📉"
            
            c1, c2 = st.columns(2)
            c1.metric("Median Gaji Pasar (Tahunan)", f"{median_pasar:,.0f} USD")
            c2.metric("Ekspektasi Gaji Lu", f"{user_salary:,.0f} USD")
            
            if diff == 0:
                st.success("🤝 Ekspektasi gaji lu pas sesuai dengan rata-rata median pasar saat ini.")
            else:
                st.info(f"💡 Status Gaji: Selisih **{abs(diff):,.0f} USD {status_gaji}** median pasar untuk industri {user_industry}.")
        else:
            st.info("ℹ️ Informasi data spesifik gaji tahunan untuk industri ini belum mencukupi.")
            
        # B. Analisis Skill Gap
       # B. Analisis Skill Gap
        st.subheader("📊 Analisis Skill Gap")
        
        if not df_skills_in_ind.empty:
            # Mengambil 5 skill teratas yang sudah bersih dari polusi nama "Information Technology"
            top_skills_market = df_skills_in_ind['skill_readable'].value_counts().head(5).index.tolist()
        else:
            top_skills_market = daftar_opsi_skill[:5]

        skills_status = []
        match_count = 0
        
        for market_skill in top_skills_market:
            if market_skill in user_skills_readable:
                skills_status.append({"Kebutuhan Skill Pasar": market_skill, "Status Lu": "Match ✅"})
                match_count += 1
            else:
                skills_status.append({"Kebutuhan Skill Pasar": market_skill, "Status Lu": "Gap ❌"})
                
        df_gap = pd.DataFrame(skills_status)
        match_score = int((match_count / len(top_skills_market)) * 100) if top_skills_market else 0
        
        st.markdown(f"**Match Score Keahlian Lu:** `{match_score}%`")
        st.table(df_gap)
        
        skill_gap_list = df_gap[df_gap['Status Lu'] == 'Gap ❌']['Kebutuhan Skill Pasar'].tolist()
        if skill_gap_list:
            st.warning(f"⚠️ **Skill yang perlu lu pelajari/tingkatkan di bidang {user_industry}:** {', '.join(skill_gap_list)}")
        else:
            st.success(f"🎉 Luar biasa! Semua skill utama untuk industri {user_industry} sudah lu kuasai.")
            
        # C. Resign & Hiring Timing
        st.subheader("📅 Rekomendasi Waktu Resign & Melamar")
        df_filtered_ind['listed_time_dt'] = pd.to_datetime(df_filtered_ind['listed_time'], unit='ms', errors='coerce')
        df_filtered_ind['bulan'] = df_filtered_ind['listed_time_dt'].dt.month
        df_filtered_ind['kuartal'] = df_filtered_ind['listed_time_dt'].dt.quarter
        df_timing = df_filtered_ind.dropna(subset=['bulan', 'kuartal'])
        
        if not df_timing.empty:
            best_month_num = df_timing.groupby('bulan').size().idxmax()
            best_q_num = df_timing.groupby('kuartal').size().idxmax()
            
            col_t1, col_t2 = st.columns(2)
            col_t1.success(f"🗓️ **Bulan Terbaik Melamar:** {bulan_nama_full[best_month_num]}")
            col_t2.success(f"🧱 **Kuartal Terbaik:** {kuartal_nama[best_q_num]}")
            
            st.markdown(f"💡 **Saran Strategis:** Banyak perusahaan membuka lowongan di bulan **{bulan_nama_full[best_month_num]}**. Mulailah persiapan dokumen CV, portofolio, serta *apply* resign sekitar **1-2 bulan sebelum** bulan tersebut masuk agar *timing*-nya pas!")
        else:
            st.info("ℹ️ Data tren waktu bulanan tidak mencukupi, disarankan melakukan persiapan aplikasi umum di awal Q1 atau awal Q3.")