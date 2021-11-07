use employees_db;

INSERT INTO department (dept_name)
VALUES
    ('Engineering'),
    ('Sales'),
    ('Marketing');
 
INSERT INTO roles (title, salary, department_id)
VALUES
    ('Lead Engineer', 150000, 1),
    ('Salesperson', 80000, 2),
    ('Accountant', 100000, 3);
  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Dexter', 'McPherson', 1, 1),
    ('Dale', 'Gribble', 2, 2),
    ('John', 'Redcorn', 3, null);
