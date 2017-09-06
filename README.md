# Activity Log CRUD Grid

This project is a simple responsive CRUD grid meant to be an activity logger.

This project uses:
* Bootstrap
* AngularJS
* PHP
* MySQL

### Steps to get started
1. Download the project into your web server's directory
2. Create a `db_connect.php` file in the root of the project folder
3. Paste the following code into the file and enter you MySQL credentials:
```
    <?php

    define('DB_USER', 'username');
    define('DB_PASSWORD', 'password');
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'db_name');

    ?>
```
4. Create a MySQL database and import the `setup.sql` script
5. Navigate to the url (ex: http://localhost/activity-log/) and start logging!