import os
import json
from dotenv import load_dotenv

load_dotenv(override=True)

from PEFT_pipeline import run_model_pipeline
from crew_pipeline import run_crewai_pipeline
from model_loader import load_model


EXCEL_INPUT = r"data/first_20_rows.xlsx"
CATEGORIZED_JSON = r"outputs/categorized.json"
FINAL_REPORT_PATH = r"outputs/final_report.txt"

def main():
    pipe = load_model()
    run_model_pipeline(EXCEL_INPUT, CATEGORIZED_JSON, pipe)
    final_report = run_crewai_pipeline()

    with open(FINAL_REPORT_PATH, "w", encoding="utf-8") as f:
        f.write(str(final_report))
    print(f"Final report saved at {FINAL_REPORT_PATH}\n")
    return final_report

if __name__ == "__main__":
    main()
