// // import express from "express";
// // import mysql from "mysql";
// // import cors from "cors";

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // MySQL Connection
// // const db = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: 'riddhi@0025',
// //   database: 'recruitment_system',
// //   port: 3306
// // });

// // // Connect to MySQL
// // db.connect((err) => {
// //   if (err) {
// //     console.error("❌ Database connection failed:", err);
// //     process.exit(1);
// //   }
// //   console.log("✅ Connected to MySQL Database!");
// // });
// // // app.get("/",(req,res)=>(
// // //   res.send("serveris ready")
// // // ))

// // // app.get("/api/form.js",(req,res)=>(
// // //   res.send(form)
// // // ))
// // // const form = { message: "Sample form data" }; // Add this at the top of your file

// // app.get("/api/form.js", (req, res) => {
// //   res.json(form); // Send JSON response
// // });

// // // Utility functions for date formatting
// // const formatDateForDB = (dateString) => {
// //   if (!dateString) return null;
// //   const [day, month, year] = dateString.split('/');
// //   return `${year}-${month}-${day}`;
// // };

// // // Insert data into Enquiries
// // app.post("/enquiries", (req, res) => {
// //   const { companyName, bdMemberName, teamLeaderName, franchiseeName, hrExecutiveName, designation,
// //     gstNo, addressLine1, emailId, mobileNo, website, placementFees, positionname, salary,
// //     creditPeriod, replacementPeriod, enquiryStatus, clientStatus, dateOfAllocation,
// //     dateOfReallocation, newTeamLeader, nameOfFranchisee } = req.body;

// //   const sql = `
// //     INSERT INTO Enquiries 
// //     (companyName, bdMemberName, teamLeaderName, franchiseeName, hrExecutiveName, designation, gstNo,
// //      addressLine1, emailId, mobileNo, website, placementFees, positionname, salary, creditPeriod,
// //      replacementPeriod, enquiryStatus, clientStatus, dateOfAllocation, dateOfReallocation, 
// //      newTeamLeader, nameOfFranchisee)
// //     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
// //   `;

// //   const values = [
// //     companyName, bdMemberName, teamLeaderName, franchiseeName, hrExecutiveName, designation,
// //     gstNo, addressLine1, emailId, mobileNo, website, placementFees, positionname, salary,
// //     creditPeriod, replacementPeriod, enquiryStatus, clientStatus, formatDateForDB(dateOfAllocation),
// //     formatDateForDB(dateOfReallocation), newTeamLeader, nameOfFranchisee
// //   ];

// //   db.query(sql, values, (err, result) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     res.json({ message: "Enquiry added successfully!", enquiryId: result.insertId });
// //   });
// // });

// // // Get all enquiries
// // app.get("/enquiries", (req, res) => {
// //   db.query("SELECT * FROM Enquiries", (err, results) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     res.json(results);
// //   });
// // });

// // // Add Candidate Form 1
// // app.post("/candidates", (req, res) => {
// //   const { candidateName, mobileNumber, emailId, dateOfBirth, sourceOfCV, hireFor, salaryOffer, dateOfJoining, yearofexp } = req.body;
// //   const sql = `INSERT INTO CandidateForm1 (candidateName, mobileNumber, emailId, dateOfBirth, sourceOfCV, hireFor, salaryOffer, dateOfJoining, yearofexp) VALUES (?,?,?,?,?,?,?,?,?)`;
// //   const values = [candidateName, mobileNumber, emailId, formatDateForDB(dateOfBirth), sourceOfCV, hireFor, salaryOffer, formatDateForDB(dateOfJoining), yearofexp];

// //   db.query(sql, values, (err, result) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     res.json({ message: "Candidate added successfully!", candidateId: result.insertId });
// //   });
// // });

// // // Generate Invoice (Combining Enquiry & Candidate Data)
// // app.post("/invoice", (req, res) => {
// //   const {
// //     enquiryId, candidateId, gstPaidStatus, serviceCharge, creditPeriod, replacementPeriod, dueDate
// //   } = req.body;

