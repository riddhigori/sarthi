"use client"

import { useState, useEffect } from "react"
import "./EmployeeData.css"
import EmployeeForm from "./employeeform"
import EmployeePopup from "./employeepopup"
import EmployeePerformance from "./employeeperformance"

const EmployeeData = () => {
  // State to manage employees list
  const [employees, setEmployees] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showPerformance, setShowPerformance] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewDetailsMode, setViewDetailsMode] = useState(false)
  const [editMode, setEditMode] = useState(false)

  // Load employees from localStorage on component mount (Replace this with backend API call later)
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees")
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees))
    }
  }, [])

  // Save employees to localStorage whenever the list changes (Replace this with backend API update later)
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees))
  }, [employees])

  // Function to handle adding a new employee
  const handleAddEmployee = () => {
    setSelectedEmployee(null)
    setShowForm(true)
  }

  // Function to save employee data (update or create new)
  const handleSaveEmployee = (employeeData) => {
    if (editMode && selectedEmployee) {
      // Update existing employee
      const updatedEmployees = employees.map((emp) =>
        emp.id === selectedEmployee.id ? { ...employeeData, id: selectedEmployee.id } : emp
      )
      setEmployees(updatedEmployees)
    } else {
      // Add new employee
      const newEmployee = {
        ...employeeData,
        id: Date.now().toString(), // Temporary ID, replace with backend ID after API integration
        empCode: `EMP${Math.floor(10000 + Math.random() * 90000)}` // Generate a random employee code
      }
      setEmployees([...employees, newEmployee])
    }
    setShowForm(false)
    setEditMode(false)
    setViewDetailsMode(false)
  }

  // Function to handle row click and show popup
  const handleRowClick = (employee) => {
    setSelectedEmployee(employee)
    setShowPopup(true)
  }

  // Function to handle performance click
  const handlePerformanceClick = (e, employee) => {
    e.stopPropagation()
    setSelectedEmployee(employee)
    setShowPerformance(true)
  }

  // Filter employees based on search input
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Function to view employee details
  const handleViewDetails = () => {
    setShowPopup(false)
    setViewDetailsMode(true)
    setShowForm(true)
  }

  // Function to edit employee details
  const handleEdit = () => {
    setShowPopup(false)
    setEditMode(true)
    setShowForm(true)
  }

  // Function to handle form cancel
  const handleFormCancel = () => {
    setShowForm(false)
    setViewDetailsMode(false)
    setEditMode(false)
  }

  return (
    <div className="employee-data-container">
      <div className="employee-data-main-content">
        <div className="employee-data-content-area">
          <div className="wrapper-header">
          <div className="employees-header">
            <h1>Employees ({employees.length})</h1>
            <p className="employees-desc"> All the employees of the company are listed here</p>
          </div>
          <div className="btns-header">
            <button className="add-employee-btn" onClick={handleAddEmployee}>+ Add Employee</button>
            <button className="employee-download-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4F378A" viewBox="0 0 256 256"><path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z"></path></svg>
            </button>
            </div>
            </div> 
          <div className="employee-search-filter">
            <div className="employee-filters-left">
              <div className="employee-search-box">
                <span className="employee-search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4F378A" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  className="searchbar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="employee-filter">
              <span>Filter:</span>
              <select>
                <option>All</option>
              </select>
            </div>
           
          </div>

          <div className="employees-table">
            {filteredEmployees.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Joining Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} onClick={() => handleRowClick(employee)}>
                      <td>
                        <div className="employee-avatar">
                          {employee.picture ? (
                            <img src={employee.picture || "/placeholder.svg"} alt={employee.name} />
                          ) : (
                            <div className="avatar-placeholder">{employee.name.charAt(0)}</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="employee-name">{employee.name}</div>
                        <div className="employee-designation">{employee.designation}</div>
                      </td>
                      <td>{employee.designation}</td>
                      <td>{employee.email}</td>
                      <td>{employee.joiningDate}</td>
                      <td>
                        <button className="performance-btn" onClick={(e) => handlePerformanceClick(e, employee)}>
                          Performance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <div className="empty-box">
                  <span className="empty-icon">📋</span>
                  <p>Click here to add Employee Data</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showForm && (
  <div className="employee-form-container">
    <EmployeeForm
      onSave={handleSaveEmployee}
      onCancel={handleFormCancel}
      employee={editMode || viewDetailsMode ? selectedEmployee : null}
      readOnly={viewDetailsMode}
      isEdit={editMode}
    />
  </div>
)}


      {showPopup && selectedEmployee && (
        <EmployeePopup
          employee={selectedEmployee}
          onClose={() => setShowPopup(false)}
          onPerformanceClick={() => {
            setShowPopup(false)
            setShowPerformance(true)
          }}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
        />
      )}

      {showPerformance && selectedEmployee && (
        <EmployeePerformance employee={selectedEmployee} onClose={() => setShowPerformance(false)} />
      )}
    </div>
  )
}

export default EmployeeData
