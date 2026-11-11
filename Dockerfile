# Railway deploy: build the static site, then serve dist/ (not public/).
FROM python:3.12-alpine
WORKDIR /app
COPY . .
# The macOS external drive leaves ._* AppleDouble files that crash build.py.
RUN find . -name '._*' -delete && python3 build.py
# shortcut: stdlib server shows its own 404 (not dist/404.html) and no gzip; move to Caddy/nginx if that matters.
CMD python3 -m http.server "${PORT:-8080}" --directory dist
