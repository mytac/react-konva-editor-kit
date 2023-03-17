#!/bin/bash
DEV_ENV="-dev"
PROD_ENV="-prod"


if test $1 = $DEV_ENV
then
  REPO="http://localhost:4873/"
elif test $1 = $PROD_ENV
then
  token=$(cat ./.npm_token)
  echo "token=$token"
  REPO="https://registry.npmjs.org/"
else
  echo "enviroment invalid"
  exit 8
fi

echo "REPO=$REPO"

rm -rf ./dist && rm -rf ./lib && yarn build && cp {package.json,README.md} ./dist/ -r 
echo "【copied!】"
# npm unpublish react-konva-editor-kit@1.0.0 --force --registry $REPO|| echo "【no need to unpublish】"
# echo "【unpublished successfully!】"
cd ./dist && npm publish --registry $REPO
echo "【published!!】"

echo $n press any key to exit: $c
read name
echo "$name"

# 删除老版本
# 发布新版本