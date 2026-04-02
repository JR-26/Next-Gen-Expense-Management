from crewai import Agent, Task

def build_report_agent(llm):
    agent = Agent(
        role="Compliance Report Generator",
        goal="Generate a professional expense compliance report",
        backstory="Senior finance analyst writing audit reports for management.",
        llm=llm,
        verbose=True
    )
    return agent

def build_report_task(agent, validated_expenses):
    task = Task(
        description=f"""
        Generate a summary compliance report from the following validated expenses.

        Include:
        - Total expenses
        - Compliant vs non-compliant count
        - Violations and reasons
        - Overall compliance percentage
        - Recommendations

        Validated Data:
        {validated_expenses}
        """,
        agent=agent,
        expected_output="Detailed compliance report"
    )
    return task
