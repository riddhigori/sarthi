// "use client"

// import { useState, useEffect } from "react"
// import CandidateForm from "./candidateform"
// import CreditNoteForm from "./candidateform2"
// import RevisionForm from "./candidateform3"
// import "./enquiry.css"

// const Enquiry = () => {
//   // State for enquiry data table
//   const [enquiryData, setEnquiryData] = useState([])
//   const [showEnquiryForm, setShowEnquiryForm] = useState(false)
//   const [showCandidateForm, setShowCandidateForm] = useState(false)
//   const [currentEnquiry, setCurrentEnquiry] = useState(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortBy, setSortBy] = useState("")
//   const [sortOrder, setSortOrder] = useState("asc")
//   const [showCreditNoteForm, setShowCreditNoteForm] = useState(false)
//   const [showRevisionForm, setShowRevisionForm] = useState(false)
//   const [companies, setCompanies] = useState([])

//   // Form state
//   const [formData, setFormData] = useState({
//     companyName: "",
//     bdMemberName: "",
//     teamLeaderName: "",
//     franchiseeName: "",
//     hrExecutiveName: "",
//     designation: "",
//     gstNo: "",
//     addressLine1: "",
//     emailId: "",
//     mobileNo: "",
//     website: "",
//     placementFees: "",
//     positionname: "",
//     salary: "",
//     creditPeriod: "",
//     replacementPeriod: "",
//     enquiryStatus: "",
//     clientStatus: "",
//     dateOfAllocation: "",
//     dateOfReallocation: "",
//     newTeamLeader: "",
//     nameOfFranchisee: "",
//   })

//   // Fetch companies for dropdown
//   // useEffect(() => {
//   //   const fetchCompanies = async () => {
//   //     try {
//   //       const response = await fetch("/api/companies")
//   //       if (response.ok) {
//   //         const data = await response.json()
//   //         setCompanies(data)
//   //       } else {
//   //         console.error("Failed to fetch companies")
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching companies:", error)
//   //     }
//   //   }

//   //   fetchCompanies()
//   // }, [])

//   // const App = () => {
//   //   const getForm = async () => {
//   //     try {
//   //       const res = await fetch("http://localhost:5000/api/form");
//   //       const data = await res.json();
//   //       console.log(data);
//   //     } catch (error) {
//   //       console.error("Error:", error);
//   //     }
//   //   }};
  
//   //   useEffect(() => {
//   //     // getForm();
//   //   }, []);

//   // Fetch enquiry data
//   // useEffect(() => {
//   //   const fetchEnquiryData = async () => {
//   //     try {
//   //       const response = await fetch("/api/enquiries")
//   //       if (response.ok) {
//   //         const data = await response.json()
//   //         setEnquiryData(data)
//   //       } else {
//   //         console.error("Failed to fetch enquiry data")
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching enquiry data:", error)
//   //     }
//   //   }

//   //   fetchEnquiryData()
//   // }, [])

//   // Fetch company details when company is selected
//   // const fetchCompanyDetails = async (companyId) => {
//   //   try {
//   //     const response = await fetch(`/api/companies/${companyId}`)
//   //     if (response.ok) {
//   //       const companyData = await response.json()
//   //       // Auto-fill form with company data
//   //       setFormData((prevData) => ({
//   //         ...prevData,
//   //         bdMemberName: companyData.bdMemberName || "",
//   //         teamLeaderName: companyData.teamLeaderName || "",
//   //         franchiseeName: companyData.franchiseeName || "",
//   //         hrExecutiveName: companyData.hrExecutiveName || "",
//   //         designation: companyData.designation || "",
//   //         gstNo: companyData.gstNo || "",
//   //         addressLine1: companyData.addressLine1 || "",
//   //         emailId: companyData.emailId || "",
//   //         mobileNo: companyData.mobileNo || "",
//   //         website: companyData.website || "",
//   //       }))
//   //     } else {
//   //       console.error("Failed to fetch company details")
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching company details:", error)
//   //   }
//   // }

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })

//     // If company name is changed, fetch company details
//     if (name === "companyName" && value) {
//       fetchCompanyDetails(value)
//     }

//     // Show candidate form when enquiry status is closed
//     if (name === "enquiryStatus" && value === "Closed") {
//       setShowCandidateForm(true)
//     }

//     // Show credit note form when enquiry status is credit note
//     if (name === "enquiryStatus" && value === "Credit Note") {
//       setShowCreditNoteForm(true)
//     }

//     // Show revision form when enquiry status is revised
//     if (name === "enquiryStatus" && value === "Revised") {
//       setShowRevisionForm(true)
//     }
//   }

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       let response

//       if (currentEnquiry) {
//         // Update existing enquiry
//         response = await fetch(`/api/enquiries/${currentEnquiry.id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         })

//         // If status is closed or revised, move to cancellation sheet
//         if (formData.enquiryStatus === "Closed" || formData.enquiryStatus === "Revised") {
//           await fetch("/api/cancellations", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               ...formData,
//               enquiryId: currentEnquiry.id,
//               movedDate: new Date().toISOString(),
//             }),
//           })
//         }
//       } else {
//         // Add new enquiry
//         response = await fetch("/api/enquiries", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         })
//       }

//       if (response.ok) {
//         // Refresh enquiry data
//         const updatedEnquiriesResponse = await fetch("/api/enquiries")
//         if (updatedEnquiriesResponse.ok) {
//           const updatedData = await updatedEnquiriesResponse.json()
//           setEnquiryData(updatedData)
//         }

//         // Reset form and close it
//         resetForm()
//       } else {
//         console.error("Failed to save enquiry data")
//       }
//     } catch (error) {
//       console.error("Error saving enquiry data:", error)
//     }
//   }

//   // Reset form and close it
//   const resetForm = () => {
//     setFormData({
//       companyName: "",
//       bdMemberName: "",
//       teamLeaderName: "",
//       franchiseeName: "",
//       hrExecutiveName: "",
//       designation: "",
//       gstNo: "",
//       addressLine1: "",
//       emailId: "",
//       mobileNo: "",
//       website: "",
//       placementFees: "",
//       positionname: "",
//       salary: "",
//       creditPeriod: "",
//       replacementPeriod: "",
//       enquiryStatus: "",
//       clientStatus: "",
//       dateOfAllocation: "",
//       dateOfReallocation: "",
//       newTeamLeader: "",
//       nameOfFranchisee: "",
//     })
//     setCurrentEnquiry(null)
//     setShowEnquiryForm(false)
//     setShowCandidateForm(false)
//     setShowCreditNoteForm(false)
//     setShowRevisionForm(false)
//   }

//   // Handle edit enquiry
//   const handleEdit = async (enquiry) => {
//     try {
//       const response = await fetch(`/api/enquiries/${enquiry.id}`)
//       if (response.ok) {
//         const enquiryData = await response.json()
//         setCurrentEnquiry(enquiryData)
//         setFormData(enquiryData)
//         setShowEnquiryForm(true)
//       } else {
//         console.error("Failed to fetch enquiry details")
//       }
//     } catch (error) {
//       console.error("Error fetching enquiry details:", error)
//     }
//   }

//   // Handle delete enquiry
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`/api/enquiries/${id}`, {
//         method: "DELETE",
//       })

//       if (response.ok) {
//         // Update local state
//         const updatedData = enquiryData.filter((item) => item.id !== id)
//         setEnquiryData(updatedData)
//       } else {
//         console.error("Failed to delete enquiry")
//       }
//     } catch (error) {
//       console.error("Error deleting enquiry:", error)
//     }
//   }

//   // Handle search
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value)
//   }

//   // Handle sort
//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc")
//     } else {
//       setSortBy(field)
//       setSortOrder("asc")
//     }
//   }

//   // Filter and sort data
//   const filteredData = enquiryData.filter((item) => {
//     return Object.values(item).some(
//       (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
//     )
//   })

//   const sortedData = [...filteredData].sort((a, b) => {
//     if (!sortBy) return 0

//     const aValue = a[sortBy]
//     const bValue = b[sortBy]

//     if (sortOrder === "asc") {
//       return aValue > bValue ? 1 : -1
//     } else {
//       return aValue < bValue ? 1 : -1
//     }
//   })

