#!/bin/bash

if [[ -z "$1" ]]; then
    echo "You should pass a parameter either 'docker-build', 'run-dev', or 'run-test'"
    exit 1
fi

if [[ "$1" == "docker-build" ]]; then
    APP_TITLE="Expense Tracker"

    echo "Starting..."

    docker-compose build

    echo "$APP_TITLE Docker built..."

    docker-compose up
elif [[ "$1" == "run-dev" ]]; then
    # Add your run-dev logic here
    echo "Running in development mode..."
    # Example commands for run-dev

    echo "Runnint Client"
    cd ./client
    pnpm run dev &

    wait & cd ..

    cd ./server
    yarn dev &

    cd .. &

    wait
    
elif [[ "$1" == "run-test" ]]; then
    # Add your run-dev logic here
    echo "Running in test environment mode..."
    # Example commands for run-dev

    echo "Running Client"
    cd ./client
    pnpm run test:env &

    wait & cd ..

    cd ./server
    yarn test:env &

    cd .. &

    wait
    
else 
    echo "You should pass a parameter either 'docker-build', 'run-dev', or 'run-test'"
    exit 1
fi