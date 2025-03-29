import { useState, useEffect, useRef } from "react"
import { format } from "date-fns"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import "./franchise.css"

function FranchiseDashboard() {
  // State for main page
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [franchiseList, setFranchiseList] = useState([])
  const [sortBy, setSortBy] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    // Franchisee Owner Details
    nameAsPerAgreement: "",
    nameOfFranchiseeOwner: "",
    agreementDocument: null,
    phoneNumber: "",
    alternateNumber: "",
    emailId: "",
    dateOfBirth: "",
    typeOfBusiness: "",
    country: "",
    addressAsPerAadhar: "",
    pinCode: "",
    area: "",
    city: "",
    state: "",

    // Business & Tax Information
    dateOfStartOfFranchisee: "",
    aadharNo: "",
    aadharCard: null,
    panNo: "",
    panCard: null,
    gstStatus: "no",
    gstNumber: "",
    gstCertificate: null,
    franchiseeDeveloperName: "",
    teamLeaderName: "",

    // Financial & Compliance Details
    franchiseeFees: "",
    franchiseePaymentReceivedOn: "",
    receivedDetails: "",
    modeOfReceipt: "",
    targetMonth: "",
    profitSharingPercentage: "",
    gstCharges: "",
    tdsPercentage: "",

    // Additional Fields
    officialEmailCreated: "no",
    officialEmailId: "",
    officialNumber: "",
    dateOfCreation: "",
    status: "",

    // Break details
    breakFrom: "",
    breakTo: "",
    breakReason: "",
    breakLetterUpload: null,
    emailDeactivated: "no",
  })

  // Calendar state
  const [showCalendar, setShowCalendar] = useState({})
  const [currentDate, setCurrentDate] = useState(new Date())
  const calendarRef = useRef(null)

  // Validation errors
  const [errors, setErrors] = useState({})

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar({})
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Validation for name fields - first letter should be capital
    if (name === "nameAsPerAgreement" || name === "nameOfFranchiseeOwner") {
      const words = value.split(" ")
      const capitalizedWords = words.map((word) => (word.length > 0 ? word[0].toUpperCase() + word.slice(1) : ""))
      setFormData({
        ...formData,
        [name]: capitalizedWords.join(" "),
      })

      // Validate if first letter is capital
      if (value && value[0] !== value[0].toUpperCase()) {
        setErrors({
          ...errors,
          [name]: "First letter should be capital",
        })
      } else {
        const newErrors = { ...errors }
        delete newErrors[name]
        setErrors(newErrors)
      }
    }
    // Validation for GST number - should be 15 digits
    else if (name === "gstNumber") {
      setFormData({
        ...formData,
        [name]: value,
      })

      if (value && value.length !== 15) {
        setErrors({
          ...errors,
          [name]: "GST number should be 15 digits",
        })
      } else {
        const newErrors = { ...errors }
        delete newErrors[name]
        setErrors(newErrors)
      }
    }
    // For other fields
    else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Handle file upload
  const handleFileUpload = (e) => {
    const { name, files } = e.target
    setFormData({
      ...formData,
      [name]: files[0],
    })
  }

  // Handle radio button change
  const handleRadioChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle select change
  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle date change
  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date ? format(date, "dd/MM/yyyy") : "",
    })
    setShowCalendar({})
  }

  // Handle phone input change
  const handlePhoneChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle pincode change and fetch city, state, country
  const handlePincodeChange = (e) => {
    const { value } = e.target
    setFormData({
      ...formData,
      pinCode: value,
    })

    // Immediately fetch location data when pincode is 6 digits
    if (value.length === 6) {
      // Show loading state
      setFormData((prev) => ({
        ...prev,
        city: "Loading...",
        state: "Loading...",
        country: "Loading...",
      }))

      // Fetch location data
      fetchLocationData(value)
    } else if (value.length < 6) {
      // Clear location data if pincode is incomplete
      setFormData((prev) => ({
        ...prev,
        city: "",
        state: "",
        country: "",
      }))
    }
  }

  // Function to fetch location data based on pincode
  const fetchLocationData = (pincode) => {
    // In a real application, you would make an API call to a pincode service
    // For this example, we'll use a more comprehensive mapping of pincodes
    const pincodeMap = {
      110001: { city: "New Delhi", state: "Delhi", country: "India" },
      110002: { city: "New Delhi", state: "Delhi", country: "India" },
      110003: { city: "New Delhi", state: "Delhi", country: "India" },
      400001: { city: "Mumbai", state: "Maharashtra", country: "India" },
      400002: { city: "Mumbai", state: "Maharashtra", country: "India" },
      400003: { city: "Mumbai", state: "Maharashtra", country: "India" },
      700001: { city: "Kolkata", state: "West Bengal", country: "India" },
      700002: { city: "Kolkata", state: "West Bengal", country: "India" },
      600001: { city: "Chennai", state: "Tamil Nadu", country: "India" },
      600002: { city: "Chennai", state: "Tamil Nadu", country: "India" },
      500001: { city: "Hyderabad", state: "Telangana", country: "India" },
      500002: { city: "Hyderabad", state: "Telangana", country: "India" },
      380001: { city: "Ahmedabad", state: "Gujarat", country: "India" },
      380002: { city: "Ahmedabad", state: "Gujarat", country: "India" },
      560001: { city: "Bangalore", state: "Karnataka", country: "India" },
      560002: { city: "Bangalore", state: "Karnataka", country: "India" },
      226001: { city: "Lucknow", state: "Uttar Pradesh", country: "India" },
      226002: { city: "Lucknow", state: "Uttar Pradesh", country: "India" },
      302001: { city: "Jaipur", state: "Rajasthan", country: "India" },
      302002: { city: "Jaipur", state: "Rajasthan", country: "India" },
      800001: { city: "Patna", state: "Bihar", country: "India" },
      800002: { city: "Patna", state: "Bihar", country: "India" },
      160001: { city: "Chandigarh", state: "Chandigarh", country: "India" },
      160002: { city: "Chandigarh", state: "Chandigarh", country: "India" },
      781001: { city: "Guwahati", state: "Assam", country: "India" },
      781002: { city: "Guwahati", state: "Assam", country: "India" },
      462001: { city: "Bhopal", state: "Madhya Pradesh", country: "India" },
      462002: { city: "Bhopal", state: "Madhya Pradesh", country: "India" },
      452001: { city: "Indore", state: "Madhya Pradesh", country: "India" },
      452002: { city: "Indore", state: "Madhya Pradesh", country: "India" },
      440001: { city: "Nagpur", state: "Maharashtra", country: "India" },
      440002: { city: "Nagpur", state: "Maharashtra", country: "India" },
      411001: { city: "Pune", state: "Maharashtra", country: "India" },
      411002: { city: "Pune", state: "Maharashtra", country: "India" },
      248001: { city: "Dehradun", state: "Uttarakhand", country: "India" },
      248002: { city: "Dehradun", state: "Uttarakhand", country: "India" },
      641001: { city: "Coimbatore", state: "Tamil Nadu", country: "India" },
      641002: { city: "Coimbatore", state: "Tamil Nadu", country: "India" },
      682001: { city: "Kochi", state: "Kerala", country: "India" },
      682002: { city: "Kochi", state: "Kerala", country: "India" },
    }

    // Simulate network delay (remove this in production)
    setTimeout(() => {
      // Check if pincode exists in our map - ensure pincode is treated as a string
      if (pincodeMap[pincode]) {
        setFormData((prev) => ({
          ...prev,
          city: pincodeMap[pincode].city,
          state: pincodeMap[pincode].state,
          country: pincodeMap[pincode].country,
        }))
      } else {
        // For any other pincode, generate a placeholder response
        // In a real app, you would show an error or fetch from an API
        setFormData((prev) => ({
          ...prev,
          city: "Unknown City",
          state: "Unknown State",
          country: "India",
        }))
      }
    }, 300) // Reduced timeout for better responsiveness
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    const newErrors = {}

    if (!formData.nameAsPerAgreement) {
      newErrors.nameAsPerAgreement = "Name as per agreement is required"
    }

    if (!formData.nameOfFranchiseeOwner) {
      newErrors.nameOfFranchiseeOwner = "Name of franchisee owner is required"
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required"
    }

    if (!formData.emailId) {
      newErrors.emailId = "Email ID is required"
    }

    if (formData.gstStatus === "yes" && !formData.gstNumber) {
      newErrors.gstNumber = "GST number is required"
    }

    if (formData.gstStatus === "yes" && formData.gstNumber && formData.gstNumber.length !== 15) {
      newErrors.gstNumber = "GST number should be 15 digits"
    }

    setErrors(newErrors)

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData)

      // Format file names for display in table
      const formatFileName = (file) => {
        return file ? file.name : "-"
      }

      // Add to franchise list with all required fields for the table
      const newFranchise = {
        id: Date.now(),
        nameAsPerAgreement: formData.nameAsPerAgreement || "-",
        nameOfFranchiseeOwner: formData.nameOfFranchiseeOwner || "-",
        agreementDocument: formatFileName(formData.agreementDocument),
        phoneNumber: formData.phoneNumber || "-",
        alternateNumber: formData.alternateNumber || "-",
        emailId: formData.emailId || "-",
        dateOfBirth: formData.dateOfBirth || "-",
        typeOfBusiness: formData.typeOfBusiness || "-",
        country: formData.country || "-",
        addressAsPerAadhar: formData.addressAsPerAadhar || "-",
        pinCode: formData.pinCode || "-",
        area: formData.area || "-",
        city: formData.city || "-",
        state: formData.state || "-",
        dateOfStartOfFranchisee: formData.dateOfStartOfFranchisee || "-",
        aadharNo: formData.aadharNo || "-",
        aadharCard: formatFileName(formData.aadharCard),
        panNo: formData.panNo || "-",
        panCard: formatFileName(formData.panCard),
        gstStatus: formData.gstStatus || "-",
        gstNumber: formData.gstNumber || "-",
        gstCertificate: formatFileName(formData.gstCertificate),
        franchiseeDeveloperName: formData.franchiseeDeveloperName || "-",
        teamLeaderName: formData.teamLeaderName || "-",
        franchiseeFees: formData.franchiseeFees || "-",
        franchiseePaymentReceivedOn: formData.franchiseePaymentReceivedOn || "-",
        receivedDetails: formData.receivedDetails || "-",
        modeOfReceipt: formData.modeOfReceipt || "-",
        targetMonth: formData.targetMonth || "-",
        profitSharingPercentage: formData.profitSharingPercentage || "-",
        gstCharges: formData.gstCharges || "-",
        tdsPercentage: formData.tdsPercentage || "-",
        officialEmailCreated: formData.officialEmailCreated || "-",
        officialEmailId: formData.officialEmailId || "-",
        officialNumber: formData.officialNumber || "-",
        dateOfCreation: formData.dateOfCreation || "-",
        breakFrom: formData.breakFrom || "-",
        breakTo: formData.breakTo || "-",
        breakReason: formData.breakReason || "-",
        breakLetterUpload: formatFileName(formData.breakLetterUpload),
        emailDeactivated: formData.emailDeactivated || "-",
        status: formData.status || "Active",
        // Store all form data for editing
        ...formData,
      }

      setFranchiseList([...franchiseList, newFranchise])

      // Reset form and go back to list view
      setFormData({
        // Reset all form fields to initial state
        nameAsPerAgreement: "",
        nameOfFranchiseeOwner: "",
        agreementDocument: null,
        phoneNumber: "",
        alternateNumber: "",
        emailId: "",
        dateOfBirth: "",
        typeOfBusiness: "",
        country: "",
        addressAsPerAadhar: "",
        pinCode: "",
        area: "",
        city: "",
        state: "",
        dateOfStartOfFranchisee: "",
        aadharNo: "",
        aadharCard: null,
        panNo: "",
        panCard: null,
        gstStatus: "no",
        gstNumber: "",
        gstCertificate: null,
        franchiseeDeveloperName: "",
        teamLeaderName: "",
        franchiseeFees: "",
        franchiseePaymentReceivedOn: "",
        receivedDetails: "",
        modeOfReceipt: "",
        targetMonth: "",
        profitSharingPercentage: "",
        gstCharges: "",
        tdsPercentage: "",
        officialEmailCreated: "no",
        officialEmailId: "",
        officialNumber: "",
        dateOfCreation: "",
        status: "",
        breakFrom: "",
        breakTo: "",
        breakReason: "",
        breakLetterUpload: null,
        emailDeactivated: "no",
      })

      setShowForm(false)
    }
  }

  // Add functions for edit, delete, and download CSV functionality
  const handleEdit = (id) => {
    const franchiseToEdit = franchiseList.find((franchise) => franchise.id === id)
    if (franchiseToEdit) {
      setFormData(franchiseToEdit)
      setShowForm(true)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this franchise?")) {
      setFranchiseList(franchiseList.filter((franchise) => franchise.id !== id))
    }
  }

  const downloadCSV = () => {
    // Create CSV header with all fields
    let csvContent = "Name as per Agreement,Name of Franchisee Owner,Phone Number,Email ID,City,State,Country,Status\n"

    // Add data rows
    franchiseList.forEach((franchise) => {
      csvContent += `"${franchise.nameAsPerAgreement}","${franchise.nameOfFranchiseeOwner}","${franchise.phoneNumber}","${franchise.emailId}","${franchise.city}","${franchise.state}","${franchise.country}","${franchise.status}"\n`;
    });
    

    // Create download link
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "franchise_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle cancel button
  const handleCancel = () => {
    setShowForm(false)
    setFormData({
      // Reset all form fields to initial state
      nameAsPerAgreement: "",
      nameOfFranchiseeOwner: "",
      agreementDocument: null,
      phoneNumber: "",
      alternateNumber: "",
      emailId: "",
      dateOfBirth: "",
      typeOfBusiness: "",
      country: "",
      addressAsPerAadhar: "",
      pinCode: "",
      area: "",
      city: "",
      state: "",
      dateOfStartOfFranchisee: "",
      aadharNo: "",
      aadharCard: null,
      panNo: "",
      panCard: null,
      gstStatus: "no",
      gstNumber: "",
      gstCertificate: null,
      franchiseeDeveloperName: "",
      teamLeaderName: "",
      franchiseeFees: "",
      franchiseePaymentReceivedOn: "",
      receivedDetails: "",
      modeOfReceipt: "",
      targetMonth: "",
      profitSharingPercentage: "",
      gstCharges: "",
      tdsPercentage: "",
      officialEmailCreated: "no",
      officialEmailId: "",
      officialNumber: "",
      dateOfCreation: "",
      status: "",
      breakFrom: "",
      breakTo: "",
      breakReason: "",
      breakLetterUpload: null,
      emailDeactivated: "no",
    })
    setErrors({})
  }

  // Generate calendar days
  const generateCalendarDays = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  // Handle month navigation in calendar
  const handleMonthChange = (increment) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + increment)
    setCurrentDate(newDate)
  }

  // Custom file input component
  const FileUpload = ({ label, name, accept = ".pdf,.jpg,.jpeg,.png" }) => {
    const fileInputRef = useRef(null)

    return (
      <div className="form-group">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <div className="file-upload" onClick={() => fileInputRef.current.click()}>
          <div className="file-upload-content">
            <span className="file-upload-icon">+</span>
            <span className="file-upload-text">Upload document</span>
            {formData[name] && <span className="file-name">{formData[name].name}</span>}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            id={name}
            name={name}
            accept={accept}
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    )
  }

  // Custom date picker component
  const DatePicker = ({ label, name, value }) => {
    const toggleCalendar = () => {
      setShowCalendar((prev) => ({
        ...prev,
        [name]: !prev[name],
      }))
    }

    return (
      <div className="form-group">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <div className="date-input-container">
          <input
            type="text"
            id={name}
            name={name}
            value={value || ""}
            placeholder="DD/MM/YYYY"
            readOnly
            onClick={toggleCalendar}
            className="date-input"
          />
          <span className="calendar-icon" onClick={toggleCalendar}>
            📅
          </span>
        </div>

        {showCalendar[name] && (
          <div ref={calendarRef} className="calendar-container">
            <div className="calendar-header">
              <button type="button" onClick={() => handleMonthChange(-1)} className="calendar-nav-button">
                &lt;
              </button>
              <div className="calendar-month">{format(currentDate, "MMMM yyyy")}</div>
              <button type="button" onClick={() => handleMonthChange(1)} className="calendar-nav-button">
                &gt;
              </button>
            </div>

            <div className="calendar-grid">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="calendar-weekday">
                  {day}
                </div>
              ))}

              {generateCalendarDays(currentDate).map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${day ? "calendar-day-active" : ""} ${
                    day && day.toDateString() === new Date().toDateString() ? "calendar-day-today" : ""
                  }`}
                  onClick={() => day && handleDateChange(name, day)}
                >
                  {day ? day.getDate() : ""}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
  <div className="franchise-wrapper">
    <div className="container">
      {!showForm ? (
        // Main page - Franchise listing
        <div className="franchise-container-wrap">
          <div className="header-container">
            <div>
              <h1 className="page-title">Franchise Data</h1>
              <p className="page-subtitle">All the company franchise are listed here</p>
            </div>
            <button className="btn-primary add-franchise-btn" onClick={() => setShowForm(true)}>
              <span className="plus-icon">+</span> Add Franchise
            </button>
          </div>

          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
              <option value="status">Status</option>
            </select>
          </div>

          {franchiseList.length > 0 ? (
            <div className="table-wrapper">
              <div className="table-header">
                <h3 className="table-title">Franchise Data</h3>
                <button onClick={downloadCSV} className="download-btn" title="Download CSV">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="download-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name as per Agreement</th>
                      <th>Name of Franchisee Owner</th>
                      <th>Phone Number</th>
                      <th>Email ID</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Country</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {franchiseList.map((franchise) => (
                      <tr key={franchise.id}>
                        <td>{franchise.nameAsPerAgreement}</td>
                        <td>{franchise.nameOfFranchiseeOwner}</td>
                        <td>{franchise.phoneNumber}</td>
                        <td>{franchise.emailId}</td>
                        <td>{franchise.city}</td>
                        <td>{franchise.state}</td>
                        <td>{franchise.country}</td>
                        <td>{franchise.status}</td>
                        <td>
                          <div className="action-buttons">
                            <button onClick={() => handleEdit(franchise.id)} className="edit-button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="action-icon"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button onClick={() => handleDelete(franchise.id)} className="delete-button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="action-icon"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="empty-state" onClick={() => setShowForm(true)}>
              <div className="empty-state-icon">
                <span className="empty-state-plus">+</span>
              </div>
              <p className="empty-state-text">Click here to add Franchise Data</p>
            </div>
          )}
        </div>
      ) : (
        // Franchise Data Form
        <div className="form-wrap-fr">
          <h1 className="form-title">Franchisee Data Form</h1>

          <form onSubmit={handleSubmit} className="form-container">
            {/* Franchisee Owner Details */}
            <div className="form-section">
              <h2 className="section-title">Franchisee Owner Details</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nameAsPerAgreement" className="form-label">
                    Name as per Agreement
                  </label>
                  <input
                    type="text"
                    id="nameAsPerAgreement"
                    name="nameAsPerAgreement"
                    value={formData.nameAsPerAgreement}
                    onChange={handleInputChange}
                    className={`form-input ${errors.nameAsPerAgreement ? "error-input" : ""}`}
                  />
                  {errors.nameAsPerAgreement && <p className="error-text">{errors.nameAsPerAgreement}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="nameOfFranchiseeOwner" className="form-label">
                    Name of franchisee owner
                  </label>
                  <input
                    type="text"
                    id="nameOfFranchiseeOwner"
                    name="nameOfFranchiseeOwner"
                    value={formData.nameOfFranchiseeOwner}
                    onChange={handleInputChange}
                    className={'form-input ${errors.nameOfFranchiseeOwner ? "error-input" : ""}'}
                  />
                  {errors.nameOfFranchiseeOwner && <p className="error-text">{errors.nameOfFranchiseeOwner}</p>}
                </div>

                <FileUpload label="Agreement Document" name="agreementDocument" />

                <div className="form-group">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone number
                  </label>
                  <PhoneInput
                    country={"in"}
                    value={formData.phoneNumber}
                    onChange={(value) => handlePhoneChange(value, "phoneNumber")}
                    inputProps={{
                      name: "phoneNumber",
                      id: "phoneNumber",
                      required: true,
                      className: "phone-input",
                    }}
                    containerClass="phone-container"
                    inputClass="phone-input-field"
                  />
                  {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="alternateNumber" className="form-label">
                    Alternate number
                  </label>
                  <PhoneInput
                    country={"in"}
                    value={formData.alternateNumber}
                    onChange={(value) => handlePhoneChange(value, "alternateNumber")}
                    inputProps={{
                      name: "alternateNumber",
                      id: "alternateNumber",
                      className: "phone-input",
                    }}
                    containerClass="phone-container"
                    inputClass="phone-input-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="emailId" className="form-label">
                    Email ID (personal)
                  </label>
                  <input
                    type="email"
                    id="emailId"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    className={'form-input ${errors.emailId ? "error-input" : ""}'}
                  />
                  {errors.emailId && <p className="error-text">{errors.emailId}</p>}
                </div>

                <DatePicker label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} />

                <div className="form-group">
                  <label htmlFor="typeOfBusiness" className="form-label">
                    Type of business
                  </label>
                  <select
                    id="typeOfBusiness"
                    name="typeOfBusiness"
                    value={formData.typeOfBusiness}
                    onChange={handleSelectChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="company">Company</option>
                    <option value="firm">Firm</option>
                    <option value="individual">Individual/HUF</option>
                    <option value="partnership firm">Partnership Firm</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleSelectChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="addressAsPerAadhar" className="form-label">
                    Address as per Aadhar
                  </label>
                  <input
                    type="text"
                    id="addressAsPerAadhar"
                    name="addressAsPerAadhar"
                    value={formData.addressAsPerAadhar}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pinCode" className="form-label">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    id="pinCode"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handlePincodeChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="area" className="form-label">
                    Area
                  </label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    readOnly
                    className="form-input readonly"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    readOnly
                    className="form-input readonly"
                  />
                </div>
              </div>
            </div>

            {/* Business & Tax Information */}
            <div className="form-section">
              <h2 className="section-title">Business & Tax Information</h2>
              <div className="form-grid">
                <DatePicker
                  label="Date of start of franchisee"
                  name="dateOfStartOfFranchisee"
                  value={formData.dateOfStartOfFranchisee}
                />

                <div className="form-group">
                  <label htmlFor="aadharNo" className="form-label">
                    Aadhar No.
                  </label>
                  <input
                    type="text"
                    id="aadharNo"
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <FileUpload label="Aadhar Card" name="aadharCard" />

                <div className="form-group">
                  <label htmlFor="panNo" className="form-label">
                    PAN No.
                  </label>
                  <input
                    type="text"
                    id="panNo"
                    name="panNo"
                    value={formData.panNo}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <FileUpload label="PAN Card" name="panCard" />

                <div className="form-group">
                  <label className="form-label">GST Status</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="gst-yes"
                        name="gstStatus"
                        value="yes"
                        checked={formData.gstStatus === "yes"}
                        onChange={() => handleRadioChange("gstStatus", "yes")}
                        className="radio-input"
                      />
                      <label htmlFor="gst-yes" className="radio-label">
                        Yes
                      </label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="gst-no"
                        name="gstStatus"
                        value="no"
                        checked={formData.gstStatus === "no"}
                        onChange={() => handleRadioChange("gstStatus", "no")}
                        className="radio-input"
                      />
                      <label htmlFor="gst-no" className="radio-label">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {formData.gstStatus === "yes" && (
                  <>
                    <div className="form-group">
                      <label htmlFor="gstNumber" className="form-label">
                        GST Number
                      </label>
                      <input
                        type="text"
                        id="gstNumber"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleInputChange}
                        className={'form-input ${errors.gstNumber ? "error-input" : ""}'}
                      />
                      {errors.gstNumber && <p className="error-text">{errors.gstNumber}</p>}
                    </div>

                    <FileUpload label="GST Certificate" name="gstCertificate" />
                  </>
                )}

                <div className="form-group">
                  <label htmlFor="franchiseeDeveloperName" className="form-label">
                    Franchisee Developer Name
                  </label>
                  <select
                    id="franchiseeDeveloperName"
                    name="franchiseeDeveloperName"
                    value={formData.franchiseeDeveloperName}
                    onChange={handleSelectChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="dev1">Developer 1</option>
                    <option value="dev2">Developer 2</option>
                    <option value="dev3">Developer 3</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="teamLeaderName" className="form-label">
                    Team Leader Name
                  </label>
                  <select
                    id="teamLeaderName"
                    name="teamLeaderName"
                    value={formData.teamLeaderName}
                    onChange={handleSelectChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="leader1">Team Leader 1</option>
                    <option value="leader2">Team Leader 2</option>
                    <option value="leader3">Team Leader 3</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Financial & Compliance Details */}
            <div className="form-section">
              <h2 className="section-title">Financial & Compliance Details</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="franchiseeFees" className="form-label">
                    Franchisee Fees
                  </label>
                  <select
                    id="franchiseeFees"
                    name="franchiseeFees"
                    value={formData.franchiseeFees}
                    onChange={handleSelectChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="10000">₹10,000</option>
                    <option value="25000">₹25,000</option>
                    <option value="50000">₹50,000</option>
                    <option value="100000">₹100,000</option>
                  </select>
                </div>

                <DatePicker
                  label="Franchisee Payment - Received on"
                  name="franchiseePaymentReceivedOn"
                  value={formData.franchiseePaymentReceivedOn}
                />

                <div className="form-group">
                  <label htmlFor="receivedDetails" className="form-label">
                    Received Details
                  </label>
                  <select
                    id="receivedDetails"
                    name="receivedDetails"
                    value={formData.receivedDetails}
                    onChange={handleSelectChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="full">Full/Final Payment</option>
                    <option value="partial">Initial Payment</option>
                    <option value="pending">Subsidiary</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="modeOfReceipt" className="form-label">
                    Mode of Receipt
                  </label>
                  <select
                    id="modeOfReceipt"
                    name="modeOfReceipt"
                    value={formData.modeOfReceipt}
                    onChange={handleSelectChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="cash">Cash</option>
                    <option value="cheque">Cheque</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="upi">UPI</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="targetMonth" className="form-label">
                    Target Month
                  </label>
                  <input
                    type="text"
                    id="targetMonth"
                    name="targetMonth"
                    value={formData.targetMonth}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="profitSharingPercentage" className="form-label">
                    Profit Sharing %
                  </label>
                  <input
                    type="number"
                    id="profitSharingPercentage"
                    name="profitSharingPercentage"
                    value={formData.profitSharingPercentage}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gstCharges" className="form-label">
                    GST Charges
                  </label>
                  <select
                    id="gstCharges"
                    name="gstCharges"
                    value={formData.gstCharges}
                    onChange={handleSelectChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="tdsPercentage" className="form-label">
                    TDS %
                  </label>
                  <select
                    id="tdsPercentage"
                    name="tdsPercentage"
                    value={formData.tdsPercentage}
                    onChange={handleSelectChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="0">1%</option>
                    <option value="2">2%</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Fields */}
            <div className="form-section">
              <h2 className="section-title">Additional Fields</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Official Email Created</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="email-yes"
                        name="officialEmailCreated"
                        value="yes"
                        checked={formData.officialEmailCreated === "yes"}
                        onChange={() => handleRadioChange("officialEmailCreated", "yes")}
                        className="radio-input"
                      />
                      <label htmlFor="email-yes" className="radio-label">
                        Yes
                      </label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="email-no"
                        name="officialEmailCreated"
                        value="no"
                        checked={formData.officialEmailCreated === "no"}
                        onChange={() => handleRadioChange("officialEmailCreated", "no")}
                        className="radio-input"
                      />
                      <label htmlFor="email-no" className="radio-label">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="officialEmailId" className="form-label">
                    Official Email ID
                  </label>
                  <input
                    type="email"
                    id="officialEmailId"
                    name="officialEmailId"
                    value={formData.officialEmailId}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="officialNumber" className="form-label">
                    Official number
                  </label>
                  <PhoneInput
                    country={"in"}
                    value={formData.officialNumber}
                    onChange={(value) => handlePhoneChange(value, "officialNumber")}
                    inputProps={{
                      name: "officialNumber",
                      id: "officialNumber",
                      className: "phone-input",
                    }}
                    containerClass="phone-container"
                    inputClass="phone-input-field"
                  />
                </div>

                <DatePicker label="Date of Creation" name="dateOfCreation" value={formData.dateOfCreation} />

                <div className="form-group">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleSelectChange}
                    className="form-select"
                  >
                    <option value="">Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="break">Taken a Break</option>
                  </select>
                </div>

                {formData.status === "break" && (
                  <>
                    <DatePicker label="From" name="breakFrom" value={formData.breakFrom} />

                    <DatePicker label="To" name="breakTo" value={formData.breakTo} />

                    <div className="form-group full-width">
                      <label htmlFor="breakReason" className="form-label">
                        Reason
                      </label>
                      <input
                        type="text"
                        id="breakReason"
                        name="breakReason"
                        value={formData.breakReason}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    <FileUpload label="Letter Upload" name="breakLetterUpload" />

                    <div className="form-group">
                      <label className="form-label">Email Deactivated</label>
                      <div className="radio-group">
                        <div className="radio-option">
                          <input
                            type="radio"
                            id="deactivated-yes"
                            name="emailDeactivated"
                            value="yes"
                            checked={formData.emailDeactivated === "yes"}
                            onChange={() => handleRadioChange("emailDeactivated", "yes")}
                            className="radio-input"
                          />
                          <label htmlFor="deactivated-yes" className="radio-label">
                            Yes
                          </label>
                        </div>
                        <div className="radio-option">
                          <input
                            type="radio"
                            id="deactivated-no"
                            name="emailDeactivated"
                            value="no"
                            checked={formData.emailDeactivated === "no"}
                            onChange={() => handleRadioChange("emailDeactivated", "no")}
                            className="radio-input"
                          />
                          <label htmlFor="deactivated-no" className="radio-label">
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="submit" className="btn-primary submit-btn">
                Save
              </button>
              <button type="button" className="btn-secondary cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  )
}

export default FranchiseDashboard