//   // Export to CSV
//   const exportToCSV = () => {
//     const headers = Object.keys(enquiryData[0] || {}).join(",")
//     const csvData = enquiryData.map((row) => Object.values(row).join(",")).join("\n")
//     const csv = `${headers}\n${csvData}`

//     const blob = new Blob([csv], { type: "text/csv" })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.setAttribute("hidden", "")
//     a.setAttribute("href", url)
//     a.setAttribute("download", "enquiry_data.csv")
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//   }

//   // Handle candidate form submission
//   const handleCandidateSubmit = async (candidateData) => {
//     try {
//       const response = await fetch("/api/candidates", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...candidateData,
//           enquiryId: currentEnquiry?.id,
//         }),
//       })

//       if (response.ok) {
//         console.log("Candidate data submitted successfully")
//         setShowCandidateForm(false)
//       } else {
//         console.error("Failed to submit candidate data")
//       }
//     } catch (error) {
//       console.error("Error submitting candidate data:", error)
//     }
//   }

//   return (
//     <div className="enquiry-container">
//       {!showEnquiryForm ? (
//         // Enquiry Data Table View
//         <div className="enquiry-table-container">
//           <div className="enquiry-header">
//             <h1>Enquiry Data</h1>
//             <p>All the enquiry Data are listed here</p>
//             <div className="enquiry-actions">
//               <div className="search-sort-wrap">
//                 <div className="enquiry-search-container">
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     value={searchTerm}
//                     onChange={handleSearch}
//                     className="enquiry-search-input"
//                   />
//                   <span className="enquiry-search-icon">🔍</span>
//                 </div>
//                 <div className="enquiry-sort-container">
//                   <select
//                     className="enquiry-sort-select"
//                     value={sortBy}
//                     onChange={(e) => {
//                       setSortBy(e.target.value)
//                       setSortOrder("asc")
//                     }}
//                   >
//                     <option value="">Sort by</option>
//                     <option value="bdMemberName">BD Member</option>
//                     <option value="enquiryStatus">Enquiry Status</option>
//                     <option value="franchiseeName">Franchise</option>
//                     <option value="teamLeaderName">Team Leader</option>
//                   </select>
//                 </div>
//               </div>
//               <button className="enquiry-add-button" onClick={() => setShowEnquiryForm(true)}>
//                 + Add Enquiry Data
//               </button>
//             </div>
//           </div>
//           <div className="wrapper-enq-table">
//             <div className="enquiry-table-container">
//               <div className="enquiry-table-header">
//                 <h2>Enquiry Data</h2>
//                 <button className="enquiry-download-button" onClick={exportToCSV}>
//                   <span className="enquiry-download-icon">↓</span>
//                 </button>
//               </div>
//               <div className="enquiry-table-scroll">
//                 <table className="enquiry-table">
//                   <thead>
//                     <tr>
//                       <th onClick={() => handleSort("companyName")}>COMPANY NAME</th>
//                       <th onClick={() => handleSort("bdMemberName")}>NAME OF BD MEMBER</th>
//                       <th onClick={() => handleSort("teamLeaderName")}>NAME OF TEAM LEADER</th>
//                       <th onClick={() => handleSort("franchiseeName")}>NAME OF FRANCHISE</th>
//                       <th onClick={() => handleSort("hrExecutiveName")}>NAME OF HR EXECUTIVE</th>
//                       <th onClick={() => handleSort("designation")}>Designation</th>
//                       <th onClick={() => handleSort("gstNo")}>GST NO.</th>
//                       <th onClick={() => handleSort("addressLine1")}>ADDRESS</th>
//                       <th onClick={() => handleSort("emailId")}>EMAIL ID</th>
//                       <th onClick={() => handleSort("mobileNo")}>MOBILE NO.</th>
//                       <th onClick={() => handleSort("website")}>WEBSITE</th>
//                       <th onClick={() => handleSort("placementFees")}>PLACEMENT FEES</th>
//                       <th onClick={() => handleSort("positionname")}>POSITION NAME</th>
//                       <th onClick={() => handleSort("salary")}>SALARY</th>
//                       <th onClick={() => handleSort("creditPeriod")}>CREDIT PERIOD</th>
//                       <th onClick={() => handleSort("replacementPeriod")}>REPLACEMENT PERIOD</th>
//                       <th onClick={() => handleSort("enquiryStatus")}>ENQUIRY STATUS</th>
//                       <th onClick={() => handleSort("clientStatus")}>CLIENT STATUS</th>
//                       <th onClick={() => handleSort("dateOfAllocation")}>DATE OF ALLOCATION</th>
//                       <th onClick={() => handleSort("dateOfReallocation")}>DATE OF REALLOCATION</th>
//                       <th onClick={() => handleSort("newTeamLeader")}>NEW TEAM LEADER</th>
//                       <th onClick={() => handleSort("nameOfFranchisee")}>NAME OF FRANCHISEE</th>
//                       <th>ACTION</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {sortedData.map((item) => (
//                       <tr key={item.id}>
//                         <td>{item.companyName}</td>
//                         <td>{item.bdMemberName}</td>
//                         <td>{item.teamLeaderName}</td>
//                         <td>{item.franchiseeName}</td>
//                         <td>{item.hrExecutiveName}</td>
//                         <td>{item.designation}</td>
//                         <td>{item.gstNo}</td>
//                         <td>{item.addressLine1}</td>
//                         <td>{item.emailId}</td>
//                         <td>{item.mobileNo}</td>
//                         <td>{item.website}</td>
//                         <td>{item.placementFees}</td>
//                         <td>{item.positionname}</td>
//                         <td>{item.salary}</td>
//                         <td>{item.creditPeriod}</td>
//                         <td>{item.replacementPeriod}</td>
//                         <td>{item.enquiryStatus}</td>
//                         <td>{item.clientStatus}</td>
//                         <td>{item.dateOfAllocation}</td>
//                         <td>{item.dateOfReallocation}</td>
//                         <td>{item.newTeamLeader}</td>
//                         <td>{item.nameOfFranchisee}</td>
//                         <td className="enquiry-action-buttons">
//                           <button className="enquiry-edit-button" onClick={() => handleEdit(item)}>
//                             <span className="enquiry-edit-icon">✏️</span>
//                           </button>
//                           <button className="enquiry-delete-button" onClick={() => handleDelete(item.id)}>
//                             <span className="enquiry-delete-icon">🗑️</span>
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="add-enquiry-button" onClick={() => setShowEnquiryForm(true)}>
//               <span className="enquiry-plus-icon">+</span> Click here to add Enquiry Data
//             </div>
//           </div>
//         </div>
//       ) : (
//         // Enquiry Form View
//         <div className="enquiry-form-container">
//           <div className="enquiry-form-header">
//             <button className="enquiry-back-button" onClick={resetForm}>
//               ← Enquiry Data
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="enquiry-form-section">
//               <h3>A. Company & Contact Details</h3>

//               <div className="enquiry-form-field">
//                 <label>Company Name</label>
//                 <select name="companyName" value={formData.companyName} onChange={handleInputChange}>
//                   <option value="">Select</option>
//                   {companies.map((company) => (
//                     <option key={company.id} value={company.id}>
//                       {company.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="enquiry-form-row">
//                 <div className="enquiry-form-field">
//                   <label>Name of BD Members</label>
//                   <input
//                     type="text"
//                     name="bdMemberName"
//                     value={formData.bdMemberName}
//                     onChange={handleInputChange}
//                     placeholder="Enter BD Member Name"
//                   />
//                 </div>

//                 <div className="enquiry-form-field">
//                   <label>Name of Team Leader</label>
//                   <input
//                     type="text"
//                     name="teamLeaderName"
//                     value={formData.teamLeaderName}
//                     onChange={handleInputChange}
//                     placeholder="Enter Team Leader Name"
//                   />
//                 </div>

//                 <div className="enquiry-form-field">
//                   <label>Name of Franchisee</label>
//                   <input
//                     type="text"
//                     name="franchiseeName"
//                     value={formData.franchiseeName}
//                     onChange={handleInputChange}
//                     placeholder="Enter Franchisee Name"
//                   />
//                 </div>
//               </div>

