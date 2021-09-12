# note-taker-with-express

Repo URL:https://github.com/UofTL/employee-tracker.git

This app create an interfaces that make it easy for non-developers to view and interact with information stored in databases. This command-line application wil help to manage a company's database of his employees.

* For a video on using the app click [here.](https://screencast-o-matic.com/watch/crQlbhVQNO5)
## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Install

Clone project.
Run the following line of code in your terminal to install all the needed packages: 
```
npm i
```

## Usage

Once all the packages have been installed, open terminal and run the following code in command line : 
```
node server.js

```
You will be prompted with questions to fill out employee information. Each type of employee you select will ask an additional question specific to the role of the employee. Once you have added all the employees you need select 'Im all done'. Your employee cards will then generate to the generateTeam.html where you can then view your team. 

## Built With
- SQL
- GitBash
- GitHub
- JavaScript
- Node.js
  - MySQL2
  - Inquirer
  - Console Table

## Screen shots
![image1](https://user-images.githubusercontent.com/84641285/132789740-a45f0b9c-d561-428f-9174-3221df9cfdc4.png)
![image2](https://user-images.githubusercontent.com/84641285/132789972-ad503cfb-e5f3-493f-a977-9dcec35d3677.png)
