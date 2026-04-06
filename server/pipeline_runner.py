from __future__ import annotations

from pathlib import Path

from PEFT_pipeline import run_model_pipeline
from crew_pipeline import run_crewai_pipeline
from model_loader import load_model


BASE_DIR = Path(__file__).resolve().parent
DEFAULT_EXCEL_INPUT = BASE_DIR / "data" / "first_20_rows.xlsx"
DEFAULT_CATEGORIZED_JSON = BASE_DIR / "outputs" / "categorized.json"
DEFAULT_FINAL_REPORT_PATH = BASE_DIR / "outputs" / "final_report.txt"


def run_analysis(
    excel_input_path: str | Path,
    categorized_json_path: str | Path = DEFAULT_CATEGORIZED_JSON,
    final_report_path: str | Path = DEFAULT_FINAL_REPORT_PATH,
    pipe=None,
):
    excel_input = Path(excel_input_path)
    categorized_json = Path(categorized_json_path)
    final_report = Path(final_report_path)

    categorized_json.parent.mkdir(parents=True, exist_ok=True)
    final_report.parent.mkdir(parents=True, exist_ok=True)

    if pipe is None:
        pipe = load_model()

    run_model_pipeline(str(excel_input), str(categorized_json), pipe)
    return run_crewai_pipeline(str(categorized_json), str(final_report))