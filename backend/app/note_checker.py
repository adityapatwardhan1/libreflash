from openai import OpenAI
from dotenv import load_dotenv
import os
import re
import json

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")
client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key=api_key)

CHECK_NOTES_PROMPT = """
You are a strict verifier. The user has submitted notes along with a link to an open-access textbook. Determine whether the notes are derived from the linked reading.

Respond **only** with `"true"` or `"false"` — as a valid JSON boolean string.

Do not include any explanation or formatting.

### Reading:
{text}

### Notes:
{notes}
"""

def check_resp_true(resp):
    content = resp.choices[0].message.content.strip()
    try:
        return json.loads(content.lower()) is True
    except json.JSONDecodeError:
        return False  # Or log a warning


def check_notes_consistency(text: str, notes: str, model: str = "deepseek/deepseek-chat-v3-0324:free") -> bool:
    prompt = CHECK_NOTES_PROMPT.format(text=text, notes=notes)
    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
    )
    return check_resp_true(resp)
