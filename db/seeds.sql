use employees_db;

INSERT INTO department (dept_name)
VALUES
    ('Engineering');
 
INSERT INTO roles (title, salary, department_id)
VALUES
    ('Lead Engineer', 100000, 1);
  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Dexter  ', 'McPherson', 1, 1);
