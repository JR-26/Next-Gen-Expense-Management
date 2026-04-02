import pandas as pd
import json
import re
from model_loader import pipe


def json_safe(val):
    return json.dumps(str(val))[1:-1]


def normalize_value(val):
    if pd.isna(val):
        return None
    if isinstance(val, pd.Timestamp):
        return val.isoformat()
    if hasattr(val, "item"):
        return val.item()
    return val


def safe_extract(response, keys):
    if not response:
        return None

    text = response.split("### Response:")[-1].strip()
    text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.IGNORECASE).strip()

    try:
        parsed = json.loads(text)
        for k in keys:
            if k in parsed:
                return parsed[k]
        return None
    except Exception:
        return None


def run_model_pipeline(excel_path: str, output_path: str,pipe):
    df = pd.read_excel(excel_path).head(5)
    results = []

    print("Excel is read")

    for _, row in df.iterrows():
        # ✅ JSON-safe row
        row_dict = {k: normalize_value(v) for k, v in row.to_dict().items()}

        # ---- Categorization ----
        if all(
            col in row and pd.notna(row[col])
            for col in ["Business Purpose", "Vendor", "Amount"]
        ):
            prompt = f"""### Instruction:
Categorize this expense.

### Input:
{{"Business Purpose": "{json_safe(row['Business Purpose'])}",
  "Vendor": "{json_safe(row['Vendor'])}",
  "Amount": {row['Amount']}}}

### Response:"""

            try:
                out = pipe(prompt, max_new_tokens=32)
                response = out[0]["generated_text"] if out else ""
            except Exception as e:
                print("Model error (categorization):", e)
                response = ""

            category = safe_extract(
                response,
                ["Expense Category", "Category", "expense_category", "expenseCategory"]
            )

            row_dict["Expense Category"] = category or "Unknown"
            print("expense categorized")

        # ---- Personal Expense ----
        if "Payment Type" in row and pd.notna(row["Payment Type"]):
            if row['Payment Type']=="Out-of-pocket":
                row_dict["Is_Personal"] = True
            else:
                row_dict["Is_Personal"] = False

        results.append(row_dict)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=4, ensure_ascii=False)

    print(f"Categorization & personal check saved to {output_path}")
    return output_path


if __name__ == "__main__":
    run_model_pipeline(
        r"C:\Users\91978\course\final_year_project\final\server\data\first_20_rows.xlsx",
        r"C:\Users\91978\course\final_year_project\final\server\outputs\categorized.json",pipe
    )
