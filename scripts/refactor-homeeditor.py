#!/usr/bin/env python3
"""Refactor HomeEditor.tsx: remove inlined editor machinery (lines 1..325)
and import it from editorKit.tsx instead."""
import re

P = '/home/z/my-project/src/components/admin/HomeEditor.tsx'
src = open(P).read()

# The machinery block runs from the start of the file to just before the
# "Section definitions" banner comment.
marker = "/* ────────────────────────────────────────────────────────────────────────\n * Section definitions"
idx = src.find(marker)
assert idx != -1, 'marker not found'

header = """'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  FileJson,
  FormInput,
  ExternalLink,
  RotateCcw,
  Eye,
  EyeOff,
} from 'lucide-react';
import { SpecFields, SectionDef } from './editorKit';

"""

out = header + src[idx:]
open(P, 'w').write(out)
print('HomeEditor refactored. New length:', len(out.splitlines()), 'lines')