//               <div className="enquiry-form-row">
//                 <div className="enquiry-form-field">
//                   <label>Name of HR Executive</label>
//                   <input
//                     type="text"
//                     name="hrExecutiveName"
//                     value={formData.hrExecutiveName}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="enquiry-form-field">
//                   <label>Designation</label>
//                   <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} />
//                 </div>

//                 <div className="enquiry-form-field">
//                   <label>GST No.</label>
//                   <input type="text" name="gstNo" value={formData.gstNo} onChange={handleInputChange} />
//                 </div>
//               </div>

//               <div className="enquiry-form-field">
//                 <label>Address Line 1</label>
//                 <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} />
//               </div>

//               <div className="enquiry-form-row">
//                 <div className="enquiry-form-field">
//                   <label>Email ID</label>
//                   <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} />
//                 </div>

//                 <div className="enquiry-form-field mobile-field">
//                   <label>Mobile No.</label>
//                   <div className="mobile-input">
//                     <div className="country-code">🇮🇳 +</div>
//                     <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} />
//                   </div>
//                 </div>

//                 <div className="enquiry-form-field">
//                   <label>Website</label>
//                   <input type="url" name="website" value={formData.website} onChange={handleInputChange} />
//                 </div>
//               </div>
//             </div>

//             <div className="enquiry-form-section">
//               <h3>B. HR Executive Details</h3>

//               <div className="enquiry-form-row">
//                 <div className="enquiry-form-field">
//                   <label>Placement Fees</label>
//                   <select name="placementFees" value={formData.placementFees} onChange={handleInputChange}>
//                     <option value="">Select</option>
//                     <option value="Fee 1">Fee 1</option>
//                     <option value="Fee 2">Fee 2</option>
//                   </select>
//                 </div>

//                 <div className="enquiry-form-field">
//                   <label>Credit Period</label>
//                   <select name="creditPeriod" value={formData.creditPeriod} onChange={handleInputChange}>
//                     <option value="">Select</option>
//                     <option value="30 days">30 days</option>
//                     <option value="60 days">60 days</option>
//                   </select>
//                 </div>

//                 <div className="enquiry-form-field">
//                   <label>Replacement Period</label>
//                   <select name="replacementPeriod" value={formData.replacementPeriod} onChange={handleInputChange}>
//                     <option value="">Select</option>
//                     <option value="30 days">30 days</option>
//                     <option value="60 days">60 days</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="enquiry-form-field">
//                 <label>Position Name</label>
//                 <input type="text" name="positionname" value={formData.positionname} onChange={handleInputChange} />
//               </div>

//               <div className="enquiry-form-field">
//                 <label>Salary</label>
//                 <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} />
//               </div>

//               <div className="enquiry-form-row">
//                 <div className="enquiry-form-field">
//                   <label>Enquiry Status</label>
//                   <select name="enquiryStatus" value={formData.enquiryStatus} onChange={handleInputChange}>
//                     <option value="">Select</option>
//                     <option value="inprogress">In Progress</option>
//                     <option value="Closed">Closed</option>
//                     <option value="Credit Note">Credit Note</option>
//                     <option value="offered and accepted">Offered and Accepted</option>
//                     <option value="offered and rejected">offered and Rejected</option>
//                     <option value="Revised">Revised</option>
//                     <option value="position hold">Position hold</option>
//                     <option value="internally closed">internally closed</option>
//                   </select>
//                 </div>

//                 <div className="enquiry-form-field">
//                   <label>Client Status</label>
//                   <input type="text" name="clientStatus" value={formData.clientStatus} onChange={handleInputChange} />
//                 </div>

//                 <div className="enquiry-form-field">
//                   <label>Date of Allocation</label>
//                   <input
//                     type="date"
//                     name="dateOfAllocation"
//                     value={formData.dateOfAllocation}
//                     onChange={handleInputChange}
//                     placeholder="DD/MM/YYYY"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="enquiry-form-section">
//               <h3>C. Billing & Relocation</h3>

//               <div className="enquiry-form-row">
//                 <div className="enquiry-form-field">
//                   <label>Date of Reallocation</label>
//                   <input
//                     type="date"
//                     name="dateOfReallocation"
//                     value={formData.dateOfReallocation}
//                     onChange={handleInputChange}
//                     placeholder="DD/MM/YYYY"
//                   />
//                 </div>

//                 <div className="enquiry-form-field">
//                   <label>Name of New Team Leader</label>
//                   <input type="text" name="newTeamLeader" value={formData.newTeamLeader} onChange={handleInputChange} />
//                 </div>
//               </div>

//               <div className="enquiry-form-field">
//                 <label>Name of Franchisee</label>
//                 <input
//                   type="text"
//                   name="nameOfFranchisee"
//                   value={formData.nameOfFranchisee}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>

//             <div className="enquiry-form-actions">
//               <button type="submit" className="save-button">
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {showCandidateForm && (
//         <CandidateForm onClose={() => setShowCandidateForm(false)} onSubmit={handleCandidateSubmit} />
//       )}
//       {showCreditNoteForm && (
//         <CreditNoteForm
//           onClose={() => setShowCreditNoteForm(false)}
//           onSubmit={async (creditNoteData) => {
//             try {
//               const response = await fetch("/api/credit-notes", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   ...creditNoteData,
//                   enquiryId: currentEnquiry?.id,
//                 }),
//               })

//               if (response.ok) {
//                 console.log("Credit note data submitted successfully")
//                 setShowCreditNoteForm(false)
//               } else {
//                 console.error("Failed to submit credit note data")
//               }
//             } catch (error) {
//               console.error("Error submitting credit note data:", error)
//             }
//           }}
//         />
//       )}
//       {showRevisionForm && (
//         <RevisionForm
//           onClose={() => setShowRevisionForm(false)}
//           onSubmit={async (revisionData) => {
//             try {
//               const response = await fetch("/api/revisions", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   ...revisionData,
//                   enquiryId: currentEnquiry?.id,
//                 }),
//               })

//               if (response.ok) {
//                 console.log("Revision data submitted successfully")
//                 setShowRevisionForm(false)
//               } else {
//                 console.error("Failed to submit revision data")
//               }
//             } catch (error) {
//               console.error("Error submitting revision data:", error)
//             }
//           }}
//         />
//       )}
//     </div>
//   )
// }

// export default Enquiry

// //-----new code

// // "use client"

// // import { useState, useEffect } from "react"
// // import CandidateForm from "./candidateform"
// // import CreditNoteForm from "./candidateform2"
// // import RevisionForm from "./candidateform3"
// // import "./enquiry.css"

// // const Enquiry = () => {
// //   // State for enquiry data table
// //   const [enquiryData, setEnquiryData] = useState([])
// //   const [showEnquiryForm, setShowEnquiryForm] = useState(false)
// //   const [showCandidateForm, setShowCandidateForm] = useState(false)
// //   const [currentEnquiry, setCurrentEnquiry] = useState(null)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [sortBy, setSortBy] = useState("")
// //   const [sortOrder, setSortOrder] = useState("asc")
// //   const [showCreditNoteForm, setShowCreditNoteForm] = useState(false)
// //   const [showRevisionForm, setShowRevisionForm] = useState(false)
// //   const [companies, setCompanies] = useState([])
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState(null)

// //   // Form state
// //   const [formData, setFormData] = useState({
// //     companyName: "",
// //     bdMemberName: "",
// //     teamLeaderName: "",
// //     franchiseeName: "",
// //     hrExecutiveName: "",
// //     designation: "",
// //     gstNo: "",
// //     addressLine1: "",
// //     emailId: "",
// //     mobileNo: "",
// //     website: "",
// //     placementFees: "",
// //     positionname: "",
// //     salary: "",
// //     creditPeriod: "",
// //     replacementPeriod: "",
// //     enquiryStatus: "",
// //     clientStatus: "",
// //     dateOfAllocation: "",
// //     dateOfReallocation: "",
// //     newTeamLeader: "",
// //     nameOfFranchisee: "",
// //   })

// //   // Fetch companies for dropdown
// //   useEffect(() => {
// //     const fetchCompanies = async () => {
// //       try {
// //         const response = await fetch("/api/companies")
// //         if (response.ok) {
// //           const data = await response.json()
// //           setCompanies(data)
// //         } else {
// //           console.error("Failed to fetch companies")
// //         }
// //       } catch (error) {
// //         console.error("Error fetching companies:", error)
// //       }
// //     }

// //     fetchCompanies()
// //   }, [])

// //   // Fetch enquiry data
// //   useEffect(() => {
// //     const fetchEnquiryData = async () => {
// //       setLoading(true)
// //       setError(null)
// //       try {
// //         const response = await fetch("/api/enquiries")
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch enquiry data")
// //         }
// //         const data = await response.json()
// //         setEnquiryData(data)
// //       } catch (error) {
// //         console.error("Error fetching enquiry data:", error)
// //         setError("Failed to load enquiry data. Please try again.")
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchEnquiryData()
// //   }, [])

// //   // Fetch company details when company is selected
// //   const fetchCompanyDetails = async (companyId) => {
// //     try {
// //       const response = await fetch(`/api/companies/${companyId}`)
// //       if (response.ok) {
// //         const companyData = await response.json()
// //         // Auto-fill form with company data
// //         setFormData((prevData) => ({
// //           ...prevData,
// //           bdMemberName: companyData.bdMemberName || "",
// //           teamLeaderName: companyData.teamLeaderName || "",
// //           franchiseeName: companyData.franchiseeName || "",
// //           hrExecutiveName: companyData.hrExecutiveName || "",
// //           designation: companyData.designation || "",
// //           gstNo: companyData.gstNo || "",
// //           addressLine1: companyData.addressLine1 || "",
// //           emailId: companyData.emailId || "",
// //           mobileNo: companyData.mobileNo || "",
// //           website: companyData.website || "",
// //         }))
// //       } else {
// //         console.error("Failed to fetch company details")
// //       }
// //     } catch (error) {
// //       console.error("Error fetching company details:", error)
// //     }
// //   }

// //   // Handle form input changes
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     })

