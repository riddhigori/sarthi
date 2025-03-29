"use client"

import { useState, useEffect } from "react"
import "./EmployeeForm.css"

const EmployeeForm = ({ onSave, onCancel, employee = null, readOnly = false, isEdit = false }) => {
  const [formData, setFormData] = useState(
    employee
      ? {
          ...employee,
        }
      : {
          name: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          gender: "",
          emergencyNumber: "",
          emergencyContactName: "",
          address: "",
          pinCode: "",
          city: "",
          state: "",
          designation: "",
          joiningPay: "",
          joiningDate: "",
          department: "",
          branchOfficeName: "",
          locationOfBranch: "",
          aadharCardNo: "",
          panCard: "",
          uanNumber: "",
          esiRegistrationNumber: "",
          pfNumber: "",
          educationQualification: "",
          nameOfInstitute: "",
          locationOfInstitute: "",
          offerLetterSent: "",
          offerLetterDate: "",
          appointmentLetterSent: "",
          appointmentLetterDate: "",
          eligibleForPromotion: "",
          promotionDate: "",
          designationPromotion: "",
          startDate: "",
          endDate: "",
          basicSalary: "",
          hra: "",
          conveyanceAllowance: "",
          medicalAllowance: "",
          epfEmployee: "",
          epfEmployer: "",
          otherExpenses: "",
          professionalTax: "",
          gratuityProvision: "",
          eligibleForIncentive: "",
          bankACName: "",
          bankName: "",
          bankACNumber: "",
          pfACNumber: "",
          payDate: "",
          ifsc:"",
          picture: null,
        },
  )

  const [errors, setErrors] = useState({})
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    if (employee && employee.picture) {
      setPreviewImage(employee.picture)
    }
  }, [employee])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "radio") {
      setFormData({
        ...formData,
        [name]: checked ? "yes" : "no",
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
        setFormData({
          ...formData,
          picture: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits"
    }

    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.gender) newErrors.gender = "Gender is required"
    if (!formData.designation) newErrors.designation = "Designation is required"
    if (!formData.joiningDate) newErrors.joiningDate = "Joining date is required"
    if (!formData.department) newErrors.department = "Department is required"

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (readOnly) {
      onCancel()
      return
    }

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (isEdit) {
      onSave({ ...employee, ...formData })
    } else {
      onSave(formData)
    }
  }

  return (
    <div className="employee-form-overlay">
      <div className="employee-form-container">
        <div className="form-header">
          <h2>{readOnly ? "Employee Details" : isEdit ? "Edit Employee" : "Employee Data Form"}</h2>
        </div>

        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="form-row">
                <div className="form-group picture-upload">
                  <div className="picture-container">
                    {previewImage ? (
                      <img src={previewImage || "/placeholder.svg"} alt="Preview" className="preview-image" />
                    ) : (
                      <div className="upload-placeholder">
                        <span>+ Add Picture</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="picture"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                      readOnly={readOnly}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="name">Employee Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                    readOnly={readOnly}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email ID</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    readOnly={readOnly}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "error" : ""}
                    readOnly={readOnly}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={errors.dateOfBirth ? "error" : ""}
                    readOnly={readOnly}
                  />
                  {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={errors.gender ? "error" : ""}
                    readOnly={readOnly}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <span className="error-message">{errors.gender}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="emergencyNumber">Emergency number</label>
                  <input
                    type="tel"
                    id="emergencyNumber"
                    name="emergencyNumber"
                    value={formData.emergencyNumber}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="emergencyContactName">Emg. Contact Name & Relation</label>
                  <input
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pinCode">Pin Code</label>
                  <input
                    type="text"
                    id="pinCode"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <select id="city" name="city" value={formData.city} onChange={handleChange} readOnly={readOnly}>
                    <option value="">Select</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <select id="state" name="state" value={formData.state} onChange={handleChange} readOnly={readOnly}>
                    <option value="">Select</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="delhi">Delhi</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="telangana">Telangana</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="designation">Designation</label>
                  <select
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className={errors.designation ? "error" : ""}
                    readOnly={readOnly}
                  >
                    <option value="">Select</option>
                    <option value="UX/UI Designer">UX/UI Designer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Project Manager">Project Manager</option>
                  </select>
                  {errors.designation && <span className="error-message">{errors.designation}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="joiningPay">Joining Pay</label>
                  <input
                    type="text"
                    id="joiningPay"
                    name="joiningPay"
                    value={formData.joiningPay}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="joiningDate">Date of Joining</label>
                  <input
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className={errors.joiningDate ? "error" : ""}
                    readOnly={readOnly}
                  />
                  {errors.joiningDate && <span className="error-message">{errors.joiningDate}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={errors.department ? "error" : ""}
                    readOnly={readOnly}
                  >
                    <option value="">Select</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                  {errors.department && <span className="error-message">{errors.department}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="branchOfficeName">Branch Office Name</label>
                  <select
                    id="branchOfficeName"
                    name="branchOfficeName"
                    value={formData.branchOfficeName}
                    onChange={handleChange}
                    readOnly={readOnly}
                  >
                    <option value="">Select</option>
                    <option value="Mumbai HQ">Mumbai HQ</option>
                    <option value="Delhi Office">Delhi Office</option>
                    <option value="Bangalore Office">Bangalore Office</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="locationOfBranch">Location of Branch</label>
                  <select
                    id="locationOfBranch"
                    name="locationOfBranch"
                    value={formData.locationOfBranch}
                    onChange={handleChange}
                    readOnly={readOnly}
                  >
                    <option value="">Select</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Documentation & Eligibility</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="aadharCardNo">Aadhar Card No.</label>
                  <input
                    type="text"
                    id="aadharCardNo"
                    name="aadharCardNo"
                    value={formData.aadharCardNo}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="panCard">Pan Card</label>
                  <input
                    type="text"
                    id="panCard"
                    name="panCard"
                    value={formData.panCard}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="uanNumber">UAN Number</label>
                  <input
                    type="text"
                    id="uanNumber"
                    name="uanNumber"
                    value={formData.uanNumber}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="esiRegistrationNumber">ESI Registration Number</label>
                  <input
                    type="text"
                    id="esiRegistrationNumber"
                    name="esiRegistrationNumber"
                    value={formData.esiRegistrationNumber}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pfNumber">PF Number (if available)</label>
                  <input
                    type="text"
                    id="pfNumber"
                    name="pfNumber"
                    value={formData.pfNumber}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="educationQualification">Education Qualification</label>
                  <input
                    type="text"
                    id="educationQualification"
                    name="educationQualification"
                    value={formData.educationQualification}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nameOfInstitute">Name of Institute</label>
                  <select
                    id="nameOfInstitute"
                    name="nameOfInstitute"
                    value={formData.nameOfInstitute}
                    onChange={handleChange}
                    readOnly={readOnly}
                  >
                    <option value="">Select</option>
                    <option value="institute1">Institute 1</option>
                    <option value="institute2">Institute 2</option>
                    <option value="institute3">Institute 3</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="locationOfInstitute">Location of Institute</label>
                  <select
                    id="locationOfInstitute"
                    name="locationOfInstitute"
                    value={formData.locationOfInstitute}
                    onChange={handleChange}
                    readOnly={readOnly}
                  >
                    <option value="">Select</option>
                    <option value="location1">Location 1</option>
                    <option value="location2">Location 2</option>
                    <option value="location3">Location 3</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Offer & Appointment Letter Details</h3>

              <div className="form-row">
                <div className="form-group radio-group">
                  <label>Offer Letter Sent</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="offerLetterSent"
                        checked={formData.offerLetterSent === "yes"}
                        onChange={() => setFormData({ ...formData, offerLetterSent: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="offerLetterSent"
                        checked={formData.offerLetterSent === "no"}
                        onChange={() => setFormData({ ...formData, offerLetterSent: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="offerLetterDate">Offer Letter Date</label>
                  <input
                    type="date"
                    id="offerLetterDate"
                    name="offerLetterDate"
                    value={formData.offerLetterDate}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group radio-group">
                  <label>Appointment Letter Sent</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="appointmentLetterSent"
                        checked={formData.appointmentLetterSent === "yes"}
                        onChange={() => setFormData({ ...formData, appointmentLetterSent: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="appointmentLetterSent"
                        checked={formData.appointmentLetterSent === "no"}
                        onChange={() => setFormData({ ...formData, appointmentLetterSent: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentLetterDate">Appointment Letter Date</label>
                  <input
                    type="date"
                    id="appointmentLetterDate"
                    name="appointmentLetterDate"
                    value={formData.appointmentLetterDate}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group radio-group">
                  <label>Eligible for Promotion</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="eligibleForPromotion"
                        checked={formData.eligibleForPromotion === "yes"}
                        onChange={() => setFormData({ ...formData, eligibleForPromotion: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="eligibleForPromotion"
                        checked={formData.eligibleForPromotion === "no"}
                        onChange={() => setFormData({ ...formData, eligibleForPromotion: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="promotionDate">Promotion Date</label>
                  <input
                    type="date"
                    id="promotionDate"
                    name="promotionDate"
                    value={formData.promotionDate}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="designationPromotion">Designation</label>
                  <select
                    id="designationPromotion"
                    name="designationPromotion"
                    value={formData.designationPromotion}
                    onChange={handleChange}
                    readOnly={readOnly}
                  >
                    <option value="">Select</option>
                    <option value="Senior UX/UI Designer">Senior UX/UI Designer</option>
                    <option value="Senior Frontend Developer">Senior Frontend Developer</option>
                    <option value="Senior Backend Developer">Senior Backend Developer</option>
                    <option value="Senior HR Manager">Senior HR Manager</option>
                    <option value="Senior Project Manager">Senior Project Manager</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Salary Structure (Per Month) - Split Salary</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="basicSalary">Basic Salary</label>
                  <select
                    id="basicSalary"
                    name="basicSalary"
                    value={formData.basicSalary}
                    onChange={handleChange}
                    readOnly={readOnly}
                  >
                    <option value="">Select</option>
                    <option value="10000">10,000</option>
                    <option value="20000">20,000</option>
                    <option value="30000">30,000</option>
                    <option value="40000">40,000</option>
                    <option value="50000">50,000</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group radio-group">
                  <label>HRA</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="hra"
                        checked={formData.hra === "yes"}
                        onChange={() => setFormData({ ...formData, hra: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="hra"
                        checked={formData.hra === "no"}
                        onChange={() => setFormData({ ...formData, hra: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-group radio-group">
                  <label>Conveyance Allowance</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="conveyanceAllowance"
                        checked={formData.conveyanceAllowance === "yes"}
                        onChange={() => setFormData({ ...formData, conveyanceAllowance: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="conveyanceAllowance"
                        checked={formData.conveyanceAllowance === "no"}
                        onChange={() => setFormData({ ...formData, conveyanceAllowance: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group radio-group">
                  <label>Medical Allowance</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="medicalAllowance"
                        checked={formData.medicalAllowance === "yes"}
                        onChange={() => setFormData({ ...formData, medicalAllowance: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="medicalAllowance"
                        checked={formData.medicalAllowance === "no"}
                        onChange={() => setFormData({ ...formData, medicalAllowance: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-group radio-group">
                  <label>EPF (Employee)</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="epfEmployee"
                        checked={formData.epfEmployee === "yes"}
                        onChange={() => setFormData({ ...formData, epfEmployee: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="epfEmployee"
                        checked={formData.epfEmployee === "no"}
                        onChange={() => setFormData({ ...formData, epfEmployee: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group radio-group">
                  <label>EPF (Employer)</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="epfEmployer"
                        checked={formData.epfEmployer === "yes"}
                        onChange={() => setFormData({ ...formData, epfEmployer: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="epfEmployer"
                        checked={formData.epfEmployer === "no"}
                        onChange={() => setFormData({ ...formData, epfEmployer: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-group radio-group">
                  <label>Other Expenses</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="otherExpenses"
                        checked={formData.otherExpenses === "yes"}
                        onChange={() => setFormData({ ...formData, otherExpenses: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="otherExpenses"
                        checked={formData.otherExpenses === "no"}
                        onChange={() => setFormData({ ...formData, otherExpenses: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group radio-group">
                  <label>Professional Tax</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="professionalTax"
                        checked={formData.professionalTax === "yes"}
                        onChange={() => setFormData({ ...formData, professionalTax: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="professionalTax"
                        checked={formData.professionalTax === "no"}
                        onChange={() => setFormData({ ...formData, professionalTax: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-group radio-group">
                  <label>Gratuity Provision</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gratuityProvision"
                        checked={formData.gratuityProvision === "yes"}
                        onChange={() => setFormData({ ...formData, gratuityProvision: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gratuityProvision"
                        checked={formData.gratuityProvision === "no"}
                        onChange={() => setFormData({ ...formData, gratuityProvision: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group radio-group">
                  <label>Eligible for Incentive</label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="eligibleForIncentive"
                        checked={formData.eligibleForIncentive === "yes"}
                        onChange={() => setFormData({ ...formData, eligibleForIncentive: "yes" })}
                        readOnly={readOnly}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="eligibleForIncentive"
                        checked={formData.eligibleForIncentive === "no"}
                        onChange={() => setFormData({ ...formData, eligibleForIncentive: "no" })}
                        readOnly={readOnly}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Bank Details</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bankACName">Bank A/C Name</label>
                  <input
                    type="text"
                    id="bankACName"
                    name="bankACName"
                    value={formData.bankACName}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bankName">Bank Name</label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bankACNumber">Bank A/C Number</label>
                  <input
                    type="text"
                    id="bankACNumber"
                    name="bankACNumber"
                    value={formData.bankACNumber}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pfACNumber">PF A/C Number</label>
                  <input
                    type="text"
                    id="pfACNumber"
                    name="pfACNumber"
                    value={formData.pfACNumber}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ifsc">IFSC Code</label>
                  <input
                    type="text"
                    id="ifsc"
                    name="ifsc"
                    value={formData.ifsc}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
            

                <div className="form-group">
                  <label htmlFor="payDate">Pay Date</label>
                  <input
                    type="date"
                    id="payDate"
                    name="payDate"
                    value={formData.payDate}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              {!readOnly && (
                <button type="submit" className="save-btn">
                  {isEdit ? "Update" : "Save"}
                </button>
              )}
              <button type="button" className="cancel-btn" onClick={onCancel}>
                {readOnly ? "Close" : "Cancel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmployeeForm

