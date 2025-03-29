require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// Start Server
// app.listen(5173, () => {
//   console.log("🚀 Server running on http://localhost:5173");

// });

// payroll backend start

// // Route to fetch employees
// app.get('/api/employees', (req, res) => {
//   const sql = 'SELECT * FROM emp_data';
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error('Database Error:', err);
//       return res.status(500).send(err);
//     }
//     res.json(result);
//   });
// });

// // Route to add a payment
// app.post('/api/payments', (req, res) => {
//   const { paid_amount, bank_name, utr, status, employee_id, date } = req.body;
  
//   const insertPaymentSql = 'INSERT INTO payments (paid_amount_, bank_name, utr, status, employee_id) VALUES (?, ?, ?, ?, ?)';
//   const updateEmployeeStatusSql = 'UPDATE emp_data SET status = ? WHERE id = ?';

//   db.query(insertPaymentSql, [paid_amount, bank_name, utr, status || 'Paid', employee_id, date], (err, result) => {
//     if (err) {
//       console.error('Database Error (Insert Payment):', err);
//       return res.status(500).send(err);
//     }

//     console.log('Payment Added:', result);

//     db.query(updateEmployeeStatusSql, ['Paid', employee_id], (err, updateResult) => {
//       if (err) {
//         console.error('Database Error (Update Employee Status):', err);
//         return res.status(500).send(err);
//       }

//       console.log('Employee Status Updated:', updateResult);
//       res.status(201).send('Payment added and employee status updated successfully');
//     });
//   });
// });

// // New Route: Update Unpaid Leaves
// app.put('/api/employees/unpaid-leaves', (req, res) => {
//   const { employee_id, unpaid_leaves } = req.body;
//   const updateLeavesSql = 'UPDATE emp_data SET unpaid_leaves = ? WHERE id = ?';

//   db.query(updateLeavesSql, [unpaid_leaves, employee_id], (err, result) => {
//     if (err) {
//       console.error('Database Error (Update Unpaid Leaves):', err);
//       return res.status(500).send(err);
//     }

//     res.status(200).send('Unpaid leaves updated successfully');
//   });
// });

// // Run the server
// /*

// app.listen(8080, () => {
//   console.log('Server running on port 8080');
// });

// */

// // payroll backend end