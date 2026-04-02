import torch
print(f"Is CUDA available? {torch.cuda.is_available()}")
print(f"CUDA version: {torch.version.cuda}")
print(f"Device Name: {torch.cuda.get_device_name(0)}")