// //   const sql = `INSERT INTO Invoice (enquiry_id, candidate_id, gst_paid_status, service_charge, credit_period, replacement_period, due_date)
// //                VALUES (?,?,?,?,?,?,?)`;

// //   const values = [enquiryId, candidateId, gstPaidStatus, serviceCharge, creditPeriod, replacementPeriod, formatDateForDB(dueDate)];

// //   db.query(sql, values, (err, result) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     res.json({ message: "Invoice generated successfully!", invoiceId: result.insertId });
// //   });
// // });

// import express from "express";
// import mysql from "mysql";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MySQL Connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'riddhi@0025',
//   database: 'recruitment_db',
//   port: 3306
// });

// // Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     console.error("❌ Database connection failed:", err);
//     process.exit(1);
//   }
//   console.log("✅ Connected to MySQL Database!");
// });

// // Utility functions for date formatting
// const formatDateForDB = (dateString) => {
//   if (!dateString) return null;
//   const [day, month, year] = dateString.split('/');
//   return `${year}-${month}-${day}`;
// };

// // Insert data into Enquiries
// app.post("/enquiries", (req, res) => {
//   const { companyName, bdMemberName, teamLeaderName, franchiseeName, hrExecutiveName, designation,
//     gstNo, addressLine1, emailId, mobileNo, website, placementFees, positionname, salary,
//     creditPeriod, replacementPeriod, enquiryStatus, clientStatus, dateOfAllocation,
//     dateOfReallocation, newTeamLeader, nameOfFranchisee } = req.body;

//   const sql = `
//     INSERT INTO Enquiries 
//     (companyName, bdMemberName, teamLeaderName, franchiseeName, hrExecutiveName, designation, gstNo,
//      addressLine1, emailId, mobileNo, website, placementFees, positionname, salary, creditPeriod,
//      replacementPeriod, enquiryStatus, clientStatus, dateOfAllocation, dateOfReallocation, 
//      newTeamLeader, nameOfFranchisee)
//     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
//   `;

//   const values = [
//     companyName, bdMemberName, teamLeaderName, franchiseeName, hrExecutiveName, designation,
//     gstNo, addressLine1, emailId, mobileNo, website, placementFees, positionname, salary,
//     creditPeriod, replacementPeriod, enquiryStatus, clientStatus, formatDateForDB(dateOfAllocation),
//     formatDateForDB(dateOfReallocation), newTeamLeader, nameOfFranchisee
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ message: "Enquiry added successfully!", enquiryId: result.insertId });
//   });
// });

// // Get all enquiries
// app.get("/enquiries", (req, res) => {
//   db.query("SELECT * FROM Enquiries", (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // Add Candidate Form 1
// app.post("/candidates", (req, res) => {
//   const { candidateName, mobileNumber, emailId, dateOfBirth, sourceOfCV, hireFor, salaryOffer, dateOfJoining, yearofexp } = req.body;
//   const sql = `INSERT INTO CandidateForm1 (candidateName, mobileNumber, emailId, dateOfBirth, sourceOfCV, hireFor, salaryOffer, dateOfJoining, yearofexp) VALUES (?,?,?,?,?,?,?,?,?)`;
//   const values = [candidateName, mobileNumber, emailId, formatDateForDB(dateOfBirth), sourceOfCV, hireFor, salaryOffer, formatDateForDB(dateOfJoining), yearofexp];

//   db.query(sql, values, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ message: "Candidate added successfully!", candidateId: result.insertId });
//   });
// });

// // Add Candidate Form 2
// app.post("/candidates2", (req, res) => {
//   const { billNo, serviceCharge, billDate, ReasonforCreditNote} = req.body;
//   const sql = `INSERT INTO CandidateForm2 (billNo, serviceCharge, billDate, ReasonforCreditNote) VALUES (?,?,?,?,?,?,?,?,?)`;
//   const values = [billNo, serviceCharge, billDate, ReasonforCreditNote];

