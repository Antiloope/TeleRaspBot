#!/bin/bash

echo 'Shutting up octoprint server'

killall octoprint

echo '    DONE'
exit 1
