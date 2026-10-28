#!/usr/bin/env python3
"""Search Console sitemap helper for implementeren.ai (seo-werklijst task 17).

    python3 scripts/gsc-sitemap.py            # list the property's sitemaps and their state
    python3 scripts/gsc-sitemap.py --submit   # (re)submit the sitemap index, then list again

Runs on the M1 Pro, where the service-account key lives outside git at
~/.config/gsc/claudezakelijk-sa.json (override with GSC_SA_KEY). The service account
must be a user on sc-domain:implementeren.ai. Requesting indexing for single URLs is
not possible through this API; that stays a manual step in the Search Console UI.
"""
import json
import os
import sys
from pathlib import Path

import google.auth.transport.requests
from google.oauth2 import service_account

PROPERTY = "sc-domain:implementeren.ai"
SITEMAP = "https://implementeren.ai/sitemap-index.xml"
SCOPE = ["https://www.googleapis.com/auth/webmasters"]
KEY = Path(os.environ.get("GSC_SA_KEY", "~/.config/gsc/claudezakelijk-sa.json")).expanduser()
API = "https://www.googleapis.com/webmasters/v3/sites/" + PROPERTY.replace(":", "%3A")


def session():
    creds = service_account.Credentials.from_service_account_file(str(KEY), scopes=SCOPE)
    return google.auth.transport.requests.AuthorizedSession(creds)


def list_sitemaps(s):
    r = s.get(API + "/sitemaps")
    r.raise_for_status()
    items = r.json().get("sitemap", [])
    if not items:
        print("no sitemaps on", PROPERTY)
    for sm in items:
        contents = sm.get("contents", [])
        submitted = sum(int(c.get("submitted", 0)) for c in contents)
        indexed = sum(int(c.get("indexed", 0)) for c in contents)
        print(
            f"{sm['path']}\n"
            f"  submitted {sm.get('lastSubmitted', '-')}  last read {sm.get('lastDownloaded', '-')}\n"
            f"  pending {sm.get('isPending', False)}  errors {sm.get('errors', 0)}  warnings {sm.get('warnings', 0)}\n"
            f"  urls submitted {submitted}  indexed {indexed}"
        )
    return items


def main():
    if not KEY.exists():
        sys.exit(f"key not found: {KEY}")
    s = session()
    if "--submit" in sys.argv:
        r = s.put(API + "/sitemaps/" + SITEMAP.replace("/", "%2F").replace(":", "%3A"))
        r.raise_for_status()
        print(f"submitted {SITEMAP}: HTTP {r.status_code}")
    list_sitemaps(s)


if __name__ == "__main__":
    main()