// //     // If company name is changed, fetch company details
// //     if (name === "companyName" && value) {
// //       fetchCompanyDetails(value)
// //     }

// //     // Show candidate form when enquiry status is closed
// //     if (name === "enquiryStatus" && value === "Closed") {
// //       setShowCandidateForm(true)
// //     }

// //     // Show credit note form when enquiry status is credit note
// //     if (name === "enquiryStatus" && value === "Credit Note") {
// //       setShowCreditNoteForm(true)
// //     }

// //     // Show revision form when enquiry status is revised
// //     if (name === "enquiryStatus" && value === "Revised") {
// //       setShowRevisionForm(true)
// //     }
// //   }

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setLoading(true)
// //     setError(null)

// //     try {
// //       let response

// //       if (currentEnquiry) {
// //         // Update existing enquiry
// //         response = await fetch(`/api/enquiries/${currentEnquiry.id}`, {
// //           method: "PUT",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(formData),
// //         })

// //         // If status is closed or revised, move to cancellation sheet
// //         if (formData.enquiryStatus === "Closed" || formData.enquiryStatus === "Revised") {
// //           await fetch("/api/cancellations", {
// //             method: "POST",
// //             headers: {
// //               "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({
// //               ...formData,
// //               enquiryId: currentEnquiry.id,
// //               movedDate: new Date().toISOString(),
// //             }),
// //           })
// //         }
// //       } else {
// //         // Add new enquiry
// //         response = await fetch("/api/enquiries", {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(formData),
// //         })
// //       }

// //       if (!response.ok) {
// //         throw new Error("Failed to save enquiry data")
// //       }

// //       // Refresh enquiry data
// //       const updatedEnquiriesResponse = await fetch("/api/enquiries")
// //       if (!updatedEnquiriesResponse.ok) {
// //         throw new Error("Failed to refresh enquiry data")
// //       }

// //       const updatedData = await updatedEnquiriesResponse.json()
// //       setEnquiryData(updatedData)

// //       // Reset form and close it
// //       resetForm()

// //       // Show success message
// //       alert(currentEnquiry ? "Enquiry updated successfully!" : "Enquiry added successfully!")
// //     } catch (error) {
// //       console.error("Error saving enquiry data:", error)
// //       setError("Failed to save enquiry data. Please try again.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Reset form and close it
// //   const resetForm = () => {
// //     setFormData({
// //       companyName: "",
// //       bdMemberName: "",
// //       teamLeaderName: "",
// //       franchiseeName: "",
// //       hrExecutiveName: "",
// //       designation: "",
// //       gstNo: "",
// //       addressLine1: "",
// //       emailId: "",
// //       mobileNo: "",
// //       website: "",
// //       placementFees: "",
// //       positionname: "",
// //       salary: "",
// //       creditPeriod: "",
// //       replacementPeriod: "",
// //       enquiryStatus: "",
// //       clientStatus: "",
// //       dateOfAllocation: "",
// //       dateOfReallocation: "",
// //       newTeamLeader: "",
// //       nameOfFranchisee: "",
// //     })
// //     setCurrentEnquiry(null)
// //     setShowEnquiryForm(false)
// //     setShowCandidateForm(false)
// //     setShowCreditNoteForm(false)
// //     setShowRevisionForm(false)
// //     setError(null)
// //   }

// //   // Handle edit enquiry
// //   const handleEdit = async (enquiry) => {
// //     setLoading(true)
// //     setError(null)
// //     try {
// //       const response = await fetch(`/api/enquiries/${enquiry.id}`)
// //       if (!response.ok) {
// //         throw new Error("Failed to fetch enquiry details")
// //       }

// //       const enquiryData = await response.json()
// //       setCurrentEnquiry(enquiryData)
// //       setFormData(enquiryData)
// //       setShowEnquiryForm(true)
// //     } catch (error) {
// //       console.error("Error fetching enquiry details:", error)
// //       setError("Failed to load enquiry details. Please try again.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Handle delete enquiry
// //   const handleDelete = async (id) => {
// //     if (!confirm("Are you sure you want to delete this enquiry?")) {
// //       return
// //     }

// //     setLoading(true)
// //     setError(null)
// //     try {
// //       const response = await fetch(`/api/enquiries/${id}`, {
// //         method: "DELETE",
// //       })

// //       if (!response.ok) {
// //         throw new Error("Failed to delete enquiry")
// //       }

// //       // Update local state
// //       const updatedData = enquiryData.filter((item) => item.id !== id)
// //       setEnquiryData(updatedData)

// //       alert("Enquiry deleted successfully!")
// //     } catch (error) {
// //       console.error("Error deleting enquiry:", error)
// //       setError("Failed to delete enquiry. Please try again.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Handle search
// //   const handleSearch = (e) => {
// //     setSearchTerm(e.target.value)
// //   }

// //   // Handle sort
// //   const handleSort = (field) => {
// //     if (sortBy === field) {
// //       setSortOrder(sortOrder === "asc" ? "desc" : "asc")
// //     } else {
// //       setSortBy(field)
// //       setSortOrder("asc")
// //     }
// //   }

// //   // Filter and sort data
// //   const filteredData = enquiryData.filter((item) => {
// //     return Object.values(item).some(
// //       (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
// //     )
// //   })

// //   const sortedData = [...filteredData].sort((a, b) => {
// //     if (!sortBy) return 0

// //     const aValue = a[sortBy]
// //     const bValue = b[sortBy]

// //     if (sortOrder === "asc") {
// //       return aValue > bValue ? 1 : -1
// //     } else {
// //       return aValue < bValue ? 1 : -1
// //     }
// //   })

// //   // Export to CSV
// //   const exportToCSV = () => {
// //     if (enquiryData.length === 0) {
// //       alert("No data to export")
// //       return
// //     }

// //     const headers = Object.keys(enquiryData[0] || {}).join(",")
// //     const csvData = enquiryData.map((row) => Object.values(row).join(",")).join("\n")
// //     const csv = `${headers}\n${csvData}`

