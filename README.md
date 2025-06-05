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


####2. Jalankan Perintah Docker
Jalankan perintah berikut untuk menghentikan dan menjalankan kembali container:
  docker-compose down
  docker-compose up -d
