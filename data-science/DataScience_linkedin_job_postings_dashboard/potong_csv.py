import os
import pandas as pd

# Tentukan folder dataset asal dan folder hasil potongan
source_folder = "dataset"

print("🚀 Memulai proses pemotongan file CSV raksasa...")

# Loop semua file yang ada di dalam folder dataset
for root, dirs, files in os.walk(source_folder):
    for file in files:
        if file.endswith(".csv"):
            file_path = os.path.join(root, file)
            print(f"📦 Memproses file: {file}...")
            
            try:
                # Membaca hanya 1000 baris pertama agar super ringan
                df_chunk = pd.read_csv(file_path, nrows=1000)
                
                # Menimpa file asli dengan versi yang sudah dipotong (hanya 1000 baris)
                df_chunk.to_csv(file_path, index=False)
                print(f"✅ Berhasil memotong {file} menjadi 1000 baris!")
            except Exception as e:
                print(f"❌ Gagal memproses {file}. Error: {e}")

print("🎉 Semua file CSV di folder dataset berhasil dikurusin!")