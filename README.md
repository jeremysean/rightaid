# RightAid

**Ekonomi + Tepat Sasaran**
*Dicoding x Microsoft Elevate Datathon 2025 | Tema: Ekonomi Digital & Inklusi Keuangan*

## Tentang Proyek

RightAid adalah platform analitik berbasis web yang dirancang khusus untuk membantu analis kebijakan mengevaluasi potensi mis-targeting dalam program perlindungan sosial Indonesia. Platform ini dibangun untuk menjawab tantangan struktural dalam penyaluran bantuan sosial, di mana exclusion error dan inclusion error masih menjadi masalah akibat kelemahan metode Proxy Means Testing (PMT) konvensional yang tidak diperbarui secara real-time.

Platform ini menggabungkan dua kapabilitas utama:
1. **Synthetic Data Engine**: Pipeline otomatis yang menghasilkan dataset rumah tangga sintetis secara statistik realistis berdasarkan distribusi agregat BPS (Susenas dan Regsosek), yang kemudian diinjeksi dengan skenario anomali mis-targeting.
2. **ML-PMT Dashboard**: Antarmuka interaktif yang menyajikan hasil model klasifikasi, membandingkan prediksi Machine Learning dengan PMT konvensional, serta memvisualisasikan fitur yang paling prediktif melalui panel SHAP (SHapley Additive exPlanations).

## Fitur Utama

* **Synthetic Data Generator**: Membangun dataset rumah tangga sintetis per provinsi yang representatif berdasarkan distribusi Susenas BPS.
* **Anomaly Injection Engine**: Menanamkan skenario mis-targeting terprogram (seperti PHK massal atau dampak bencana alam) untuk mensimulasikan kondisi dunia nyata.
* **ML-PMT Model**: Menggunakan XGBoost untuk memprediksi desil kesejahteraan dan mendeteksi anomali, yang dibandingkan langsung dengan baseline Logistic Regression dan skor PMT konvensional.
* **SHAP Explainability Panel**: Visualisasi interaktif yang menjelaskan kontribusi setiap variabel terhadap prediksi model secara intuitif.
* **Perbandingan Langsung**: Menampilkan confusion matrix dan daftar detail rumah tangga yang diprediksi berbeda antara model PMT konvensional dan ML.
* **Policy Brief Generator**: Menggunakan layanan AI (Natural Language Generation) untuk merangkum hasil rekomendasi kebijakan dalam Bahasa Indonesia secara otomatis dan cepat.

## Teknologi yang Digunakan

* **Frontend & Visualisasi**: HTML, CSS, JavaScript, React, Recharts, Leaflet.js
* **Backend & API**: Python, FastAPI
* **Data Science & ML**: NumPy, SciPy, pandas, scikit-learn, XGBoost, SHAP
* **Cloud Services**: Azure Machine Learning, Azure AI Language, Azure Static Web Apps

## Mode Operasi: Live vs Demo

RightAid dapat berjalan dalam dua mode, dipilih secara otomatis berdasarkan konfigurasi backend:

* **Mode Live** — frontend terhubung ke RightAid API (FastAPI). Login menggunakan JWT, dataset sintetis dibangun di server, dan inferensi model XGBoost + SHAP + policy brief (Azure OpenAI) berjalan secara nyata.
* **Mode Demo** — bila tidak ada backend yang dikonfigurasi (atau backend tidak dapat dihubungi), frontend otomatis memakai *fallback* data sintetis lokal (`js/data.js`) sehingga prototipe tetap berfungsi penuh (mis. saat dideploy statis di Netlify). Indikator status koneksi (**Live** / **Mode Demo**) ditampilkan pada topbar setiap halaman.

### Menghubungkan ke Backend

Atur URL backend melalui salah satu cara berikut (diperiksa berurutan):

1. Edit `js/config.js` &rarr; `window.RIGHTAID_CONFIG = { API_BASE: "https://your-backend" }`.
2. Tambahkan query param `?api=https://your-backend` pada URL (otomatis tersimpan ke `localStorage`).
3. Set `localStorage` key `rightaid_api_base` melalui console browser.

Kosongkan `API_BASE` untuk memaksa Mode Demo. Backend repo & instruksi deployment tersedia terpisah (FastAPI di `backend/`).

Kredensial demo: `guest@rightaid.id` / `guest123`.

## Cara Menjalankan Proyek (Frontend)

Repositori ini difokuskan pada antarmuka pengguna (frontend) yang dibangun menggunakan file statis murni (HTML, CSS, JS). Anda dapat menjalankan prototipe ini di lingkungan lokal dengan salah satu cara berikut:

### 1. Menggunakan VS Code Live Server (Direkomendasikan)
1. Buka folder proyek di Visual Studio Code.
2. Pastikan Anda telah menginstal ekstensi **Live Server**.
3. Klik kanan pada file `index.html` dan pilih **Open with Live Server**.
4. Browser akan otomatis terbuka dan memuat halaman web (biasanya di `http://127.0.0.1:5500`).

### 2. Menggunakan Python HTTP Server
Jika Anda memiliki Python terinstal di sistem Anda:
1. Buka terminal atau command prompt.
2. Navigasi ke dalam direktori proyek ini.
3. Jalankan perintah: `python -m http.server 8000`
4. Buka browser dan akses `http://localhost:8000`.

### 3. Menggunakan Node.js (npx serve)
Jika Anda memiliki Node.js terinstal:
1. Buka terminal di dalam direktori proyek.
2. Jalankan perintah: `npx serve`
3. Akses URL lokal yang diberikan pada terminal (biasanya `http://localhost:3000`).

## Alur Penggunaan

1. **Generate Dataset (Data Viewer)**: Pilih provinsi, skenario simulasi (Kondisi Normal, PHK Massal, atau Pasca-Bencana), tingkat anomali, dan jumlah rumah tangga, lalu klik **Generate Dataset**. Backend membangun populasi sintetis dan mengembalikan `session_id`; tabel rumah tangga ditampilkan dengan paginasi dan dapat diekspor ke CSV.
2. **Jalankan Analisis (Analisis Model)**: Halaman ini menjalankan inferensi pada sesi aktif untuk membandingkan akurasi PMT konvensional vs Machine Learning — confusion matrix, metrik (F1/AUC/exclusion/inclusion error), distribusi desil, dan daftar kandidat mis-targeting prioritas.
3. **Eksplorasi Interpretasi (SHAP)**: Klik baris kandidat mis-targeting untuk memuat penjelasan SHAP per-record langsung dari model, lengkap dengan probabilitas kelayakan dan kontribusi tiap fitur.
4. **Buat Rekomendasi Kebijakan (Policy Brief)**: Hasilkan policy brief otomatis (Azure OpenAI dalam Mode Live, atau template dalam Mode Demo) yang siap disalin/dicetak untuk advokasi kebijakan.

> Catatan: alur di atas berbagi satu `session_id` lintas halaman. Mode Demo mereplikasi seluruh alur secara lokal tanpa backend.

## Tim Pengembang

* **Sean**: Data Science dan ML Lead
* **Anggota 2**: Azure dan Backend Engineer
* **Anggota 3**: Frontend dan Visualization Engineer

## Catatan Tambahan

Proyek ini dibangun di atas data sintetis karena data individual penerima bansos bersifat rahasia. Membangun populasi sintetis dari distribusi agregat publik (seperti BPS Susenas) merupakan solusi yang sah secara ilmiah, serta diakui oleh lembaga multilateral untuk riset tanpa melanggar prinsip privasi perlindungan data.
