#!/bin/bash

BUCKET_NAME="gs://beta.electricitymaps.com"

echo "Starting deployment..."

#Create bucket (already done): gsutil mb -p tmrow-152415 -c regional -l europe-west1 $BUCKET_NAME

# Upload files and set proper index page
gsutil -h "Cache-Control:public,max-age=0" -m cp -a public-read -r dist/* $BUCKET_NAME
gsutil web set -m index.html -e 404.html $BUCKET_NAME

# Unsure if this is required, but we have used it before...
# Save the following to cors-config.json and enable command below
# [{"maxAgeSeconds": 3600,"method": ["GET", "HEAD"],"origin": ["*"],"responseHeader": ["Content-Type"]}]
# gsutil cors set cors-config.json $BUCKET_NAME

# Set no-cache for certain files if required
#gsutil setmeta -h "Cache-Control:no-cache,max-age=0" $BUCKET_NAME/*.json

echo "Done!"