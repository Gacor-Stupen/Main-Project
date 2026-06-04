# IBM HR Analytics: Employee Attrition Analysis & Data Preparation

Proyek ini berisi proses analisis data dan persiapan dataset menggunakan IBM HR Attrition Dataset. Fokus utama proyek adalah memahami faktor-faktor yang berhubungan dengan tingkat keluar masuk karyawan (*employee attrition*) serta menyiapkan data yang siap digunakan untuk proses pemodelan *machine learning*.

Selain melakukan *Exploratory Data Analysis* (EDA), proyek ini juga mencakup tahapan *feature engineering*, penanganan *outlier*, transformasi data kategorikal, normalisasi fitur, hingga penyeimbangan kelas menggunakan SMOTE.

---

## Fitur Utama

Beberapa tahapan yang dilakukan dalam proyek ini antara lain:

* Pemisahan data latih dan data uji sebelum proses transformasi untuk mengurangi risiko *data leakage*.
* Pembuatan beberapa fitur baru seperti `StagnationIndex`, `BurnoutFlag`, `OverallSatisfaction`, dan `YearsPerCompany`.
* Penanganan ketidakseimbangan kelas pada variabel target menggunakan SMOTE.
* Penanganan nilai ekstrem (*outlier*) dengan metode Winsorizing berbasis IQR.
* Transformasi variabel kategorikal menggunakan One-Hot Encoding.
* Standardisasi fitur numerik menggunakan StandardScaler.

---

## Hasil Analisis

Beberapa temuan utama dari proses EDA antara lain:

1. **OverTime memiliki hubungan yang kuat dengan attrition.** Karyawan yang bekerja lembur memiliki tingkat attrition sebesar 30,53%, sedangkan karyawan tanpa lembur memiliki tingkat attrition sebesar 10,44%.

2. **Karyawan baru dengan gaji rendah memiliki risiko attrition tertinggi.** Kelompok ini memiliki tingkat attrition sebesar 28,85%, lebih tinggi dibandingkan kelompok karyawan dengan masa kerja yang lebih lama.

Temuan ini menunjukkan bahwa faktor masa kerja awal, kompensasi, dan beban kerja memiliki pengaruh yang cukup besar terhadap keputusan karyawan untuk bertahan atau keluar dari perusahaan.

---

## Alur Persiapan Data

Tahapan yang dilakukan pada notebook adalah sebagai berikut:

1. Pemeriksaan kualitas data (missing values dan data duplikat).
2. Seleksi fitur dan penghapusan beberapa variabel yang kurang relevan.
3. Pembuatan fitur baru (*feature engineering*).
4. Pembagian data menjadi data latih dan data uji.
5. Penanganan outlier menggunakan Winsorizing.
6. Transformasi variabel kategorikal dengan One-Hot Encoding.
7. Standardisasi fitur numerik menggunakan StandardScaler.
8. Penyeimbangan kelas menggunakan SMOTE pada data latih.
9. Ekspor dataset hasil preprocessing untuk kebutuhan pemodelan.

---

## Dataset

Dataset yang digunakan adalah IBM HR Analytics Employee Attrition & Performance yang berisi 1.470 data karyawan dengan berbagai atribut terkait profil karyawan, pekerjaan, kepuasan kerja, dan performa. Variabel target yang digunakan adalah `Attrition`, yaitu status apakah karyawan keluar (*Yes*) atau tetap bekerja (*No*).