//   db.query(sql, values, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ message: "Candidate added successfully!", candidateId: result.insertId });
//   });
// });

// // Add Candidate Form 3
// app.post("/candidates3", (req, res) => {
//   const { candidateName, billDate, billNo, revisionDetails } = req.body;
//   const sql = `INSERT INTO CandidateForm3 (candidateName, billDate, billNo, revisionDetails) VALUES (?,?,?,?,?,?,?,?,?)`;
//   const values = [candidateName, billDate, billNo, revisionDetails];

//   db.query(sql, values, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ message: "Candidate added successfully!", candidateId: result.insertId });
//   });
// });

// // Add Cancellation Data
// app.post("/cancellations", (req, res) => {
//   const { emailAddress, nameOfFranchise, nameOfCompany, cancelChange, billNo, serviceChargeAmount, reasonOfCancel, candidateName, detailsChangesRequired, creditNoteDate, creditNoteNo, newBillNo, newBillDate, candidateForm2_id, candidateForm3_id } = req.body;
  
//   const sql = `INSERT INTO CancellationData (emailAddress, nameOfFranchise, nameOfCompany, cancelChange, billNo, serviceChargeAmount, reasonOfCancel, candidateName, detailsChangesRequired, creditNoteDate, creditNoteNo, newBillNo, newBillDate, candidateForm2_id, candidateForm3_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  
//   const values = [emailAddress, nameOfFranchise, nameOfCompany, cancelChange, billNo, serviceChargeAmount, reasonOfCancel, candidateName, detailsChangesRequired, formatDateForDB(creditNoteDate), creditNoteNo, newBillNo, formatDateForDB(newBillDate), candidateForm2_id, candidateForm3_id];

//   db.query(sql, values, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ message: "Cancellation added successfully!", cancellationId: result.insertId });
//   });
// });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log("🚀 Server running on port ${PORT}");
// });



import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "riddhi@0025",
  database: "recruitment_db",
  port: 3306,
})

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err)
    process.exit(1)
  }
  console.log("✅ Connected to MySQL Database!")
})

// Utility functions for date formatting
const formatDateForDB = (dateString) => {
  if (!dateString) return null

  // Handle ISO date strings from frontend
  if (dateString.includes("T")) {
    return dateString.split("T")[0]
  }

  // Handle DD/MM/YYYY format
  if (dateString.includes("/")) {
    const [day, month, year] = dateString.split("/")
    return `${year}-${month}-${day}`
  }

  // Return as is if already in YYYY-MM-DD format
  return dateString
}

// GET all enquiries
app.get("/enquiries", (req, res) => {
  db.query("SELECT * FROM Enquiries", (err, results) => {
    if (err) {
      console.error("Error fetching enquiries:", err)
      return res.status(500).json({ error: "Failed to fetch enquiries" })
    }
    res.json(results)
  })
})

// GET a single enquiry by ID
app.get("/enquiries/:id", (req, res) => {
  const { id } = req.params
  db.query("SELECT * FROM Enquiries WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching enquiry:", err)
      return res.status(500).json({ error: "Failed to fetch enquiry" })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Enquiry not found" })
    }

    res.json(results[0])
  })
})

