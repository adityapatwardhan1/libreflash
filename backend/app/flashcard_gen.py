import os
from dotenv import load_dotenv
from openai import OpenAI
import json
import re

FLASHCARD_PROMPT = """
You are an expert educational assistant. Based on the provided reading material and student notes, generate a JSON flashcard deck.

Only output valid JSON with this structure:
{{
  "deck_name": "<short descriptive title>",
  "cards": [
    {{"question": "...", "answer": "..."}},
    ...
  ]
}}

Format your output carefully as valid JSON. Do not include any extra explanation, commentary, or markdown. No backticks (```).

### Reading Material:
{text}

### Student Notes (optional):
{notes}
"""

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")
client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key=api_key)

def strip_markdown_fences(text: str) -> str:
    return re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.MULTILINE)

def generate_flashcards(text: str, notes: str = "None provided", model: str = "deepseek/deepseek-chat-v3-0324:free"):
    print("text = ", text)
    prompt = FLASHCARD_PROMPT.format(text=text, notes=notes)
    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
    )
    content = resp.choices[0].message.content.strip()
    cleaned = strip_markdown_fences(content)
    print("cleaned =", cleaned)
    return json.loads(cleaned)
