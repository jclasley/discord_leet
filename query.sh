#!/bin/sh
curl --request POST \
--url https://leetcode.com/graphql \
--header 'Content-Type: application/json' \
--data '{"query":"\n    query randomQuestion($categorySlug: String, $filters: QuestionListFilterInput) {\n  randomQuestion(categorySlug: $categorySlug, filters: $filters) {\n    titleSlug\n  }\n}\n    ","variables":{"categorySlug":"","filters":{"difficulty":"'"$1"'"}}}' | \
sed -E 's/^.*titleSlug":"(.*)"}}}$/https:\/\/leetcode.com\/problems\/\1/' 