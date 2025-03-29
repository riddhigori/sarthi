
const db = require('../config/db');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require("nodemailer");



exports.register = async (req, res) => {
  try {
    const { name, email, mobile_number, password } = req.body;

   

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users3 (name, email, mobile_number, password) VALUES (?, ?, ?, ?)';

    db.query(sql, [name, email, mobile_number, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Registration failed' });
      }
      res.status(201).json({ message: 'User registered successfully!', success: true });
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const sql = 'SELECT * FROM users3 WHERE email = ?';
      db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful!', success: true });
      });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  let otpStore = {}; 
  const ADMIN_PASSWORD = "Admin@123"; 
  const ADMIN_EMAIL="mailid"
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure:true,
    port:465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  function generateOTP() {
    return (Math.floor(100000 + Math.random() * 900000)).toString(); // 6-digit OTP
  }
  
  // 🔹 **1️⃣ Send OTP**
  exports.sendAdminOTP = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ success: false, error: "Email is required" });
  
      const otp = generateOTP();
      otpStore[email] = { otp, expiresAt: Date.now() + 2 * 60 * 1000 };
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Admin Login OTP",
        text: `Your OTP for Admin Login is: ${otp}. This OTP is valid for 2 minutes.`,
      };
  
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to send OTP" });
    }
  };
  
  // 🔹 **2️⃣ Verify OTP**
  exports.verifyAdminOTP = async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      if (!otpStore[email] || otpStore[email].expiresAt < Date.now()) {
        return res.status(400).json({ success: false, error: "OTP expired or invalid" });
      }
  
      if (otpStore[email].otp !== otp) {
        return res.status(400).json({ success: false, error: "Invalid OTP" });
      }
  
      delete otpStore[email]; // Remove OTP after verification
      res.json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };
  
  // 🔹 **3️⃣ Admin Login (With Hardcoded Password)**
  exports.adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password are required" });
      }
  
      if (password !== ADMIN_PASSWORD && email!=ADMIN_EMAIL) {
        return res.status(401).json({ success: false, error: "Incorrect password" });
      }
  
      res.json({ success: true, message: "Admin login successful" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };
  


// // 3️⃣ **Admin Login with OTP Verification**
// exports.adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (email !== 'admin@crm.com' || password !== 'Admin@123') {
//       return res.status(401).json({ error: 'Invalid admin credentials' });
//     }

//     const otp = generateOTP();
//     const expiresAt = new Date(Date.now() + 5 * 60000); // 5 mins expiry

//     const otpSql = 'INSERT INTO admin_otp (email, otp_code, expires_at) VALUES (?, ?, ?)';
//     db.query(otpSql, [email, otp, expiresAt], (err, result) => {
//       if (err) return res.status(500).json({ error: 'Failed to generate OTP' });

//       res.json({ message: 'Admin OTP sent successfully!', otp, success: true });
//     });
//   } catch (error) {
//     console.error('Error in adminLogin:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // 4️⃣ **Verify Admin OTP**
// exports.verifyAdminOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ error: 'Email and OTP are required' });
//     }

//     const otpSql = 'SELECT * FROM admin_otp WHERE email = ? AND otp_code = ? AND expires_at > NOW() AND is_verified = 0';
//     db.query(otpSql, [email, otp], (err, results) => {
//       if (err) return res.status(500).json({ error: 'Database error' });

//       if (results.length === 0) {
//         return res.status(400).json({ error: 'Invalid or expired OTP' });
//       }

//       const otpRecord = results[0];
//       const updateSql = 'UPDATE admin_otp SET is_verified = 1 WHERE id = ?';
//       db.query(updateSql, [otpRecord.id]);

//       const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.json({ message: 'Admin OTP verified. Login successful!', token, success: true });
//     });
//   } catch (error) {
//     console.error('Error in verifyAdminOTP:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Nodemailer Config
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,  // Your email
//     pass: process.env.EMAIL_PASS,  // App password
//   },
// });

// // Generate & Send OTP
// app.post("/admin/send-otp", (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
//   const expiry = new Date(Date.now() + 10 * 60000); // 10 min expiry

//   db.query(
//     "INSERT INTO admin_otps (email, otp, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp=?, expires_at=?",
//     [email, otp, expiry, otp, expiry],
//     (err) => {
//       if (err) return res.status(500).json({ message: "Database error" });

//       // Send Email
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: "Your Admin Login OTP",
//         text: `Your OTP for login is ${otp}. It is valid for 10 minutes.`,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) return res.status(500).json({ message: "Email sending failed" });
//         res.json({ message: "OTP sent successfully" });
//       });
//     }
//   );
// });

// // Verify OTP
// app.post("/admin/verify-otp", (req, res) => {
//   const { email, otp } = req.body;
//   if (!email || !otp) return res.status(400).json({ message: "Email & OTP are required" });

//   db.query(
//     "SELECT * FROM admin_otps WHERE email=? AND otp=? AND expires_at > NOW()",
//     [email, otp],
//     (err, result) => {
//       if (err) return res.status(500).json({ message: "Database error" });
//       if (result.length === 0) return res.status(400).json({ message: "Invalid or expired OTP" });

//       res.json({ message: "OTP verified successfully", success: true });
//     }
//   );
// });

