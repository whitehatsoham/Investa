#!/usr/bin/env python3
"""Inline index.html's CSS and JS into one self-contained page."""
import re, io, os

src = open("index.html", encoding="utf-8").read()

# strip the document skeleton — the artifact host supplies it
body = re.search(r"<body>(.*)</body>", src, re.S).group(1)
head = re.search(r"<head>(.*)</head>", src, re.S).group(1)

out = io.StringIO()
for line in head.splitlines():
    if 'rel="stylesheet" href="styles.css"' in line:
        out.write("<style>\n" + open("styles.css", encoding="utf-8").read() + "\n</style>\n")
    elif "<meta charset" in line:
        continue
    else:
        out.write(line + "\n")

for chunk in re.split(r'(<script src="[^"]+"></script>)', body):
    m = re.match(r'<script src="([^"]+)"></script>', chunk)
    if m:
        js = open(m.group(1), encoding="utf-8").read()
        assert "</script" not in js, m.group(1)
        out.write("<script>\n" + js + "\n</" + "script>\n")
    else:
        out.write(chunk)

html = out.getvalue()
open("investa-standalone.html", "w", encoding="utf-8").write(html)
print("investa-standalone.html:", len(html), "chars")
