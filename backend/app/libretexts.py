import requests
from bs4 import BeautifulSoup

def fetch_clean_text(url: str) -> str:
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; EducationalBot/1.0; +https://flashwise.app)"
    }
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    main = soup.find("main") or soup.find("article") or soup
    for tag in main(["script", "style", "nav", "footer", "aside"]):
        tag.decompose()

    return " ".join(main.stripped_strings)