// POST a new enquiry
app.post("/enquiries", (req, res) => {
  const {
    companyName,
    bdMemberName,
    teamLeaderName,
    franchiseeName,
    hrExecutiveName,
    designation,
    gstNo,
    addressLine1,
    emailId,
    mobileNo,
    website,
    placementFees,
    positionname,
    salary,
    creditPeriod,
    replacementPeriod,
    enquiryStatus,
    clientStatus,
    dateOfAllocation,
    dateOfReallocation,
    newTeamLeader,
    nameOfFranchisee,
  } = req.body

  const sql = `
    INSERT INTO Enquiries 
    (companyName, bdMemberName, teamLeaderName, franchiseeName, hrExecutiveName, designation, gstNo,
     addressLine1, emailId, mobileNo, website, placementFees, positionname, salary, creditPeriod,
     replacementPeriod, enquiryStatus, clientStatus, dateOfAllocation, dateOfReallocation, 
     newTeamLeader, nameOfFranchisee)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `

  const values = [
    companyName,
    bdMemberName,
    teamLeaderName,
    franchiseeName,
    hrExecutiveName,
    designation,
    gstNo,
    addressLine1,
    emailId,
    mobileNo,
    website,
    placementFees,
    positionname,
    salary,
    creditPeriod,
    replacementPeriod,
    enquiryStatus,
    clientStatus,
    formatDateForDB(dateOfAllocation),
    formatDateForDB(dateOfReallocation),
    newTeamLeader,
    nameOfFranchisee,
  ]

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating enquiry:", err)
      return res.status(500).json({ error: "Failed to create enquiry" })
    }
    res.status(201).json({ message: "Enquiry added successfully!", enquiryId: result.insertId })
  })
})

// PUT (update) an enquiry
app.put("/enquiries/:id", (req, res) => {
  const { id } = req.params
  const {
    companyName,
    bdMemberName,
    teamLeaderName,
    franchiseeName,
    hrExecutiveName,
    designation,
    gstNo,
    addressLine1,
    emailId,
    mobileNo,
    website,
    placementFees,
    positionname,
    salary,
    creditPeriod,
    replacementPeriod,
    enquiryStatus,
    clientStatus,
    dateOfAllocation,
    dateOfReallocation,
    newTeamLeader,
    nameOfFranchisee,
  } = req.body

  const sql = `
    UPDATE Enquiries 
    SET companyName = ?, bdMemberName = ?, teamLeaderName = ?, franchiseeName = ?, 
    hrExecutiveName = ?, designation = ?, gstNo = ?, addressLine1 = ?, emailId = ?, 
    mobileNo = ?, website = ?, placementFees = ?, positionname = ?, salary = ?, 
    creditPeriod = ?, replacementPeriod = ?, enquiryStatus = ?, clientStatus = ?, 
    dateOfAllocation = ?, dateOfReallocation = ?, newTeamLeader = ?, nameOfFranchisee = ?
    WHERE id = ?
  `

  const values = [
    companyName,
    bdMemberName,
    teamLeaderName,
    franchiseeName,
    hrExecutiveName,
    designation,
    gstNo,
    addressLine1,
    emailId,
    mobileNo,
    website,
    placementFees,
    positionname,
    salary,
    creditPeriod,
    replacementPeriod,
    enquiryStatus,
    clientStatus,
    formatDateForDB(dateOfAllocation),
    formatDateForDB(dateOfReallocation),
    newTeamLeader,
    nameOfFranchisee,
    id,
  ]

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating enquiry:", err)
      return res.status(500).json({ error: "Failed to update enquiry" })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Enquiry not found" })
    }

    res.json({ message: "Enquiry updated successfully!" })
  })
})

// DELETE an enquiry
app.delete("/enquiries/:id", (req, res) => {
  const { id } = req.params

  db.query("DELETE FROM Enquiries WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting enquiry:", err)
      return res.status(500).json({ error: "Failed to delete enquiry" })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Enquiry not found" })
    }

    res.json({ message: "Enquiry deleted successfully!" })
  })
})

// GET all companies
app.get("/companies", (req, res) => {
  db.query("SELECT * FROM Companies", (err, results) => {
    if (err) {
      console.error("Error fetching companies:", err)
      return res.status(500).json({ error: "Failed to fetch companies" })
    }
    res.json(results)
  })
})

// GET a single company by ID
app.get("/companies/:id", (req, res) => {
  const { id } = req.params
  db.query("SELECT * FROM Companies WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching company:", err)
      return res.status(500).json({ error: "Failed to fetch company" })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Company not found" })
    }

    res.json(results[0])
  })
})