// //     const blob = new Blob([csv], { type: "text/csv" })
// //     const url = URL.createObjectURL(blob)
// //     const a = document.createElement("a")
// //     a.setAttribute("hidden", "")
// //     a.setAttribute("href", url)
// //     a.setAttribute("download", "enquiry_data.csv")
// //     document.body.appendChild(a)
// //     a.click()
// //     document.body.removeChild(a)
// //   }

// //   // Handle candidate form submission
// //   const handleCandidateSubmit = async (candidateData) => {
// //     setLoading(true)
// //     setError(null)
// //     try {
// //       const response = await fetch("/api/candidates", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           ...candidateData,
// //           enquiryId: currentEnquiry?.id,
// //         }),
// //       })

// //       if (!response.ok) {
// //         throw new Error("Failed to submit candidate data")
// //       }

// //       alert("Candidate data submitted successfully")
// //       setShowCandidateForm(false)
// //     } catch (error) {
// //       console.error("Error submitting candidate data:", error)
// //       setError("Failed to submit candidate data. Please try again.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="enquiry-container">
// //       {loading && <div className="loading-overlay">Loading...</div>}

// //       {error && (
// //         <div className="error-message">
// //           {error}
// //           <button onClick={() => setError(null)}>×</button>
// //         </div>
// //       )}

// //       {!showEnquiryForm ? (
// //         // Enquiry Data Table View
// //         <div className="enquiry-table-container">
// //           <div className="enquiry-header">
// //             <h1>Enquiry Data</h1>
// //             <p>All the enquiry Data are listed here</p>
// //             <div className="enquiry-actions">
// //               <div className="search-sort-wrap">
// //                 <div className="enquiry-search-container">
// //                   <input
// //                     type="text"
// //                     placeholder="Search"
// //                     value={searchTerm}
// //                     onChange={handleSearch}
// //                     className="enquiry-search-input"
// //                   />
// //                   <span className="enquiry-search-icon">🔍</span>
// //                 </div>
// //                 <div className="enquiry-sort-container">
// //                   <select
// //                     className="enquiry-sort-select"
// //                     value={sortBy}
// //                     onChange={(e) => {
// //                       setSortBy(e.target.value)
// //                       setSortOrder("asc")
// //                     }}
// //                   >
// //                     <option value="">Sort by</option>
// //                     <option value="bdMemberName">BD Member</option>
// //                     <option value="enquiryStatus">Enquiry Status</option>
// //                     <option value="franchiseeName">Franchise</option>
// //                     <option value="teamLeaderName">Team Leader</option>
// //                   </select>
// //                 </div>
// //               </div>
// //               <button className="enquiry-add-button" onClick={() => setShowEnquiryForm(true)}>
// //                 + Add Enquiry Data
// //               </button>
// //             </div>
// //           </div>
// //           <div className="wrapper-enq-table">
// //             <div className="enquiry-table-container">
// //               <div className="enquiry-table-header">
// //                 <h2>Enquiry Data</h2>
// //                 <button className="enquiry-download-button" onClick={exportToCSV}>
// //                   <span className="enquiry-download-icon">↓</span>
// //                 </button>
// //               </div>
// //               <div className="enquiry-table-scroll">
// //                 {enquiryData.length === 0 ? (
// //                   <div className="no-data-message">
// //                     {loading ? "Loading data..." : "No enquiry data available. Add your first enquiry!"}
// //                   </div>
// //                 ) : (
// //                   <table className="enquiry-table">
// //                     <thead>
// //                       <tr>
// //                         <th onClick={() => handleSort("companyName")}>COMPANY NAME</th>
// //                         <th onClick={() => handleSort("bdMemberName")}>NAME OF BD MEMBER</th>
// //                         <th onClick={() => handleSort("teamLeaderName")}>NAME OF TEAM LEADER</th>
// //                         <th onClick={() => handleSort("franchiseeName")}>NAME OF FRANCHISE</th>
// //                         <th onClick={() => handleSort("hrExecutiveName")}>NAME OF HR EXECUTIVE</th>
// //                         <th onClick={() => handleSort("designation")}>Designation</th>
// //                         <th onClick={() => handleSort("gstNo")}>GST NO.</th>
// //                         <th onClick={() => handleSort("addressLine1")}>ADDRESS</th>
// //                         <th onClick={() => handleSort("emailId")}>EMAIL ID</th>
// //                         <th onClick={() => handleSort("mobileNo")}>MOBILE NO.</th>
// //                         <th onClick={() => handleSort("website")}>WEBSITE</th>
// //                         <th onClick={() => handleSort("placementFees")}>PLACEMENT FEES</th>
// //                         <th onClick={() => handleSort("positionname")}>POSITION NAME</th>
// //                         <th onClick={() => handleSort("salary")}>SALARY</th>
// //                         <th onClick={() => handleSort("creditPeriod")}>CREDIT PERIOD</th>
// //                         <th onClick={() => handleSort("replacementPeriod")}>REPLACEMENT PERIOD</th>
// //                         <th onClick={() => handleSort("enquiryStatus")}>ENQUIRY STATUS</th>
// //                         <th onClick={() => handleSort("clientStatus")}>CLIENT STATUS</th>
// //                         <th onClick={() => handleSort("dateOfAllocation")}>DATE OF ALLOCATION</th>
// //                         <th onClick={() => handleSort("dateOfReallocation")}>DATE OF REALLOCATION</th>
// //                         <th onClick={() => handleSort("newTeamLeader")}>NEW TEAM LEADER</th>
// //                         <th onClick={() => handleSort("nameOfFranchisee")}>NAME OF FRANCHISEE</th>
// //                         <th>ACTION</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {sortedData.map((item) => (
// //                         <tr key={item.id}>
// //                           <td>{item.companyName}</td>
// //                           <td>{item.bdMemberName}</td>
// //                           <td>{item.teamLeaderName}</td>
// //                           <td>{item.franchiseeName}</td>
// //                           <td>{item.hrExecutiveName}</td>
// //                           <td>{item.designation}</td>
// //                           <td>{item.gstNo}</td>
// //                           <td>{item.addressLine1}</td>
// //                           <td>{item.emailId}</td>
// //                           <td>{item.mobileNo}</td>
// //                           <td>{item.website}</td>
// //                           <td>{item.placementFees}</td>
// //                           <td>{item.positionname}</td>
// //                           <td>{item.salary}</td>
// //                           <td>{item.creditPeriod}</td>
// //                           <td>{item.replacementPeriod}</td>
// //                           <td>{item.enquiryStatus}</td>
// //                           <td>{item.clientStatus}</td>
// //                           <td>{item.dateOfAllocation}</td>
// //                           <td>{item.dateOfReallocation}</td>
// //                           <td>{item.newTeamLeader}</td>
// //                           <td>{item.nameOfFranchisee}</td>
// //                           <td className="enquiry-action-buttons">
// //                             <button className="enquiry-edit-button" onClick={() => handleEdit(item)}>
// //                               <span className="enquiry-edit-icon">✏️</span>
// //                             </button>
// //                             <button className="enquiry-delete-button" onClick={() => handleDelete(item.id)}>
// //                               <span className="enquiry-delete-icon">🗑️</span>
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="add-enquiry-button" onClick={() => setShowEnquiryForm(true)}>
// //               <span className="enquiry-plus-icon">+</span> Click here to add Enquiry Data
// //             </div>
// //           </div>
// //         </div>
// //       ) : (
// //         // Enquiry Form View
// //         <div className="enquiry-form-container">
// //           <div className="enquiry-form-header">
// //             <button className="enquiry-back-button" onClick={resetForm}>
// //               ← Enquiry Data
// //             </button>
// //           </div>

// //           <form onSubmit={handleSubmit}>
// //             <div className="enquiry-form-section">
// //               <h3>A. Company & Contact Details</h3>

// //               <div className="enquiry-form-field">
// //                 <label>Company Name</label>
// //                 <select name="companyName" value={formData.companyName} onChange={handleInputChange}>
// //                   <option value="">Select</option>
// //                   {companies.map((company) => (
// //                     <option key={company.id} value={company.id}>
// //                       {company.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div className="enquiry-form-row">
// //                 <div className="enquiry-form-field">
// //                   <label>Name of BD Members</label>
// //                   <input
// //                     type="text"
// //                     name="bdMemberName"
// //                     value={formData.bdMemberName}
// //                     onChange={handleInputChange}
// //                     placeholder="Enter BD Member Name"
// //                   />
// //                 </div>

