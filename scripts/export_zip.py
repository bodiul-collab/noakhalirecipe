import os
import zipfile

exclude_dirs = {"node_modules", "dist", ".git", ".next", ".cache", ".system_generated"}
exclude_files = {".env", ".DS_Store"}

zip_path = "/tmp/noakhali-kitchen-source.zip"
if os.path.exists(zip_path):
    try:
        os.remove(zip_path)
    except Exception:
        pass

with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith(".git")]
        for f in files:
            if f in exclude_files or f.endswith(".log") or f.endswith(".tmp"):
                continue
            file_path = os.path.join(root, f)
            arcname = os.path.relpath(file_path, ".")
            zipf.write(file_path, arcname)

print("Export ready at:", zip_path, "Size:", os.path.getsize(zip_path))
