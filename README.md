# InfScroll

This project was generated with Angular CLI version 14.2.13.

<img width="1346" alt="Screenshot 2024-07-15 at 7 10 08 PM" src="https://github.com/user-attachments/assets/02ef305b-5917-45ae-94ae-fcd6c8aa53c9">

1. need to fix cors problem by adding a proxy.conf.json file and declare in angular.json.
2. it's tricky that the data id starts at '42', not '0'. So we have to fetch first 5 without "lastid" parameter and record the lastid of them for the following api calls.