// POST a new candidate
app.post("/candidates", (req, res) => {
  const {
    candidateName,
    mobileNumber,
    emailId,
    dateOfBirth,
    sourceOfCV,
    hireFor,
    salaryOffer,
    dateOfJoining,
    yearofexp,
    enquiryId,
  } = req.body

  const sql = `INSERT INTO CandidateForm1 
    (candidateName, mobileNumber, emailId, dateOfBirth, sourceOfCV, hireFor, salaryOffer, dateOfJoining, yearofexp, enquiry_id) 
    VALUES (?,?,?,?,?,?,?,?,?,?)`

  const values = [
    candidateName,
    mobileNumber,
    emailId,
    formatDateForDB(dateOfBirth),
    sourceOfCV,
    hireFor,
    salaryOffer,
    formatDateForDB(dateOfJoining),
    yearofexp,
    enquiryId,
  ]

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating candidate:", err)
      return res.status(500).json({ error: "Failed to create candidate" })
    }
    res.status(201).json({ message: "Candidate added successfully!", candidateId: result.insertId })
  })
})

// POST a new credit note
app.post("/candidates2", (req, res) => {
  const { billNo, serviceCharge, billDate, ReasonforCreditNote, enquiryId } = req.body

  const sql = `INSERT INTO CandidateForm2 
    (billNo, serviceCharge, billDate, ReasonforCreditNote, enquiry_id) 
    VALUES (?,?,?,?,?)`

  const values = [billNo, serviceCharge, formatDateForDB(billDate), ReasonforCreditNote, enquiryId]

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating credit note:", err)
      return res.status(500).json({ error: "Failed to create credit note" })
    }
    res.status(201).json({ message: "Credit note added successfully!", id: result.insertId })
  })
})

// POST a new revision
app.post("/candidates3", (req, res) => {
  const { candidateName, billDate, billNo, revisionDetails, enquiryId } = req.body

  const sql = `INSERT INTO CandidateForm3 
    (candidateName, billDate, billNo, revisionDetails, enquiry_id) 
    VALUES (?,?,?,?,?)`

  const values = [candidateName, formatDateForDB(billDate), billNo, revisionDetails, enquiryId]

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating revision:", err)
      return res.status(500).json({ error: "Failed to create revision" })
    }
    res.status(201).json({ message: "Revision added successfully!", id: result.insertId })
  })
})

// POST a new cancellation
app.post("/cancellations", (req, res) => {
  const {
    emailAddress,
    nameOfFranchise,
    nameOfCompany,
    cancelChange,
    billNo,
    serviceChargeAmount,
    reasonOfCancel,
    candidateName,
    detailsChangesRequired,
    creditNoteDate,
    creditNoteNo,
    newBillNo,
    newBillDate,
    candidateForm2_id,
    candidateForm3_id,
    enquiryId,
    movedDate,
  } = req.body

  const sql = `INSERT INTO CancellationData 
    (emailAddress, nameOfFranchise, nameOfCompany, cancelChange, billNo, 
    serviceChargeAmount, reasonOfCancel, candidateName, detailsChangesRequired, 
    creditNoteDate, creditNoteNo, newBillNo, newBillDate, candidateForm2_id, 
    candidateForm3_id, enquiry_id, moved_date) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

  const values = [
    emailAddress || null,
    nameOfFranchise || null,
    nameOfCompany || null,
    cancelChange || null,
    billNo || null,
    serviceChargeAmount || null,
    reasonOfCancel || null,
    candidateName || null,
    detailsChangesRequired || null,
    formatDateForDB(creditNoteDate) || null,
    creditNoteNo || null,
    newBillNo || null,
    formatDateForDB(newBillDate) || null,
    candidateForm2_id || null,
    candidateForm3_id || null,
    enquiryId || null,
    formatDateForDB(movedDate) || null,
  ]

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating cancellation:", err)
      return res.status(500).json({ error: "Failed to create cancellation" })
    }
    res.status(201).json({ message: "Cancellation added successfully!", id: result.insertId })
  })
})

// Start Server
const PORT = 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

