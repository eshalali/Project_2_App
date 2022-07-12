# Project 2 App
## What is the app? ##
A budget app designed to house all expenses and goals in one place. Instead of having to look at spreadsheets, give a more aesthetically appealing display of a user's spending and saving habits and help them to meet their financial goals.
## Models ##
### Expected expenses ###
name: String,  
description: String,  
amount: Number,  
category: String (dropdown menu)  
### Actual expenses ###
name: String,  
description: String,  
amount: Number,  
category: String (dropdown menu)  
### Long-term financial goals ###
name: String,  
description: String,  
category: String (dropdown menu)  
### Investments ###
name: String,  
amount: Number,  
category: String (dropdown menu)  
### ERD ###
![erd](/images/ERD.png)


## User stories ##
- Login to user account
    - See all saved expected, actual expenses, goals, and investments
- Create expected expenses
    - Build schema/model
    - Choose category
- See expected expenses
    - Query all expected expenses with find()
    - Return all
- Update expected expenses
    - Find by ID
    - Update
- Delete expected expenses
    - Find by ID
    - Remove
- Create actual expenses
    - Build schema/model
    - Choose category, tag
    - User input or connect to bank
- See actual expenses
    - Query all actual expenses with find()   
    - Return all
    - Have graph comparing income and expenses
    - Show comparison to expected expenses
- Update actual expenses
    - Find by ID
    - Update
- Delete actual expenses
    - Find by ID
    - Remove
- Create long-term goals
    - Build schema/model
- See long-term goals
    - Query all goals with find()   
    - Return all
    - Option to check-off
- Update long-term goals
    - Find by ID
    - Update
- Delete long-term goals
    - Find by ID
    - Remove
- Create investments
    - Build schema/model
- See investments
    - Query all investments with find()   
    - Return all
- Update investments
    - Find by ID
    - Update
- Delete investments
    - Find by ID
    - Remove

#### EXPECTED/ACTUAL EXPENSE REST ROUTES ####
Action      | HTTP Verb  | Route              | Purpose
----------- | ---------- |------------------- | --------------------------------------- |
Index       | GET        | /expected/         | show all expected expenses              |
Show        | GET        | /expected/:id      | look at one expected expense            |
Edit        | GET        | /expected/:id/edit | edit one expected expense               |
Update      | PUT        | /expected/:id      | update one expected expense             |
New         | GET        | /expected/new      | new expected expense                    |
Create      | POST       | /expected          | create expected expense,redirect to all |
Delete      | DELETE     | /expected/:id      | delete a single expected expense        |

## API ##
### Plaid API ###
* Allows for access to bank transactions; user can add their bank account and import transactions
* Each transaction has a category/tags to make sorting easier
* Plaid provides main store name/what the expense was, the user can add a description

## Wireframes ##
![wireframe](/images/WF1.png)
![wireframe](/images/WF2.png)
![wireframe]!(/images/WF3.png)
![wireframe](/images/WF4.png)

## Timeline ##
Day 1: Create user  
Day 2: Create expected expense routes  
Day 3: Create actual expense routes - connect API  
Day 4: Create long term goal routes  
Day 5: Create investment routes  
Day 6: Styling  
Day 7: Debugging/final touches  