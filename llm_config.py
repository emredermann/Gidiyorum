import os
from dotenv import load_dotenv
from crewai import LLM

load_dotenv()

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")

def get_llm(model_name: str = None) -> LLM:
    """CrewAI için deterministik yerel Ollama LLM örneği."""
    selected_model = model_name or OLLAMA_MODEL
    return LLM(
        model=f"ollama/{selected_model}",
        base_url=OLLAMA_BASE_URL,
        temperature=0.1,
        timeout=180
    )