// //                 <div className="enquiry-form-field">
// //                   <label>Name of Team Leader</label>
// //                   <input
// //                     type="text"
// //                     name="teamLeaderName"
// //                     value={formData.teamLeaderName}
// //                     onChange={handleInputChange}
// //                     placeholder="Enter Team Leader Name"
// //                   />
// //                 </div>

// //                 <div className="enquiry-form-field">
// //                   <label>Name of Franchisee</label>
// //                   <input
// //                     type="text"
// //                     name="franchiseeName"
// //                     value={formData.franchiseeName}
// //                     onChange={handleInputChange}
// //                     placeholder="Enter Franchisee Name"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="enquiry-form-row">
// //                 <div className="enquiry-form-field">
// //                   <label>Name of HR Executive</label>
// //                   <input
// //                     type="text"
// //                     name="hrExecutiveName"
// //                     value={formData.hrExecutiveName}
// //                     onChange={handleInputChange}
// //                   />
// //                 </div>

// //                 <div className="enquiry-form-field">
// //                   <label>Designation</label>
// //                   <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} />
// //                 </div>

// //                 <div className="enquiry-form-field">
// //                   <label>GST No.</label>
// //                   <input type="text" name="gstNo" value={formData.gstNo} onChange={handleInputChange} />
// //                 </div>
// //               </div>

// //               <div className="enquiry-form-field">
// //                 <label>Address Line 1</label>
// //                 <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} />
// //               </div>

// //               <div className="enquiry-form-row">
// //                 <div className="enquiry-form-field">
// //                   <label>Email ID</label>
// //                   <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} />
// //                 </div>

// //                 <div className="enquiry-form-field mobile-field">
// //                   <label>Mobile No.</label>
// //                   <div className="mobile-input">
// //                     <div className="country-code">🇮🇳 +</div>
// //                     <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} />
// //                   </div>
// //                 </div>

// //                 <div className="enquiry-form-field">
// //                   <label>Website</label>
// //                   <input type="url" name="website" value={formData.website} onChange={handleInputChange} />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="enquiry-form-section">
// //               <h3>B. HR Executive Details</h3>

// //               <div className="enquiry-form-row">
// //                 <div className="enquiry-form-field">
// //                   <label>Placement Fees</label>
// //                   <select name="placementFees" value={formData.placementFees} onChange={handleInputChange}>
// //                     <option value="">Select</option>
// //                     <option value="Fee 1">Fee 1</option>
// //                     <option value="Fee 2">Fee 2</option>
// //                   </select>
// //                 </div>

// //                 <div className="enquiry-form-field">
// //                   <label>Credit Period</label>
// //                   <select name="creditPeriod" value={formData.creditPeriod} onChange={handleInputChange}>
// //                     <option value="">Select</option>
// //                     <option value="30 days">30 days</option>
// //                     <option value="60 days">60 days</option>
// //                   </select>
// //                 </div>

// //                 <div className="enquiry-form-field">
// //                   <label>Replacement Period</label>
// //                   <select name="replacementPeriod" value={formData.replacementPeriod} onChange={handleInputChange}>
// //                     <option value="">Select</option>
// //                     <option value="30 days">30 days</option>
// //                     <option value="60 days">60 days</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               <div className="enquiry-form-field">
// //                 <label>Position Name</label>
// //                 <input type="text" name="positionname" value={formData.positionname} onChange={handleInputChange} />
// //               </div>

// //               <div className="enquiry-form-field">
// //                 <label>Salary</label>
// //                 <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} />
// //               </div>

// //               <div className="enquiry-form-row">
// //                 <div className="enquiry-form-field">
// //                   <label>Enquiry Status</label>
// //                   <select name="enquiryStatus" value={formData.enquiryStatus} onChange={handleInputChange}>
// //                     <option value="">Select</option>
// //                     <option value="inprogress">In Progress</option>
// //                     <option value="Closed">Closed</option>
// //                     <option value="Credit Note">Credit Note</option>
// //                     <option value="offered and accepted">Offered and Accepted</option>
// //                     <option value="offered and rejected">offered and Rejected</option>
// //                     <option value="Revised">Revised</option>
// //                     <option value="position hold">Position hold</option>
// //                     <option value="internally closed">internally closed</option>
// //                   </select>
// //                 </div>

// //                 <div className="enquiry-form-field">
// //                   <label>Client Status</label>
// //                   <input type="text" name="clientStatus" value={formData.clientStatus} onChange={handleInputChange} />
// //                 </div>

// //                 <div className="enquiry-form-field">
// //                   <label>Date of Allocation</label>
// //                   <input
// //                     type="date"
// //                     name="dateOfAllocation"
// //                     value={formData.dateOfAllocation}
// //                     onChange={handleInputChange}
// //                     placeholder="DD/MM/YYYY"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="enquiry-form-section">
// //               <h3>C. Billing & Relocation</h3>

// //               <div className="enquiry-form-row">
// //                 <div className="enquiry-form-field">
// //                   <label>Date of Reallocation</label>
// //                   <input
// //                     type="date"
// //                     name="dateOfReallocation"
// //                     value={formData.dateOfReallocation}
// //                     onChange={handleInputChange}
// //                     placeholder="DD/MM/YYYY"
// //                   />
// //                 </div>

// //                 <div className="enquiry-form-field">
// //                   <label>Name of New Team Leader</label>
// //                   <input type="text" name="newTeamLeader" value={formData.newTeamLeader} onChange={handleInputChange} />
// //                 </div>
// //               </div>

// //               <div className="enquiry-form-field">
// //                 <label>Name of Franchisee</label>
// //                 <input
// //                   type="text"
// //                   name="nameOfFranchisee"
// //                   value={formData.nameOfFranchisee}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //             </div>

// //             <div className="enquiry-form-actions">
// //               <button type="submit" className="save-button" disabled={loading}>
// //                 {loading ? "Saving..." : "Save"}
// //               </button>
// //               <button type="button" className="cancel-button" onClick={resetForm} disabled={loading}>
// //                 Cancel
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       )}

// //       {showCandidateForm && (
// //         <CandidateForm onClose={() => setShowCandidateForm(false)} onSubmit={handleCandidateSubmit} />
// //       )}
// //       {showCreditNoteForm && (
// //         <CreditNoteForm
// //           onClose={() => setShowCreditNoteForm(false)}
// //           onSubmit={async (creditNoteData) => {
// //             setLoading(true)
// //             setError(null)
// //             try {
// //               const response = await fetch("/api/credit-notes", {
// //                 method: "POST",
// //                 headers: {
// //                   "Content-Type": "application/json",
// //                 },
// //                 body: JSON.stringify({
// //                   ...creditNoteData,
// //                   enquiryId: currentEnquiry?.id,
// //                 }),
// //               })

// //               if (!response.ok) {
// //                 throw new Error("Failed to submit credit note data")
// //               }

// //               alert("Credit note data submitted successfully")
// //               setShowCreditNoteForm(false)
// //             } catch (error) {
// //               console.error("Error submitting credit note data:", error)
// //               setError("Failed to submit credit note data. Please try again.")
// //             } finally {
// //               setLoading(false)
// //             }
// //           }}
// //         />
// //       )}
// //       {showRevisionForm && (
// //         <RevisionForm
// //           onClose={() => setShowRevisionForm(false)}
// //           onSubmit={async (revisionData) => {
// //             setLoading(true)
// //             setError(null)
// //             try {
// //               const response = await fetch("/api/revisions", {
// //                 method: "POST",
// //                 headers: {
// //                   "Content-Type": "application/json",
// //                 },
// //                 body: JSON.stringify({
// //                   ...revisionData,
// //                   enquiryId: currentEnquiry?.id,
// //                 }),
// //               })

// //               if (!response.ok) {
// //                 throw new Error("Failed to submit revision data")
// //               }

// //               alert("Revision data submitted successfully")
// //               setShowRevisionForm(false)
// //             } catch (error) {
// //               console.error("Error submitting revision data:", error)
// //               setError("Failed to submit revision data. Please try again.")
// //             } finally {
// //               setLoading(false)
// //             }
// //           }}
// //         />
// //       )}
// //     </div>
// //   )
// // }

