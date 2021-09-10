#!/bin/bash

cd /{JENKINS HOME DIRECTORY}/workspace/node-app-pipeline
snyk auth 94ac6357-e264-45e7-a345-958372e5172f
snyk test --json > /{JENKINS HOME DIRECTORY}/reports/snyk-report

echo $? > /dev/null