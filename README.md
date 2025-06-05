# NAS-WatchBot

# 🔔 n8n System Monitoring Workflows (Manual & Otomatis)

Repository ini berisi dua alur kerja (workflow) berbasis [n8n](https://n8n.io/) untuk melakukan monitoring sumber daya sistem (CPU dan disk usage) melalui API, dan mengirim notifikasi ke Telegram. Tersedia dua mode monitoring: **Manual** dan **Otomatis**.

---

## 📦 Setup Awal

Sebelum menggunakan kedua workflow, pastikan Anda mengikuti langkah berikut untuk konfigurasi lingkungan:

### 1. Modifikasi `docker-compose.yaml`
Tambahkan konfigurasi berikut di bagian `environment`:
```yaml
- WEBHOOK_URL=https://2ade-114-10-47-129.ngrok-free.app
- N8N_PORT=5678
```

### 2. Jalankan Perintah Docker
Jalankan perintah berikut untuk menghentikan dan menjalankan kembali container:
```yaml
docker-compose down
docker-compose up -d
```

### 3. Jalankan ngrok
Gunakan perintah:
```yaml
ngrok http 5678
```

### 4. Tambahkan Kredensial Telegram
Gunakan API token berikut untuk bot Telegram Anda:
```yaml
7822606038:AAFDLV0cQbxaw9yaatZ69-l21IXq-uNumpQ
```

## ⚙️ Workflow: Manual Alert
Workflow ini akan memantau sistem berdasarkan perintah manual yang dikirim oleh pengguna ke bot Telegram.

Langkah Kerja:
### 1. Telegram Trigger Node
Memicu workflow ketika bot menerima pesan dari pengguna.

### 2. IF Node
Mengecek apakah isi pesan persis adalah Status nas (case sensitive).

### 3. HTTP Request 1 (Disk Info)
Mengambil informasi disk dari endpoint:
```yaml
https://100.121.40.42/api/v2.0/pool/
```

### 4. HTTP Request 2 (CPU Info)
Mengambil informasi CPU dari endpoint:
```yaml
https://100.121.40.42/api/v2.0/system/info
```

### 5. Merge Node
Menggabungkan hasil dari dua HTTP Request tersebut.

### 6. Function Node
Menghitung persentase penggunaan:
```yaml
CPU (berdasarkan beban per core)
Disk (berdasarkan total dan allocated size)
```
### 7. Telegram Send Message Node
Mengirimkan hasil penggunaan CPU dan Disk kepada pengguna Telegram yang mengirim perintah.

## 🔁 Workflow: Alert Otomatis
Workflow ini secara otomatis melakukan monitoring sistem setiap 5 menit dan mengirimkan peringatan apabila terjadi pelampauan ambang batas penggunaan.

Langkah Kerja:
### 1. Cron Node
Menjalankan workflow secara otomatis setiap 5 menit.

### 2. HTTP Request 1 (Disk Info)
Sama seperti pada manual alert:
```yaml
https://100.121.40.42/api/v2.0/pool/
```

### 3. HTTP Request 2 (CPU Info)
Sama seperti pada manual alert:
```yaml
https://100.121.40.42/api/v2.0/system/info
```

### 4. Merge Node
Menggabungkan hasil dari kedua HTTP Request.

### 5. Function Node
Menghitung persentase penggunaan CPU dan Disk.

### 6. IF Node
Mengevaluasi kondisi berikut:
```yaml
CPU usage di bawah 80%
Disk usage di bawah 90%
```
Jika kondisi tidak terpenuhi, maka workflow akan mengirim peringatan.

### 7. Telegram Send Message Node
Mengirimkan pesan peringatan ke Telegram untuk memperingatkan pengguna bahwa sistem melebihi batas penggunaan yang diizinkan.

