const express = require('express');
const path = require('path');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const dbConfig = {
    user: 'system',
    password: 'sreevarshini',
    connectString: 'localhost/XE'
};
async function connectAndExecute(query, params) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        console.log("Successfully connected to Oracle Database"); // Log successful connection
        const result = await connection.execute(query, params);
        await connection.commit(); // Commit the transaction if needed
        return result;
    } catch (err) {
        console.error("Error connecting to Oracle:", err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
                console.log("Connection to Oracle Database closed");
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
}
app.post('/signup', async (req, res) => {
    console.log("Received signup request:", req.body);
    const { username, email, password } = req.body;
    const checkUserQuery = `SELECT * FROM users WHERE EMAIL = :email`;
    try {
        const result = await connectAndExecute1(checkUserQuery, { email });
        if (result.rows.length > 0) {
            console.log("User already exists");
            res.status(409).send({ error: 'User already exists' });
        } else {
            const insertQuery = `INSERT INTO users (USERNAME, EMAIL, PASSWORD) VALUES (:username, :email, :password)`;
            await connectAndExecute1(insertQuery, { username, email, password });
            console.log("Signup successful");
            res.send({ message: 'Signup successful', email });
        }
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).send({ error: 'Internal server error' });
    }
});
app.post('/login', async (req, res) => {
    console.log("Received login request:", req.body);

    const { email, password } = req.body;
    const checkUserQuery = `SELECT * FROM users WHERE EMAIL = :email`;

    try {
        const result = await connectAndExecute1(checkUserQuery, { email });
        if (result.rows.length === 0) {
            console.log("User does not exist");
            res.status(401).send({ error: 'User does not exist. Please sign up.' });
        } else {
            if (result.rows.length == 1) {
                console.log("Login successful");
                res.send({ message: 'Login successful', user: result.rows[0], email });
            } else {
                console.log("Invalid credentials");
                res.status(401).send({ error: 'Invalid credentials' });
            }
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send({ error: 'Internal server error' });
    }
});
async function connectAndExecute1(query, binds = {}, options = {}) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(query, binds, options);
        await connection.commit();
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

// app.post('/takenote', async (req, res) => {
//     console.log(req.body);
//     const { title, email ,note,formattedDateTime} = req.body;
//     console.log("ser",title,email,note,formattedDateTime);
//     const query = `INSERT INTO notes (EMAIL, TITLE, CONTENT,created) VALUES (:email, :title, :note,TO_TIMESTAMP(:formattedDateTime, 'YYYY-MM-DD HH24:MI:SS'))`;

//     try {
//         const added=await connectAndExecute1(query, { email, title, note ,formattedDateTime});
//       res.json(added);
//         res.status(200).send({ message: 'Note added successfully' });
//     } catch (err) {
//         res.status(500).send({ error: 'Internal server error' });
//     }
// }
// );
app.post('/takenote', async (req, res) => {
    console.log(req.body);
    const { title, email, note, formattedDateTime } = req.body;
    console.log("ser", title, email, note, formattedDateTime);

    const query = `INSERT INTO notes (EMAIL, TITLE, CONTENT, created) VALUES (:email, :title, :note, TO_TIMESTAMP(:formattedDateTime, 'YYYY-MM-DD HH24:MI:SS'))`;

    try {
        await connectAndExecute1(query, { email, title, note, formattedDateTime });
        res.status(200).send({ message: 'Note added successfully' });
    } catch (err) {
        console.error("Error adding note:", err);
        if (!res.headersSent) {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
});

app.get('/notes', async (req, res) => {
    const email = req.query.email; // Use req.query to get query parameters
    const query = `SELECT * FROM notes WHERE EMAIL = :email`;

    try {
        const result = await connectAndExecute1(query, { email });

        res.json(result.rows);
    } catch (err) {
        res.status(500).send({ error: 'Internal server error' });
    }
});
app.delete('/note/:id/:email', async (req, res) => {
    const noteId = req.params.id;
    console.log("hello");
    const query = `DELETE FROM notes WHERE ID = :id`;

    try {
        await connectAndExecute1(query, { id: noteId });
        const query1=`commit`;
        res.status(200).send({ message: 'Note deleted successfully' });
        
    } catch (err) {
        console.error("Error deleting note:", err);
        res.status(500).send({ error: 'Internal server error' });
    }
});
app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});

