#!/bin/bash
cd /home/kavia/workspace/code-generation/iptv-innovation-and-insights-tracker-95916-95926/iptv_insights_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

