from crewai import Agent, Task

def build_expense_validator_agent(llm):
    agent = Agent(
        role="Expense Validator",
        goal="Validate expenses against company policy rules",
        backstory="Expert financial auditor who enforces company expense policies strictly.",
        llm=llm,
        verbose=True
    )
    return agent

def build_validation_task(agent, policy_rules, expense_data):
    task = Task(
        description=f"""
        Validate the following expense records against the given policy rules.

        Policy Rules:
        {policy_rules}

        Expense Records:
        {expense_data}

        For each record:
        - Add fields:
          - compliant: true/false
          - reasons: list of strings

        Return a JSON list of validated records.
        """,
        agent=agent,
        expected_output="JSON with compliance results"
    )
    return task
