"use client"
import "./EmployeePopup.css"

const EmployeePopup = ({ employee, onClose, onPerformanceClick, onViewDetails, onEdit }) => {
  return (
    <div className="employee-popup-overlay">
      <div className="employee-popup-container">
        <div className="popup-header">
          <button className="back-btn" onClick={onClose}>
            &lt; Back to Grid
          </button>
          <div className="header-actions">
            <button className="view-details-btn" onClick={onViewDetails}>
              View Details
            </button>
            <button className="download-btn">
              <span className="download-icon">⬇️</span>
            </button>
            <button className="edit-btn" onClick={onEdit}>
              Edit
            </button>
          </div>
        </div>

        <div className="popup-content">
          <div className="employee-profile">
            <div className="profile-image">
              {employee.picture ? (
                <img src={employee.picture || "/placeholder.svg"} alt={employee.name} />
              ) : (
                <div className="avatar-placeholder">{employee.name.charAt(0)}</div>
              )}
            </div>

            <div className="profile-info">
              <h2 className="employee-name">{employee.name}</h2>
              <p className="employee-designation">{employee.designation}</p>
              <button className="performance-btn" onClick={onPerformanceClick}>
                Performance
              </button>
            </div>
          </div>

          <div className="employee-details">
            <div className="detail-row">
              <div className="detail-label">Joining Date:</div>
              <div className="detail-value">{employee.joiningDate}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Designation:</div>
              <div className="detail-value">{employee.designation}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Department</div>
              <div className="detail-value">{employee.department}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">BD Members:</div>
              <div className="detail-value">{employee.joiningDate}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Company Name:</div>
              <div className="detail-value">Talent corner hr</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Address:</div>
              <div className="detail-value">
                {employee.address ||
                  "Bhaveshwar Arcade Annex, 708 & 709, Lal Bahadur Shastri Marg, opp. Shreyas Cinema Road, Nityanand Nagar, Ghatkopar West, Mumbai, Maharashtra 400086"}
              </div>
            </div>
          </div>
        </div>

        <div className="popup-footer">
          <div className="employee-name-footer">{employee.name}</div>
          <div className="employee-tags">
            <span className="tag">{employee.designation.includes("Designer") ? "Designer" : "Non-Management"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeePopup

