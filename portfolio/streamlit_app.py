"""Serve the static portfolio on Streamlit Community Cloud."""

from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

ROOT = Path(__file__).parent
# Update branch name if your default branch is not "main"
GITHUB_RAW = "https://raw.githubusercontent.com/ravikant8789/Ravikant--portfolio/main"


def build_portfolio_html() -> str:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "style.css").read_text(encoding="utf-8")
    js = (ROOT / "script.js").read_text(encoding="utf-8")

    html = html.replace(
        '<link rel="stylesheet" href="style.css">',
        f"<style>{css}</style>",
    )
    html = html.replace(
        '<script src="script.js"></script>',
        f"<script>{js}</script>",
    )

    profile = ROOT / "assets" / "Profile.png"
    if profile.is_file():
        import base64

        b64 = base64.b64encode(profile.read_bytes()).decode("ascii")
        img_src = f"data:image/png;base64,{b64}"
    else:
        img_src = f"{GITHUB_RAW}/assets/Profile.png"

    html = html.replace('src="assets/Profile.png"', f'src="{img_src}"')
    return html


st.set_page_config(
    page_title="Ravikant Kumar | Portfolio",
    page_icon="✨",
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.markdown(
    """
    <style>
      #MainMenu, footer, header { visibility: hidden; height: 0; }
      .block-container { padding: 0 !important; max-width: 100% !important; }
      iframe { border: none !important; }
    </style>
    """,
    unsafe_allow_html=True,
)

components.html(build_portfolio_html(), height=7200, scrolling=True)
