const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
let students = [
    {
        id: 1,
        name: "Sadia",
        email: "sadia@example.com",
        department: "CSE"
    },
    {
        id: 2,
        name: "Rahim",
        email: "rahim@example.com",
        department: "EEE"
    }
];
app.get("/students", (req, res) => {
    res.json(students);
});
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});
app.post("/students", (req, res) => {
    const { name, email, department } = req.body;

    const newId = students.length > 0
        ? Math.max(...students.map(student => student.id)) + 1
        : 1;

    const newStudent = {
        id: newId,
        name: name,
        email: email,
        department: department
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, department } = req.body;

    student.name = name;
    student.email = email;
    student.department = department;

    res.json(student);
});

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(studentIndex, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
