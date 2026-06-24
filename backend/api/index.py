"""Vercel Python serverless entrypoint.

Vercel serves the ASGI ``app`` exported here. We add the backend root to
``sys.path`` so the existing ``main`` / ``app`` / ``seed`` modules import cleanly
regardless of Vercel's working directory.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app  # noqa: E402

__all__ = ["app"]
