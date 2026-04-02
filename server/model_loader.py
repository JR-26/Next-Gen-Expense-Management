import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from peft import PeftModel

base_model_id = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
adapter_model_id = "SSP06/tinyllama-expense-adapter"


def load_model():
    try:
        print("Loading tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained(base_model_id)

        print("Loading base model on GPU...")
        base_model = AutoModelForCausalLM.from_pretrained(
            base_model_id,
            device_map="auto",
            torch_dtype=torch.float16,          # ✅ new API
            low_cpu_mem_usage=True
        )

        print("Loading PEFT adapter on GPU...")
        model = PeftModel.from_pretrained(
            base_model,
            adapter_model_id,
            device_map="cuda"
        )

        model.eval()

        print("Creating pipeline...")
        pipe = pipeline(
            "text-generation",
            model=model,
            tokenizer=tokenizer,
            device_map="cuda"
        )

        print("Model loaded successfully on GPU!")
        return pipe

    except Exception as e:
        print(f"Error loading model: {e}")
        raise
    return pipe


pipe = load_model()
