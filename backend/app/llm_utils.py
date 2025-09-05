import time
from openai import RateLimitError, OpenAIError

MAX_RETRIES = 5
BACKOFF_FACTOR = 2  # exponential backoff

def call_llm_with_retry(func, *args, **kwargs):
    """
    Calls an OpenRouter LLM function and handles rate-limiting with exponential backoff.
    func: the client call (e.g., client.chat.completions.create)
    """
    for i in range(MAX_RETRIES):
        try:
            return func(*args, **kwargs)
        except RateLimitError:
            time_to_next_call = 2 ** i
            print(f"LLM rate limit hit, retrying in {time_to_next_call} seconds.")
            time.sleep(time_to_next_call)
        except OpenAIError as e:
            raise e
    raise Exception("LLM request failed due to rate limits, despite exponential backoff.")