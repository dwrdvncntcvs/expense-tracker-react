# Expense Tracker Application

The application were built with **_ReactJS_**, **_NodeJS & ExpressJS_**, and **_MongoDB_**. It also utilizes state management tool such as **_Redux ToolKit_**.

The application supports the following features to manage and view your personal expenses.

### **_Authentication and authorization_**

-   The authentication within the application is cookie based.

### **_Expenses Management_**

-   User is allowed to add their own expenses within the system.
-   User can filter expenses based on categories.
-   Provides a high level analytics depends on the page that you're currently at within the application

### **_Customizable Categories_**

-   This feature was included to allow users to freely create their own custom categories for their expenses that could make the analytics much detailed and to organize the expenses based on user's preference

### **_Expenses Analytics_**

-   The system supports expenses analytics where the user could be able to see and track their expenses based on the analytics result of the data they have from the database.
-   They'll be able to see the analytics or the numbers plotted through a graph about the following:
    -   **_Yearly Expenses_**
    -   **_Monthly Expenses_**
    -   **_Based on Category Expenses_**

## How to run?

The application for **_client_** & **_server_** for the expense tracker have their own docker files that handles the dockerizing the applications.

Since the application is already dockerized it will be much more easier for you to run the application just by simply following this instruction.

1. Assuming that you already pull or clone the repository of the project, first is to make sure that docker is running on your local machine.

2. You could run the docker by simply running this commands:

    You can input these commands directly from the console

    ```bash
    docker-compose build
    # or
    docker-compose up
    ```

    or you can also use the shell script that I created.

    ```bash
    ./start.sh docker-build
    ```

## How to test?

The application uses **_Playwright_** a testing framework for end-to-end **_(e2e)_** testing of application

The **_server_** and **_client_** side of the application do have a different environment that you can run in order to test it effectively. Here are the guides for testing the application:

### File Tree

```bash
expense-tracker
├── client
├── e2e
│   └── tests
├── server
├── start.sg
└── README.md
```

1. Before you go to **_e2e_** directory you should first run the following command:

    You can use this command to run the test environment of the application in both client and server side.

    ```bash
    ./start.sh run-test
    ```

    Or you can initialize or start the application separately by accessing each directories.

    ```bash
    # Running Server
    cd ./server
    yarn test:env

    #Running Client
    cd ./client
    pnpm test:env
    ```

    **_NOTE:_** These commands **_"test:env"_** will initialize environment variables for the test environments

2. Once the test environment is currently running you could start testing the application.

    ```bash
    cd ./e2e
    pnpm test
    # or
    pnpm test:ui
    ```

### Thank you for visiting my repository! 🔥
