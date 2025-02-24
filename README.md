

## How To Run
1. Make sure you have Xammp installed and MySQL adn Apache services are started'
##
2.Go to the project directory open the terminal and run the following command:
    php artisan migrate (This will create the database and tables)
##
3. If you want to seed the database run this after running the above command
    php artisan migrate:fresh --seed
    After this you will be able to use these credentials to log in
    'name' => 'test_user',
            'email' => 'test_user@gmail.com',
            'password' => 'test_pass',
##
4. run php artisan serve then access this link on your browser to log in http://127.0.0.1:8000

##
5. I have already built assets by running "npm run build". But if you want to make changes on the front-end run "npm run dev" on a separate terminal so that the changes will reflect as you make them.

