from __future__ import annotations

import argparse
from pathlib import Path

from pipeline_runner import (
    DEFAULT_CATEGORIZED_JSON,
    DEFAULT_EXCEL_INPUT,
    DEFAULT_FINAL_REPORT_PATH,
    run_analysis,
)


def main(excel_input: str | None = None):
    input_path = Path(excel_input) if excel_input else DEFAULT_EXCEL_INPUT
    report = run_analysis(
        input_path,
        categorized_json_path=DEFAULT_CATEGORIZED_JSON,
        final_report_path=DEFAULT_FINAL_REPORT_PATH,
    )
    print(f"Final report saved at {DEFAULT_FINAL_REPORT_PATH}")
    return report


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run the expense analysis pipeline")
    parser.add_argument(
        "excel_input",
        nargs="?",
        default=None,
        help="Path to the Excel file to analyze",
    )
    args = parser.parse_args()
    main(args.excel_input)
