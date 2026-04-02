import os
from pypdf import PdfReader
from crewai import Agent, Task
import json

# ✅ Base directory (go 1 level up from agents/)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ✅ Correct PDF path
POLICY_PDF = os.path.join(BASE_DIR, "data", "expense_policy_text.pdf")


def load_policy_text(pdf_path=POLICY_PDF):
    # ✅ Debug print (helps if path is wrong)
    print(f"Loading policy PDF from: {pdf_path}")

    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"Policy file not found at: {pdf_path}")

    reader = PdfReader(pdf_path)
    text = ""

    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:  # ✅ avoid NoneType error
            text += extracted + "\n"

    return text


def build_policy_parser_agent(llm):
    agent = Agent(
        role="Policy Parser",
        goal="Extract structured policy rules from company expense policy text",
        backstory="Expert at reading company policies and extracting rules into structured data.",
        llm=llm,
        verbose=True
    )
    return agent


def build_policy_parsing_task(agent, policy_text):
    task = Task(
        description=f"""
Extract expense categories, approved vendors, and policy limits from this policy text.

Return a JSON object with keys:
- categories
- approved_vendors
- limits

Policy Text:
{policy_text}
""",
        agent=agent,
        expected_output="A structured JSON object with categories, vendors, and limits"
    )
    return task
