#!/bin/bash
docker run -it --rm \
  -v $(pwd):/app \
  -w /app \
  node:20-alpine \
  sh -c "npm create next-app@latest chat-app --typescript --tailwind --app --no-git --src-dir --import-alias '@/*' && \
  cd chat-app && \
  npm install react@latest react-dom@latest && \
  npm install @tanstack/react-query axios zod next-safe-action --legacy-peer-deps"