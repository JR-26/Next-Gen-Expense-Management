import json
import os
from crewai import Crew,LLM
from langchain_groq import ChatGroq
from dotenv import load_dotenv

from agents.policy_parser import load_policy_text, build_policy_parser_agent, build_policy_parsing_task
from agents.expense_validator import build_expense_validator_agent, build_validation_task
from agents.report_agent import build_report_agent, build_report_task

# -----------------------------
# Groq LLM Setup (LLaMA 70B)
# -----------------------------
load_dotenv(override = True)

llm = "groq/llama-3.3-70b-versatile"

# -----------------------------
# File Paths
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

POLICY_PDF = os.path.join(BASE_DIR, "data", "expense_policy_text.pdf")
EXPENSE_JSON = os.path.join(BASE_DIR, "outputs", "categorized.json")
FINAL_REPORT = os.path.join(BASE_DIR, "outputs", "final_report.txt")

# -----------------------------
# Crew Pipeline
# -----------------------------

def run_crewai_pipeline():
    # Load inputs
    policy_text = load_policy_text(POLICY_PDF)

    with open(EXPENSE_JSON, "r", encoding="utf-8") as f:
        expenses = json.load(f)

    # Build agents
    policy_agent = build_policy_parser_agent(llm)
    validator_agent = build_expense_validator_agent(llm)
    report_agent = build_report_agent(llm)

    # Build tasks
    policy_task = build_policy_parsing_task(policy_agent, policy_text)
    validation_task = build_validation_task(validator_agent, policy_task.output, expenses)
    report_task = build_report_task(report_agent, validation_task.output)

    # Run crew
    crew = Crew(
        agents=[policy_agent, validator_agent, report_agent],
        tasks=[policy_task, validation_task, report_task],
        verbose=True
    )

    result = crew.kickoff()

    # -----------------------------
    # 🔹 ADD THIS BLOCK HERE
    # -----------------------------
    with open(
        r"C:\Users\91978\course\final_year_project\final\server\outputs\final_report.txt",
        "w",
        encoding="utf-8"
    ) as f:
        f.write(str(result))

    print("\n=== FINAL REPORT ===\n")
    print(result)

    return result

    


if __name__ == "__main__":
    run_crewai_pipeline()