// // export default Enquiry





"use client"

import { useState } from "react"
import CandidateForm from "./candidateform"
import CreditNoteForm from "./candidateform2"
// import RevisionForm from "./candidateform3"

// Add this after your imports if the file doesn't exist
const RevisionForm = ({ onClose, onSubmit }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Revision Form</h2>
        <p>This form is under development.</p>
        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
          <button onClick={() => onSubmit({})}>Submit</button>
        </div>
      </div>
    </div>
  )
}
import "./enquiry.css"

const Enquiry = () => {
  // State for enquiry data table
  const [enquiryData, setEnquiryData] = useState([])
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [showCandidateForm, setShowCandidateForm] = useState(false)
  const [currentEnquiry, setCurrentEnquiry] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showCreditNoteForm, setShowCreditNoteForm] = useState(false)
  const [showRevisionForm, setShowRevisionForm] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    bdMemberName: "",
    teamLeaderName: "",
    franchiseeName: "",
    hrExecutiveName: "",
    designation: "",
    gstNo: "",
    addressLine1: "",
    emailId: "",
    mobileNo: "",
    website: "",
    placementFees: "",
    positionname: "",
    salary: "",
    creditPeriod: "",
    replacementPeriod: "",
    enquiryStatus: "",
    clientStatus: "",
    dateOfAllocation: "",

    dateOfReallocation: "",
    newTeamLeader: "",
    nameOfFranchisee: "",
  })

  // // Mock data for initial load
  // useEffect(() => {
  //   const mockData = Array(5)
  //     .fill()
  //     .map((_, index) => ({
  //       id: index + 1,
  //       companyName: "XXX",
  //       bdMemberName: "XXX",
  //       teamLeaderName: "XXX",
  //       franchiseeName: "XXX",
  //       hrExecutiveName: "XXX",
  //       // Add other fields with default values
  //     }))
  //   setEnquiryData(mockData)
  // }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Show candidate form when enquiry status is closed
    if (name === "enquiryStatus" && value === "Closed") {
      setShowCandidateForm(true)
    }

    // Show credit note form when enquiry status is credit note
    if (name === "enquiryStatus" && value === "Credit Note") {
      setShowCreditNoteForm(true)
    }

    // Show revision form when enquiry status is revised
    if (name === "enquiryStatus" && value === "Revised") {
      setShowRevisionForm(true)
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentEnquiry) {
      // Update existing enquiry
      const updatedData = enquiryData.map((item) =>
        item.id === currentEnquiry.id ? { ...formData, id: item.id } : item,
      )
      setEnquiryData(updatedData)
    } else {
      // Add new enquiry
      const newEnquiry = {
        ...formData,
        id: enquiryData.length + 1,
      }
      setEnquiryData([...enquiryData, newEnquiry])
    }

    // Reset form and close it
    resetForm()
  }

  // Reset form and close it
  const resetForm = () => {
    setFormData({
      companyName: "",
      bdMemberName: "",
      teamLeaderName: "",
      franchiseeName: "",
      hrExecutiveName: "",
      designation: "",
      gstNo: "",
      addressLine1: "",
      emailId: "",
      mobileNo: "",
      website: "",
      placementFees: "",
      positionname: "",
      salary: "",
      creditPeriod: "",
      replacementPeriod: "",
      enquiryStatus: "",
      clientStatus: "",
      dateOfAllocation: "",

      dateOfReallocation: "",
      newTeamLeader: "",
      nameOfFranchisee: "",
    })
    setCurrentEnquiry(null)
    setShowEnquiryForm(false)
    setShowCandidateForm(false)
    setShowCreditNoteForm(false)
    setShowRevisionForm(false)
  }

  // Handle edit enquiry
  const handleEdit = (enquiry) => {
    setCurrentEnquiry(enquiry)
    setFormData(enquiry)
    setShowEnquiryForm(true)
  }

  // Handle delete enquiry
  const handleDelete = (id) => {
    const updatedData = enquiryData.filter((item) => item.id !== id)
    setEnquiryData(updatedData)
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Handle sort
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  // Filter and sort data
  const filteredData = enquiryData.filter((item) => {
    return Object.values(item).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
  })

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortBy) return 0

    const aValue = a[sortBy]
    const bValue = b[sortBy]

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Export to CSV
  const exportToCSV = () => {
    const headers = Object.keys(enquiryData[0] || {}).join(",")
    const csvData = enquiryData.map((row) => Object.values(row).join(",")).join("\n")
    const csv = `${headers}\n${csvData}`

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("hidden", "")
    a.setAttribute("href", url)
    a.setAttribute("download", "enquiry_data.csv")
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // Handle candidate form submission
  const handleCandidateSubmit = (candidateData) => {
    // In a real app, you would save this data to your database
    console.log("Candidate data submitted:", candidateData)
    setShowCandidateForm(false)
  }

  return (
    <div className="enquiry-container">
      {!showEnquiryForm ? (
        // Enquiry Data Table View
        <div className="enquiry-table-container">
          <div className="enquiry-header">
            <h1>Enquiry Data</h1>
            <p>All the enquiry Data are listed here</p>
            <div className="enquiry-actions">
              <div className="search-sort-wrap">
                <div className="enquiry-search-container">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="enquiry-search-input"
                  />
                  <span className="enquiry-search-icon">🔍</span>
                </div>
                <div className="enquiry-sort-container">
                  <select
                    className="enquiry-sort-select"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value)
                      setSortOrder("asc")
                    }}
                  >
                    <option value="">Sort by</option>
                    <option value="bdMemberName">BD Member</option>
                    <option value="enquiryStatus">Enquiry Status</option>
                    <option value="franchiseeName">Franchise</option>
                    <option value="teamLeaderName">Team Leader</option>
                  </select>
                  {/* <button
                  className="enquiry-sort-order-button"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button> */}
                </div>
              </div>
              <button className="enquiry-add-button" onClick={() => setShowEnquiryForm(true)}>
                + Add Enquiry Data
              </button>
            </div>
          </div>
          <div className="wrapper-enq-table">
            <div className="enquiry-table-container">
              <div className="enquiry-table-header">
                <h2>Enquiry Data</h2>
                <button className="enquiry-download-button" onClick={exportToCSV}>
                  <span className="enquiry-download-icon">↓</span>
                </button>
              </div>
              <div className="enquiry-table-scroll" style={{ overflowX: "auto" }}>
                <table className="enquiry-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort("companyName")}>COMPANY NAME</th>
                      <th onClick={() => handleSort("bdMemberName")}>NAME OF BD MEMBER</th>
                      <th onClick={() => handleSort("teamLeaderName")}>NAME OF TEAM LEADER</th>
                      <th onClick={() => handleSort("franchiseeName")}>NAME OF FRANCHISE</th>
                      <th onClick={() => handleSort("hrExecutiveName")}>NAME OF HR EXECUTIVE</th>
                      <th onClick={() => handleSort("designation")}>DESIGNATION</th>
                      <th onClick={() => handleSort("gstNo")}>GST NO.</th>
                      <th onClick={() => handleSort("addressLine1")}>ADDRESS</th>
                      <th onClick={() => handleSort("emailId")}>EMAIL ID</th>
                      <th onClick={() => handleSort("mobileNo")}>MOBILE NO.</th>
                      <th onClick={() => handleSort("website")}>WEBSITE</th>
                      <th onClick={() => handleSort("placementFees")}>PLACEMENT FEES</th>
                      <th onClick={() => handleSort("positionname")}>POSITION NAME</th>
                      <th onClick={() => handleSort("salary")}>SALARY</th>
                      <th onClick={() => handleSort("creditPeriod")}>CREDIT PERIOD</th>
                      <th onClick={() => handleSort("replacementPeriod")}>REPLACEMENT PERIOD</th>
                      <th onClick={() => handleSort("enquiryStatus")}>ENQUIRY STATUS</th>
                      <th onClick={() => handleSort("clientStatus")}>CLIENT STATUS</th>
                      <th onClick={() => handleSort("dateOfAllocation")}>DATE OF ALLOCATION</th>
                      <th onClick={() => handleSort("dateOfReallocation")}>DATE OF REALLOCATION</th>
                      <th onClick={() => handleSort("newTeamLeader")}>NEW TEAM LEADER</th>
                      <th onClick={() => handleSort("nameOfFranchisee")}>NAME OF FRANCHISEE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.companyName}</td>
                        <td>{item.bdMemberName}</td>
                        <td>{item.teamLeaderName}</td>
                        <td>{item.franchiseeName}</td>
                        <td>{item.hrExecutiveName}</td>
                        <td>{item.designation}</td>
                        <td>{item.gstNo}</td>
                        <td>{item.addressLine1}</td>
                        <td>{item.emailId}</td>
                        <td>{item.mobileNo}</td>
                        <td>{item.website}</td>
                        <td>{item.placementFees}</td>
                        <td>{item.positionname}</td>
                        <td>{item.salary}</td>
                        <td>{item.creditPeriod}</td>
                        <td>{item.replacementPeriod}</td>
                        <td>{item.enquiryStatus}</td>
                        <td>{item.clientStatus}</td>
                        <td>{item.dateOfAllocation}</td>
                        <td>{item.dateOfReallocation}</td>
                        <td>{item.newTeamLeader}</td>
                        <td>{item.nameOfFranchisee}</td>
                        <td className="enquiry-action-buttons">
                          <button className="enquiry-edit-button" onClick={() => handleEdit(item)}>
                            <span className="enquiry-edit-icon">✏️</span>
                          </button>
                          <button className="enquiry-delete-button" onClick={() => handleDelete(item.id)}>
                            <span className="enquiry-delete-icon">🗑️</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="add-enquiry-button" onClick={() => setShowEnquiryForm(true)}>
              <span className="enquiry-plus-icon">+</span> Click here to add Client Data
            </div>
          </div>
        </div>
      ) : (
        // Enquiry Form View
        <div className="enquiry-form-container">
          <div className="enquiry-form-header">
            <button className="enquiry-back-button" onClick={resetForm}>
              ← Enquiry Data
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="enquiry-form-section">
              <h3>A. Company & Contact Details</h3>

              <div className="enquiry-form-field">
                <label>Company Name</label>
                <select name="companyName" value={formData.companyName} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="Company A">Company A</option>
                  <option value="Company B">Company B</option>
                  <option value="Company C">Company C</option>
                </select>
              </div>

              <div className="enquiry-form-row">
                <div className="form-field">
                  <label>Name of BD Members</label>
                  <select name="bdMemberName" value={formData.bdMemberName} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="Member 1">Member 1</option>
                    <option value="Member 2">Member 2</option>
                  </select>
                </div>

                <div className="enquiry-form-field">
                  <label>Name of Team Leader</label>
                  <select name="teamLeaderName" value={formData.teamLeaderName} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="Leader 1">Leader 1</option>
                    <option value="Leader 2">Leader 2</option>
                  </select>
                </div>

                <div className="enquiry-form-field">
                  <label>Name of Franchisee</label>
                  <select name="franchiseeName" value={formData.franchiseeName} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="Franchise 1">Franchise 1</option>
                    <option value="Franchise 2">Franchise 2</option>
                  </select>
                </div>
              </div>

              <div className="enquiry-form-row">
                <div className="enquiry-form-field">
                  <label>Name of HR Executive</label>
                  <input
                    type="text"
                    name="hrExecutiveName"
                    value={formData.hrExecutiveName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="enquiry-form-field">
                  <label>Designation</label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} />
                </div>

                <div className="enquiry-form-field">
                  <label>GST No.</label>
                  <input type="text" name="gstNo" value={formData.gstNo} onChange={handleInputChange} />
                </div>
              </div>

              <div className="enquiry-form-field">
                <label>Address Line 1</label>
                <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} />
              </div>

              <div className="enquiry-form-row">
                <div className="enquiry-form-field">
                  <label>Email ID</label>
                  <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} />
                </div>

                <div className="enquiry-form-field mobile-field">
                  <label>Mobile No.</label>
                  <div className="mobile-input">
                    <div className="country-code">🇮🇳 +</div>
                    <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="enquiry-form-field">
                  <label>Website</label>
                  <input type="url" name="website" value={formData.website} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="enquiry-form-section">
              <h3>B. HR Executive Details</h3>

              <div className="enquiry-form-row">
                <div className="enquiry-form-field">
                  <label>Placement Fees</label>
                  <select name="placementFees" value={formData.placementFees} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="Fee 1">Fee 1</option>
                    <option value="Fee 2">Fee 2</option>
                  </select>
                </div>

                <div className="enquiry-form-field">
                  <label>Credit Period</label>
                  <select name="creditPeriod" value={formData.creditPeriod} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="30 days">30 days</option>
                    <option value="60 days">60 days</option>
                  </select>
                </div>

                <div className="enquiry-form-field">
                  <label>Replacement Period</label>
                  <select name="replacementPeriod" value={formData.replacementPeriod} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="30 days">30 days</option>
                    <option value="60 days">60 days</option>
                  </select>
                </div>
              </div>

              <div className="enquiry-form-field">
                <label>Position Name</label>
                <input type="text" name="positionname" value={formData.positionname} onChange={handleInputChange} />
              </div>

              <div className="enquiry-form-field">
                <label>Salary</label>
                <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} />
              </div>

              <div className="enquiry-form-row">
                <div className="enquiry-form-field">
                  <label>Enquiry Status</label>
                  <select name="enquiryStatus" value={formData.enquiryStatus} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="inprogress">In Progress</option>
                    <option value="Closed">Closed</option>
                    <option value="Credit Note">Credit Note</option>
                    <option value="offered and accepted">Offered and Accepted</option>
                    <option value="offered and rejected">offered and Rejected</option>
                    <option value="Revised">Revised</option>
                    <option value="position hold">Position hold</option>
                    <option value="internally closed">internally closed</option>
                  </select>
                </div>

                <div className="enquiry-form-field">
                  <label>Client Status</label>
                  <input type="text" name="clientStatus" value={formData.clientStatus} onChange={handleInputChange} />
                </div>

                <div className="enquiry-form-field">
                  <label>Date of Allocation</label>
                  <input
                    type="date"
                    name="dateOfAllocation"
                    value={formData.dateOfAllocation}
                    onChange={handleInputChange}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              </div>
            </div>

            <div className="enquiry-form-section">
              <h3>C. Billing & Relocation</h3>

              <div className="enquiry-form-row">
                <div className="enquiry-form-field">
                  <label>Date of Reallocation</label>
                  <input
                    type="date"
                    name="dateOfReallocation"
                    value={formData.dateOfReallocation}
                    onChange={handleInputChange}
                    placeholder="DD/MM/YYYY"
                  />
                </div>

                <div className="enquiry-form-field">
                  <label>Name of New Team Leader</label>
                  <input type="text" name="newTeamLeader" value={formData.newTeamLeader} onChange={handleInputChange} />
                </div>
              </div>

              <div className="enquiry-form-field">
                <label>Name of Franchisee</label>
                <input
                  type="text"
                  name="nameOfFranchisee"
                  value={formData.nameOfFranchisee}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="enquiry-form-actions">
              <button type="submit" className="save-button">
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {showCandidateForm && (
        <CandidateForm onClose={() => setShowCandidateForm(false)} onSubmit={handleCandidateSubmit} />
      )}
      {showCreditNoteForm && (
        <CreditNoteForm
          onClose={() => setShowCreditNoteForm(false)}
          onSubmit={(creditNoteData) => {
            console.log("Credit note data submitted:", creditNoteData)
            setShowCreditNoteForm(false)
            // Here you would typically save the data and update the cancellation sheet
          }}
        />
      )}
      {showRevisionForm && (
        <RevisionForm
          onClose={() => setShowRevisionForm(false)}
          onSubmit={(revisionData) => {
            console.log("Revision data submitted:", revisionData)
            setShowRevisionForm(false)
            // Here you would typically save the data and update the relevant sheet
          }}
        />
      )}
    </div>
  )
}

export default Enquiry

