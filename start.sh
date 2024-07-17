APP_TITLE="Expense Tracker"

echo "Starting..."

docker-compose build

echo "$APP_TITLE Docker built..."

docker-compose up
