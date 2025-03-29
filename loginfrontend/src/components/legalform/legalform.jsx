"use client"

import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FaCalendarAlt, FaChevronLeft } from "react-icons/fa"
import { FiSearch, FiDownload, FiEdit2, FiTrash2 } from "react-icons/fi"
import { AiOutlinePlus } from "react-icons/ai"
import "./legal.css"

const LegalForm=()=> {
  const [legalData, setLegalData] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [editingData, setEditingData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    // Company Details
    companyName: "",
    companyConstitution: "",
    website: "",
    hrExecutiveName: "",
    designation: "",
    gender: "",
    addressLine1: "",
    city: "",
    state: "",
    pinCode: "",
    emailId: "",
    phoneNumber: "",

    // GST Details
    gstNo: "",
    gstDataStatus: "",
    panNo: "",
    directorsName: "",
    dinNo: "",

    // Placement & Contract Details
    placementFees: "",
    creditPeriod: "",
    replacementPeriod: "",
    contractSent: "",
    contractDate: "",
    contractReceived: "",
    contractNumber: "",

    // Client Details
    dateOfClientAcquired: "",
    clientStatus: "",

    // Legal & Management Team
    teamLeader: "",
    franchiseName: "",
    nameOfLegalExecutive: "",
  })

  const [errors, setErrors] = useState({})

  // Financial Years
  const financialYears = ["FY 2022-23", "FY 2023-24", "FY 2024-25"]

  // Months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Initialize form with data if editing
  useEffect(() => {
    if (editingData) {
      // Convert date strings to Date objects if they exist
      const processedData = { ...editingData }

      if (editingData.contractDate && typeof editingData.contractDate === "string") {
        // Handle different date formats (ISO or yyyy-mm-dd)
        processedData.contractDate = new Date(editingData.contractDate)
      }

      if (editingData.dateOfClientAcquired && typeof editingData.dateOfClientAcquired === "string") {
        processedData.dateOfClientAcquired = new Date(editingData.dateOfClientAcquired)
      }

      setFormData(processedData)
    }
  }, [editingData])

  // Validation Functions
  const validateName = (name) => {
    if (!name) return true
    return /^[A-Z][a-z]*( [A-Z][a-z]*)*$/.test(name)
  }

  const validateEmail = (email) => {
    if (!email) return true
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/.test(email)
  }

  const validatePhoneNumber = (phone) => {
    if (!phone) return true
    return /^[0-9]{10}$/.test(phone)
  }

  const validatePinCode = (pin) => {
    if (!pin) return true
    return /^[0-9]{6}$/.test(pin)
  }

  const validateGST = (gst) => {
    if (!gst) return true
    return /^[0-9A-Z]{15}$/.test(gst)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Validate fields on change
    validateField(name, value)
  }

  const validateField = (name, value) => {
    const newErrors = { ...errors }

    if (name === "hrExecutiveName" || name === "directorsName") {
      newErrors[name] = validateName(value) ? "" : "First letter must be capital"
    } else if (name === "emailId") {
      newErrors[name] = validateEmail(value) ? "" : "Invalid email format (must contain @ and .com)"
    } else if (name === "phoneNumber") {
      newErrors[name] = validatePhoneNumber(value) ? "" : "Phone number must be 10 digits"
    } else if (name === "pinCode") {
      newErrors[name] = validatePinCode(value) ? "" : "Pin code must be 6 digits"
    } else if (name === "gstNo") {
      newErrors[name] = validateGST(value) ? "" : "GST number must be 15 characters"
    }

    setErrors(newErrors)
  }

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date })
  }

  const handleVerifyGST = () => {
    // Implement GST verification logic here
    alert("GST verification initiated")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate all fields before submission
    let isValid = true
    const newErrors = {}

    if (formData.hrExecutiveName && !validateName(formData.hrExecutiveName)) {
      newErrors.hrExecutiveName = "First letter must be capital"
      isValid = false
    }

    if (formData.directorsName && !validateName(formData.directorsName)) {
      newErrors.directorsName = "First letter must be capital"
      isValid = false
    }

    if (formData.emailId && !validateEmail(formData.emailId)) {
      newErrors.emailId = "Invalid email format"
      isValid = false
    }

    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits"
      isValid = false
    }

    if (formData.pinCode && !validatePinCode(formData.pinCode)) {
      newErrors.pinCode = "Pin code must be 6 digits"
      isValid = false
    }

    if (formData.gstNo && !validateGST(formData.gstNo)) {
      newErrors.gstNo = "GST number must be 15 characters"
      isValid = false
    }

    setErrors(newErrors)

    if (isValid) {
      // Mock save functionality
      console.log("Form data saved:", formData)
      alert("Form data saved successfully!")

      // Reset form or close modal as needed
      if (editingData) {
        setEditingData(null)
      }
      setShowForm(false)
    }
  }

  const handleEditData = (data) => {
    setEditingData(data)
    setShowForm(true)
  }

  const handleDeleteData = (id) => {
    if (confirm("Are you sure you want to delete this record?")) {
      // Mock delete functionality
      console.log("Deleting record with ID:", id)
      setLegalData(legalData.filter((item) => item.id !== id))
    }
  }

  const downloadCSV = () => {
    if (legalData.length === 0) {
      alert("No data to download")
      return
    }

    // Get all keys from the first data object
    const headers = Object.keys(legalData[0]).filter((key) => key !== "id")

    // Create CSV header row
    let csvContent = headers.join(",") + "\n"

    // Add data rows
    legalData.forEach((data) => {
      const row = headers
        .map((header) => {
          // Format dates for CSV
          if (header === "contractDate" || header === "dateOfClientAcquired") {
            const date = data[header] ? new Date(data[header]) : null
            return date ? `"${date.toLocaleDateString("en-GB")}"` : '""'
          }

          // Handle values that might contain commas by wrapping in quotes
          const value = data[header] || ""
          return `"${value.toString().replace(/"/g, '""')}"`
        })
        .join(",")
      csvContent += row + "\n"
    })

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `legal_data_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "—"
    const d = new Date(date)
    return d instanceof Date && !isNaN(d) ? d.toLocaleDateString("en-GB") : "—" // DD/MM/YYYY format
  }

  // Filter data based on search term
  const filteredData = legalData.filter((data) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      (data.companyName && data.companyName.toLowerCase().includes(searchLower)) ||
      (data.hrExecutiveName && data.hrExecutiveName.toLowerCase().includes(searchLower)) ||
      (data.emailId && data.emailId.toLowerCase().includes(searchLower))
    )
  })

  const openForm = () => {
    setEditingData(null)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingData(null)
  }

  // For demo purposes, initialize with sample data
  useEffect(() => {
    setLegalData([
      {
        id: 1,
        companyName: "Sample Company",
        companyConstitution: "Private Limited Company",
        website: "www.example.com",
        hrExecutiveName: "John Doe",
        designation: "HR Manager",
        gender: "Male",
        addressLine1: "123 Main St",
        city: "Mumbai",
        state: "Maharashtra",
        pinCode: "400001",
        emailId: "john@example.com",
        phoneNumber: "9876543210",
        gstNo: "27AADCB2230M1ZT",
        gstDataStatus: "active",
        panNo: "AADCB2230M",
        directorsName: "Jane Smith",
        dinNo: "12345678",
        placementFees: "8.33",
        creditPeriod: "30",
        replacementPeriod: "60",
        contractSent: "Yes",
        contractDate: new Date("2023-01-15"),
        contractReceived: "Yes",
        contractNumber: "CONT-2023-001",
        dateOfClientAcquired: new Date("2022-12-01"),
        clientStatus: "Active",
        teamLeader: "Team Leader 1",
        franchiseName: "Franchise 1",
        nameOfLegalExecutive: "Deepti Singh",
      },
    ])
  }, [])

  return (
    <div className="legal-wrapper">
    <div className="legal-form-container">
      <div className="legal-form-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <div>
            <h1 className="header-title">Legal Data</h1>
            <p className="header-subtitle">All the Legal data are listed here</p>
          </div>
          <button className="add-button" onClick={openForm}>
            <AiOutlinePlus /> Add Data
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="search-icon" />
        </div>

        {/* Year & Month Filters Below Search */}
        <div className="filters-container">
          {/* Financial Year Dropdown */}
          <select className="filter-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">Select Year</option>
            {financialYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Month Dropdown */}
          <select className="filter-select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Loading Indicator */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        )}

        {/* Legal Data Table or Add Legal Section */}
        {!loading && !showForm ? (
          legalData.length === 0 ? (
            <div className="empty-state" onClick={openForm}>
              <AiOutlinePlus className="empty-state-icon" />
              <p>Click here to add Legal Data</p>
            </div>
          ) : (
            <div className="data-table-container">
              <div className="table-header">
                <h2>Legal Data</h2>
                <button className="download-button" onClick={downloadCSV}>
                  <FiDownload />
                </button>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Company Constitution</th>
                      <th>Website</th>
                      <th>Name of HR Executive</th>
                      <th>Designation</th>
                      <th>Gender</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Pin Code</th>
                      <th>Email ID</th>
                      <th>Phone Number</th>
                      <th>GST No.</th>
                      <th>GST Data Status</th>
                      <th>PAN No.</th>
                      <th>Director's Name</th>
                      <th>DIN No.</th>
                      <th>Placement Fees</th>
                      <th>Credit Period</th>
                      <th>Replacement Period</th>
                      <th>Contract Sent</th>
                      <th>Contract Date</th>
                      <th>Contract Received</th>
                      <th>Contract Number</th>
                      <th>Date of Client Acquired</th>
                      <th>Client Status</th>
                      <th>Team Leader</th>
                      <th>Franchise Name</th>
                      <th>Name of Legal Executive</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data) => (
                      <tr key={data.id}>
                        <td>{data.companyName || "—"}</td>
                        <td>{data.companyConstitution || "—"}</td>
                        <td>{data.website || "—"}</td>
                        <td>{data.hrExecutiveName || "—"}</td>
                        <td>{data.designation || "—"}</td>
                        <td>{data.gender || "—"}</td>
                        <td>{data.addressLine1 || "—"}</td>
                        <td>{data.city || "—"}</td>
                        <td>{data.state || "—"}</td>
                        <td>{data.pinCode || "—"}</td>
                        <td>{data.emailId || "—"}</td>
                        <td>{data.phoneNumber || "—"}</td>
                        <td>{data.gstNo || "—"}</td>
                        <td>{data.gstDataStatus || "—"}</td>
                        <td>{data.panNo || "—"}</td>
                        <td>{data.directorsName || "—"}</td>
                        <td>{data.dinNo || "—"}</td>
                        <td>{data.placementFees || "—"}</td>
                        <td>{data.creditPeriod || "—"}</td>
                        <td>{data.replacementPeriod || "—"}</td>
                        <td>{data.contractSent || "—"}</td>
                        <td>{formatDate(data.contractDate)}</td>
                        <td>{data.contractReceived || "—"}</td>
                        <td>{data.contractNumber || "—"}</td>
                        <td>{formatDate(data.dateOfClientAcquired)}</td>
                        <td>{data.clientStatus || "—"}</td>
                        <td>{data.teamLeader || "—"}</td>
                        <td>{data.franchiseName || "—"}</td>
                        <td>{data.nameOfLegalExecutive || "—"}</td>
                        <td className="action-buttons">
                          <button className="edit-button" onClick={() => handleEditData(data)}>
                            <FiEdit2 />
                          </button>
                          <button className="delete-button" onClick={() => handleDeleteData(data.id)}>
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Client Data button at the bottom of the table */}
              <div className="add-data-button" onClick={openForm}>
                <AiOutlinePlus />
                <span>Click here to add Legal Data</span>
              </div>
            </div>
          )
        ) : (
          showForm && (
            <div className="modal-overlay">
              <div className="modal-container">
                <form onSubmit={handleSubmit}>
                  <div className="form-container">
                    {/* Header */}
                    <div className="form-header">
                      <div className="form-title-container">
                        <button type="button" onClick={closeForm} className="back-button">
                          <FaChevronLeft />
                        </button>
                        <h1 className="form-title">Legal Data</h1>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="form-content">
                      {/* Company Details */}
                      <div className="form-section">
                        <h2 className="section-title">A. Company Details</h2>
                        <div className="form-grid">
                          <div className="form-group">
                            <label htmlFor="companyName">Company Name</label>
                            <select
                              id="companyName"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value="">Select</option>
                              <option value="company1">Company 1</option>
                              <option value="company2">Company 2</option>
                            </select>
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label htmlFor="companyConstitution">Company Constitution</label>
                              <select
                                id="companyConstitution"
                                name="companyConstitution"
                                value={formData.companyConstitution}
                                onChange={handleChange}
                                className="form-select"
                              >
                                <option>Select</option>
                                <option>Partnership</option>
                                <option>Public Limited Company</option>
                                <option>Proprietorship</option>
                                <option>Limited Liability Partnership</option>
                                <option>Private Limited Company</option>
                                <option>Central Government - Autonomous Institution</option>
                                <option>Trust</option>
                                <option>Company Limited By Guarantee</option>
                                <option>One Person Company</option>
                                <option>Hindu Undivided Family</option>
                                <option>Company Limited By Shares</option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label htmlFor="website">Website</label>
                              <input
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="form-input"
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="hrExecutiveName">Name of HR Executive</label>
                            <input
                              id="hrExecutiveName"
                              name="hrExecutiveName"
                              value={formData.hrExecutiveName}
                              onChange={handleChange}
                              className="form-input"
                            />
                            {errors.hrExecutiveName && <p className="error-text">{errors.hrExecutiveName}</p>}
                          </div>

                          <div className="form-group">
                            <label htmlFor="designation">Designation</label>
                            <input
                              id="designation"
                              name="designation"
                              value={formData.designation}
                              onChange={handleChange}
                              className="form-input"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option>Select</option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="addressLine1">Address line 1</label>
                            <input
                              id="addressLine1"
                              name="addressLine1"
                              value={formData.addressLine1}
                              onChange={handleChange}
                              className="form-input"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="city">City</label>
                            <select
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option>Select</option>
                              <option>Ahmedabad</option>
                              <option>Bengaluru</option>
                              <option>Chennai</option>
                              <option>Delhi</option>
                              <option>Gurugram</option>
                              <option>Hyderabad</option>
                              <option>Indore</option>
                              <option>Kolkata</option>
                              <option>Mumbai</option>
                              <option>Navi Mumbai</option>
                              <option>New Delhi</option>
                              <option>Noida</option>
                              <option>Others</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="state">State</label>
                            <select
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value="">Select</option>
                              <option>Andhra Pradesh</option>
                              <option>Arunachal Pradesh</option>
                              <option>Bihar</option>
                              <option>Chattisgarh</option>
                              <option>Delhi NCT</option>
                              <option>Goa</option>
                              <option>Gujarat</option>
                              <option>Haryana</option>
                              <option>Himachal Pradesh</option>
                              <option>Jammu and Kashmir</option>
                              <option>Jharkhand</option>
                              <option>Karnataka</option>
                              <option>Kerala</option>
                              <option>Ladakh</option>
                              <option>Madhya Pradesh</option>
                              <option>Maharashtra</option>
                              <option>Manipur</option>
                              <option>Meghalaya</option>
                              <option>Mizoram</option>
                              <option>Nagaland</option>
                              <option>Odisha</option>
                              <option>Puducherry</option>
                              <option>Punjab</option>
                              <option>Rajasthan</option>
                              <option>Sikkim</option>
                              <option>Tamil Nadu</option>
                              <option>Telangana</option>
                              <option>Tripura</option>
                              <option>Uttar Pradesh</option>
                              <option>Uttarakhand</option>
                              <option>West Bengal</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="pinCode">Pin Code</label>
                            <input
                              id="pinCode"
                              name="pinCode"
                              value={formData.pinCode}
                              onChange={handleChange}
                              className="form-input"
                            />
                            {errors.pinCode && <p className="error-text">{errors.pinCode}</p>}
                          </div>

                          <div className="form-group">
                            <label htmlFor="emailId">Email ID</label>
                            <input
                              id="emailId"
                              name="emailId"
                              type="email"
                              value={formData.emailId}
                              onChange={handleChange}
                              className="form-input"
                            />
                            {errors.emailId && <p className="error-text">{errors.emailId}</p>}
                          </div>

                          <div className="form-group">
                            <label htmlFor="phoneNumber">Phone number</label>
                            <div className="phone-input-container">
                              <div className="country-code">
                                <span className="flag-container">
                                  <img
                                    src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                                    alt="India"
                                    className="flag-icon"
                                  />
                                </span>
                              </div>
                              <input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="phone-input"
                              />
                            </div>
                            {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
                          </div>
                          {/* GST Details */}
                          <div className="form-group">
                            <label htmlFor="gstDataStatus">GST Data Status</label>
                            <select
                              id="gstDataStatus"
                              name="gstDataStatus"
                              value={formData.gstDataStatus}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value="">Select</option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="unknown">Unknown</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <div className="label-with-action">
                              <label htmlFor="gstNo">GST No.</label>
                              <button type="button" className="verify-button" onClick={handleVerifyGST}>
                                Verify
                              </button>
                            </div>
                            <input
                              id="gstNo"
                              name="gstNo"
                              value={formData.gstNo}
                              onChange={handleChange}
                              className="form-input"
                            />
                            {errors.gstNo && <p className="error-text">{errors.gstNo}</p>}
                          </div>

                          {formData.gstDataStatus === "active" && (
                            <div className="form-group">
                              <label htmlFor="panNo">Pan No.</label>
                              <input
                                id="panNo"
                                name="panNo"
                                value={formData.panNo}
                                onChange={handleChange}
                                className="form-input"
                              />
                            </div>
                          )}

                          <div className="form-group">
                            <label htmlFor="directorsName">Director's Name</label>
                            <input
                              id="directorsName"
                              name="directorsName"
                              value={formData.directorsName}
                              onChange={handleChange}
                              className="form-input"
                            />
                            {errors.directorsName && <p className="error-text">{errors.directorsName}</p>}
                          </div>

                          <div className="form-group">
                            <label htmlFor="dinNo">DIN No.</label>
                            <input
                              id="dinNo"
                              name="dinNo"
                              value={formData.dinNo}
                              onChange={handleChange}
                              className="form-input"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Placement & Contract Details */}
                      <div className="form-section">
                        <h2 className="section-title">B. Placement & Contract Details</h2>
                        <div className="form-grid">
                          <div className="form-group">
                            <label htmlFor="placementFees">Placement Fees</label>
                            <select
                              id="placementFees"
                              name="placementFees"
                              value={formData.placementFees}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value="">Select</option>
                              <option>7</option>
                              <option>7.5</option>
                              <option>8</option>
                              <option>8.33</option>
                              <option>9</option>
                              <option>10</option>
                              <option>12.50</option>
                              <option>13</option>
                              <option>16</option>
                              <option>18</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="creditPeriod">Credit Period</label>
                            <select
                              id="creditPeriod"
                              name="creditPeriod"
                              value={formData.creditPeriod}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value="">Select</option>
                              <option>30</option>
                              <option>45</option>
                              <option>60</option>
                              <option>90</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="replacementPeriod">Replacement Period</label>
                            <select
                              id="replacementPeriod"
                              name="replacementPeriod"
                              value={formData.replacementPeriod}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value="">Select</option>
                              <option>30</option>
                              <option>45</option>
                              <option>60</option>
                              <option>90</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="contractSent">Contract Sent</label>
                            <select
                              id="contractSent"
                              name="contractSent"
                              value={formData.contractSent}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option>Select</option>
                              <option>Yes</option>
                              <option>No</option>
                              <option>Not Hiring</option>
                              <option>Post Closure</option>
                              <option>Not responding</option>
                              <option>Mailed/Whatsapp them for details</option>
                              <option>Double Entry</option>
                              <option>No requirements</option>
                              <option>Send Later</option>
                            </select>
                          </div>

                          {formData.contractSent === "Yes" && (
                            <>
                              <div className="form-group">
                                <label htmlFor="contractDate">Contract Date</label>
                                <div className="date-picker-container">
                                  <DatePicker
                                    selected={formData.contractDate}
                                    onChange={(date) => handleDateChange("contractDate", date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="DD/MM/YYYY"
                                    className="date-picker-input"
                                  />
                                  <FaCalendarAlt className="calendar-icon" />
                                </div>
                              </div>

                              <div className="form-group">
                                <label htmlFor="contractReceived">Contract Received</label>
                                <select
                                  id="contractReceived"
                                  name="contractReceived"
                                  value={formData.contractReceived}
                                  onChange={handleChange}
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                  <option>Contract Not sent</option>
                                  <option>Post Closure</option>
                                </select>
                              </div>

                              <div className="form-group">
                                <label htmlFor="contractNumber">Contract Number</label>
                                <input
                                  id="contractNumber"
                                  name="contractNumber"
                                  value={formData.contractNumber}
                                  onChange={handleChange}
                                  className="form-input"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Client Details */}
                      <div className="form-section">
                        <h2 className="section-title">C. Client Details</h2>
                        <div className="form-grid">
                          <div className="form-group">
                            <label htmlFor="dateOfClientAcquired">Date of Client Acquired</label>
                            <div className="date-picker-container">
                              <DatePicker
                                selected={formData.dateOfClientAcquired}
                                onChange={(date) => handleDateChange("dateOfClientAcquired", date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="DD/MM/YYYY"
                                className="date-picker-input"
                              />
                              <FaCalendarAlt className="calendar-icon" />
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="clientStatus">Client Status</label>
                            <select
                              id="clientStatus"
                              name="clientStatus"
                              value={formData.clientStatus}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option>Select</option>
                              <option>Non Active</option>
                              <option>Active</option>
                              <option>Reallocation</option>
                              <option>Revival</option>
                              <option>City we don't work</option>
                              <option>Black Listed</option>
                              <option>Industry we dont work</option>
                              <option>Company do not exist</option>
                              <option>Old non performance client</option>
                              <option>Company Shut Down</option>
                              <option>Not interested to work</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Legal & Management Team */}
                      <div className="form-section">
                        <h2 className="section-title">D. Legal & Management Team</h2>
                        <div className="form-grid">
                          <div className="form-group">
                            <label htmlFor="teamLeader">Team Leader</label>
                            <select
                              id="teamLeader"
                              name="teamLeader"
                              value={formData.teamLeader}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option>Select</option>
                              <option>Team Leader 1</option>
                              <option>Team Leader 2</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="franchiseName">Franchise Name</label>
                            <select
                              id="franchiseName"
                              name="franchiseName"
                              value={formData.franchiseName}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option>Select</option>
                              <option>Franchise 1</option>
                              <option>Franchise 2</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="nameOfLegalExecutive">Name of Legal Executive</label>
                            <select
                              id="nameOfLegalExecutive"
                              name="nameOfLegalExecutive"
                              value={formData.nameOfLegalExecutive}
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option>Select</option>
                              <option>Deepti Singh</option>
                              <option>Nishi Doshi</option>
                              <option>Princy Abraham</option>
                              <option>Anushree Iyer</option>
                              <option>Mahek Shaikh</option>
                              <option>Legal Team</option>
                              <option>Kavya Sharma</option>
                              <option>Jacob Noel Joji</option>
                              <option>Rashi Chauhan</option>
                              <option>Shilpa Matthew</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="form-actions">
                        <button type="submit" className="save-button">
                          Save
                        </button>
                        <button type="button" className="cancel-button" onClick={closeForm}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )
        )}
      </div>
    </div>
    </div>
  )
}

export default LegalForm