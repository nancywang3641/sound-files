# 用 pathlib 寫法
from pathlib import Path

# 把這裡改成你資料夾的路徑，Windows 記得加 r 前綴避免轉義問題
folder_path = Path(r'D:\SillyTavern\public\scripts\extensions\third-party\my-tavern-extension\assets\location_img')

# rglob('*') 會遞迴尋找所有檔案與子資料夾
for file_path in folder_path.rglob('*'):
    if file_path.is_file():
        print(file_path)
