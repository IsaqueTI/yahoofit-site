#!/usr/bin/env python3
"""Valida referências e contratos da migração sem dependências externas."""
import base64
import hashlib
import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
errors = []


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.elements = []
        self.ids = []
        self.h1_count = 0
        self.lang = None

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.elements.append((tag, attrs))
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "h1":
            self.h1_count += 1
        if tag == "html":
            self.lang = attrs.get("lang")


html = (ROOT / "index.html").read_text(encoding="utf-8")
page = Page()
page.feed(html)
ids = set(page.ids)

if not html.lstrip().lower().startswith("<!doctype html>"):
    errors.append("DOCTYPE HTML5 ausente")
if page.lang != "pt-BR":
    errors.append("Idioma do documento incorreto")
if page.h1_count != 1:
    errors.append(f"Esperado um H1; encontrados {page.h1_count}")
for identifier, count in Counter(page.ids).items():
    if count > 1:
        errors.append(f"ID duplicado: {identifier}")

for tag, attrs in page.elements:
    for key in ("aria-controls", "aria-labelledby", "aria-describedby"):
        for target in (attrs.get(key) or "").split():
            if target not in ids:
                errors.append(f"{key} aponta para ID inexistente: {target}")
    if tag == "img":
        if "alt" not in attrs or not attrs.get("width") or not attrs.get("height"):
            errors.append(f"Imagem sem alt/dimensões: {attrs.get('src')}")
    for key in ("href", "src"):
        value = attrs.get(key)
        if not value:
            continue
        if value == "#" or value.startswith("javascript:"):
            errors.append(f"Destino sem função ou inseguro: {value}")
        parts = urlsplit(value)
        if parts.scheme or parts.netloc:
            if "wa.me" in parts.netloc and not parts.path.strip("/"):
                errors.append("WhatsApp externo sem destinatário")
            continue
        if parts.path:
            target = ROOT / unquote(parts.path)
            if not target.is_file():
                errors.append(f"Arquivo local inexistente: {value}")
        elif parts.fragment and unquote(parts.fragment) not in ids:
            errors.append(f"Âncora inexistente: {value}")
    target = attrs.get("data-bs-target", "")
    if target.startswith("#") and target[1:] not in ids:
        errors.append(f"Componente Bootstrap sem destino: {target}")
    if tag == "script" and attrs.get("src") and "defer" not in attrs:
        errors.append(f"Script externo sem defer: {attrs['src']}")

expected_images = {
    "coletivas.jpg": "344875a14248e6cf65a56edcb41ce3b03601f386",
    "hero-treino.jpg": "084ab182c1ce0ca7374cdb53fcdc327b3ee55b33",
    "jiujitsu-kids.jpg": "b08e368d6be1e0bbe663a759befd332e35834fd8",
    "lutas.jpg": "76b253b4e72400649758461caea64b56d1e3f087",
    "musculacao.jpg": "95953f52dc56975ed8fc46f1f25b0b461cc4bc20",
}
for name, expected in expected_images.items():
    data = (ROOT / "assets/img" / name).read_bytes()
    actual = hashlib.sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()
    if actual != expected:
        errors.append(f"Imagem diverge da origem: {name}")

expected_vendor = {
    "bootstrap.min.css": "yEPZ7jP9S0QKiUQ0m3jjsO4ProIW7wvR9gXkI7JOGa2XVsw53Yke2bsdkBbjmmiX",
    "bootstrap.bundle.min.js": "WyOxWvTyr1QaMPfiPJSv76iReVthorl5uWlFtZPyK0IEB0hGzo9y5Bp9mYanr8Bu",
}
for name, expected in expected_vendor.items():
    data = (ROOT / "assets/vendor/bootstrap" / name).read_bytes()
    actual = base64.b64encode(hashlib.sha384(data).digest()).decode()
    if actual != expected:
        errors.append(f"Integridade do Bootstrap divergente: {name}")
if not (ROOT / "assets/vendor/bootstrap/LICENSE").is_file():
    errors.append("Licença do Bootstrap ausente")

for path in ROOT.rglob("*"):
    relative = path.relative_to(ROOT)
    if any(part.startswith(".") for part in relative.parts):
        continue
    if path.suffix in (".tsx", ".jsx", ".ts") or path.name in ("package.json", "vite.config.js"):
        errors.append(f"Artefato de framework encontrado: {relative}")
for name in ("assets/js/config.js", "assets/js/site.js"):
    script = (ROOT / name).read_text(encoding="utf-8")
    if re.search(r"\b(?:import|require)\s*(?:\(|[\"'{])", script):
        errors.append(f"Dependência de módulo/bundler encontrada: {name}")

if errors:
    for error in errors:
        print("ERRO:", error)
    sys.exit(1)
print(f"PASS: HTML5, {len(page.ids)} IDs, referências locais/ARIA, Bootstrap 5.3.9 e cinco imagens de origem.")
