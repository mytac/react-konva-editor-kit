#!/bin/bash
npx tsc && cp {package.json,README.md} ./dist/ -r && cp ./src/image ./dist/ -r &&cd ./dist
# rm -rf ./dist && npx tsc && cp {package.json,README.md} ./dist/ -r && npm unpublish react-konva-editor@1.0.2 && cd ./dist && npm publish
# 删除老版本
# 发布新版本