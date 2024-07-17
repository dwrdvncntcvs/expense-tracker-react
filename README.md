# Expense Tracker Application

The application were built with **_ReactJS_**, **_NodeJS & ExpressJS_**, and **_MongoDB_**. It also utilizes state management tool such as **_Redux ToolKit_**.

The application supports the following features to manage and view your personal expenses.

### **_Authentication and authorization_**

-   The authentication within the application is cookie based.

### **_Expenses Management_**

-   This allows users to add their own expenses within the system.
-   This allows users also to filter expenses based on categories.
-   This also provide a high level analytics depends on the page that you're currently at within the application

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

    ```bash
    docker-compose build 
    # or
    docker-compose up
    ```

    or just simple run this shell script for building and running docker

    ```bash
    ./start.sh
    ```
