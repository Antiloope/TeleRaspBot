#!/bin/bash

LOGFILE="OctoprintServer.log"

echo "Starting octoprint server"
exec nohup ~/OctoPrint/venv/bin/octoprint serve > $LOGFILE
echo "    DONE - Log file: $LOGFILE "
exit 1
