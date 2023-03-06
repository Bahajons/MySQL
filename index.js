const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'AA12345678',
    database: 'db'
});




let student_one = {
    nr_index: 15,
    name: 'Bakhromjon',
    surname: 'Ruziev',
    birthday: `1998-04-11`,
    address: `Marymoncka 34L Warsaw`,
    school: `AWF`,
    course: `Economy`,
    mode: 'D',
    year: 1
}
// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
    
    
    // sql_delete_table('students')
    // sql_create_table()
    // sql_add_student(student_one)
    // sql_get_student('students')
    // sql_get_student()
    // sql_get_student('name, surname')
    // sql_get_student_by_order()
    sql_get_student_order_by_num_letter()
    // add()
});

// SQL add add data by loop
function add() {
    for (let i = 0; i < 12; i++) {
        let student = {
            nr_index: i + 3,
            name: i % 2 == 1 ? 'John' : 'Farrukh',
            surname: i % 3 == 1 ? 'Lee' : 'Doe',
            birthday: `1999-${1 + i}-${i}`,
            address: `12${i} Main St, Anytown, USA`,
            school: `XYZ High School${i}`,
            course: `Mathematics${i}`,
            mode: i % 2 == 1 ? 'PT' : 'D',
            year: i % 5
        }
        sql_add_student(student)
    }
}

// SQL query to create a new table
function sql_create_table() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
        nr_index INT PRIMARY KEY,
        name VARCHAR(50),
        surname VARCHAR(50),
        birthday DATE,
        address VARCHAR(100),
        school VARCHAR(100),
        course VARCHAR(50),
        mode ENUM('PT', 'D'),
        year INT
        )
        `;
    // Execute the SQL query to create the table
    connection.query(createTableQuery, (err, results) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Table created successfully');
    });
}

// SQL get from table
function sql_get_student(field = '*') {
    let insert_student = `SELECT ${field} FROM students`;
    connection.query(insert_student, (err, results, fields) => {
        if (err) {
            console.error('Error adding student:', err);
            return;
        }
        console.log(results);
    });
}
// SQL student order by
function sql_get_student_by_order() {
    let insert_student = `SELECT name, surname, school, mode, year FROM STUDENTS ORDER BY nr_index DESC`;
    connection.query(insert_student, (err, results, fields) => {
        if (err) {
            console.error('Error adding student:', err);
            return;
        }
        console.log(results);
    });
}
// SQL student order by
function sql_get_student_order_by_num_letter() {
    let insert_student = `
    SELECT surname, LENGTH(surname) as num_letters, POSITION('A' IN surname) as position_A FROM students 
    WHERE  LENGTH(surname) BETWEEN 6 AND 9 AND surname LIKE '%a%'ORDER BY num_letters DESC`;
    // let insert_student = `SELECT name, surname, school, mode, year FROM STUDENTS ORDER BY nr_index DESC`;
    connection.query(insert_student, (err, results, fields) => {
        if (err) {
            console.error('Error adding student:', err);
            return;
        }
        console.log(results);
    });
}

// SQL add student
function sql_add_student(student) {
    let insert_student = `INSERT INTO students SET ?`;
    connection.query(insert_student, student, (err, results, fields) => {
        if (err) {
            console.error('Error adding student:', err);
            return;
        }
        console.log('Student addes successfully');
    });
}


// SQL delete table
function sql_delete_table(table = 'students') {
    connection.query(`DROP TABLE ${table}`, (error, results, fields) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Deleted ${results.affectedRows} table(s).`);
        }
    });
}
