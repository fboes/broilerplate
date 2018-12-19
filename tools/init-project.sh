#!/bin/bash
cd `dirname $0`

read -p "Project title: " PROJECT_TITLE
read -p "Project domain (without subdomain): " PROJECT_DOMAIN
PROJECT_DOMAIN=${PROJECT_DOMAIN:-example.com}
PROJECT_ID=${PROJECT_DOMAIN//[^A-Za-z0-9_]/_}
PROJECT_ID=`echo $PROJECT_ID|cut -c1-16`
PROJECT_SUBDOMAIN=${PROJECT_ID//_/-}
#PROJECT_IP="$(shuf -i 11-255 -n 1)"

sed -i'' -e "s#broiler-plate\.localtest\.me#$PROJECT_DOMAIN#g;s#broiler_plate#$PROJECT_ID#g;s#broiler-plate#$PROJECT_SUBDOMAIN#g" \
  ../config/* \
  ../.env.example
  ../docs/*.md \
  ../README.md
#sed -i'' -e "s#\(192\.168\.33\)\.[[:digit:]]\+#\1.$PROJECT_IP#g" ../docker/*.md ../docs/*.md ../*.yml

rm ../$0
