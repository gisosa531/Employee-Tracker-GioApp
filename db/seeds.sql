use employees_db;

INSERT INTO department (name)
VALUES
    ('Service'),
    ('Engineering'),
 

INSERT INTO role(title, salary, department_id)
VALUES
    ('Lead Engineer', 100000, 1),
  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Dexter  ', 'McPherson', 1, NULL),
