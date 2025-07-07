import os
import json
import re
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")
client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key=api_key)

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

Some questions may use *cloze deletion* format for better active recall. In cloze deletions, the key concept or term is hidden in the question using the syntax {{c1::hidden text}}. If multiple deletions are needed in a single question, use {{c2::...}}, {{c3::...}}, etc.

For example: 
{{"question": "The derivative of {{c1::sin(x)}} is {{c2::cos(x)}}", "answer": "sin(x) → cos(x)"}}

Guidelines:
- Use cloze format only when the context makes it suitable (e.g. definitions, equations, fill-in-the-blank).
- Not all questions need to use cloze deletions.
- Do NOT include any extra explanation, markdown, or backticks. Only output valid JSON.

### Reading Material:
{text}

### Student Notes (optional):
{notes}
"""

def strip_markdown_fences(text: str) -> str:
    # Remove ```json or ``` from beginning and end if present
    return re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.MULTILINE)

def fix_single_cloze_braces(text: str) -> str:
    # Replace {c1::...} with {{c1::...}} if only single-braced
    return re.sub(r'(?<!{)\{(c\d+::.*?)}(?!})', r'{{\1}}', text)

def generate_flashcards(text: str, notes: str = "", model: str = "deepseek/deepseek-chat-v3-0324:free"):
    if not notes.strip():
        notes = "None provided"

    prompt = FLASHCARD_PROMPT.format(text=text, notes=notes)

    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
    )

    content = resp.choices[0].message.content.strip()
    cleaned = strip_markdown_fences(content)
    cleaned = fix_single_cloze_braces(cleaned)

    print("cleaned =", cleaned)

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse JSON from model output:\n{cleaned}\n\nError: {e}")
