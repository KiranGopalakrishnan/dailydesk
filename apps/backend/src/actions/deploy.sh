heroku git:remote -a "dailydesk"

git subtree add --prefix=dist/apps/backend

git push --force heroku "git subtree split --prefix=dist/apps/backend HEAD":refs/heads/main
