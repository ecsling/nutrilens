import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import mysql from 'mysql2/promise';
import path from 'path';

dotenv.config();

const app = express();
const port = 5001;
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});

const caCertPath = path.resolve('./', process.env.DB_CA_PATH);

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    ca: fs.readFileSync(caCertPath)
  }
});

app.get('/users', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT id, user_email, user_password FROM user_info');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ============= FUNCTIONALITY FOR USER AUTHENTICATION ============= //
//Login Functionality
app.post ('/login', (req, res) => {
  const { username, password } = req.body;
  try{
    const usersRef = db.collection('user_inf');
    const query = usersRef.where('username', '==', username).get();

    if (query.empty) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

   const allUsers = query.docts[0];
   const thisUser = allUsers.data();

   const isMatch = bcrypt.compare(password, thisUser.password);
   if (!isMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ============= FUNCTIONALITY FOR REGISTERING NEW PRODUCT ============= // 
app.post('/register-analysis', async (req, res) => {
 try {
    const { product, diet, analysis } = req.body;

    // Insert into dietary_analysis table
    const [result] = await pool.query(
      `INSERT INTO dietary_analysis 
        (productName, dietName, isCompatible, riskLevel, compatibilityScore, reasons, warnings, recommendations) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.productName,              // e.g., "Coca Cola"
        diet.name,                         // e.g., "Vegan"
        analysis.isCompatible,             // boolean
        analysis.riskLevel || null,        // string or null
        analysis.compatibilityScore || null, // int or null
        analysis.reasons ? JSON.stringify(analysis.reasons) : null,
        analysis.warnings ? JSON.stringify(analysis.warnings) : null,
        analysis.recommendations ? JSON.stringify(analysis.recommendations) : null
      ]
    );

    res.status(201).json({ message: "Analysis saved", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save analysis" });
  }
});

// ============= FUNCTIONALITY FOR DISPLAYING HISTORY ============= // 

