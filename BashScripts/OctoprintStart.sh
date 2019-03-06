#!/bin/bash

LOGFILE="OctoprintServer.log"

echo "Starting octoprint server - Log file: $LOGFILE"
~/OctoPrint/venv/bin/octoprint serve > $LOGFILE
exit 1
