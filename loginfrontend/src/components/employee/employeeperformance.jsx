"use client"
import "./EmployeePerformance.css"

const EmployeePerformance = ({ employee, onClose }) => {
  // Mock performance data
  const performanceData = {
    month: "March",
    financialYear: "2024-2025",
    revenueGenerated: "₹120,000",
    clientsAcquired: "3",
    candidatesPlaced: "5",
    targetRevenue: "₹100,000",
    achievementPercentage: "120%",
    incentiveEarned: "₹12,000",
    performanceRating: "Good",
  }

  return (
    <div className="performance-overlay">
      <div className="performance-container">
        <div className="performance-header">
          <button className="back-btn" onClick={onClose}>
            &lt; Back to Grid
          </button>
          <button className="edit-btn">Edit</button>
        </div>

        <div className="performance-content">
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
            </div>
          </div>

          <div className="performance-rating">
            <div className={`rating-badge ${performanceData.performanceRating.toLowerCase()}`}>
              {performanceData.performanceRating}
            </div>
          </div>

          <div className="performance-metrics">
            <div className="metric-row">
              <div className="metric-label">Month:</div>
              <div className="metric-value">{performanceData.month}</div>
            </div>

            <div className="metric-row">
              <div className="metric-label">Financial year:</div>
              <div className="metric-value">{performanceData.financialYear}</div>
            </div>

            <div className="metric-row">
              <div className="metric-label">Revenue Generated:</div>
              <div className="metric-value">{performanceData.revenueGenerated}</div>
            </div>

            <div className="metric-row">
              <div className="metric-label">No of Clients Acquired:</div>
              <div className="metric-value">{performanceData.clientsAcquired}</div>
            </div>

            <div className="metric-row">
              <div className="metric-label">No. of candidate placed:</div>
              <div className="metric-value">{performanceData.candidatesPlaced}</div>
            </div>

            <div className="metric-row">
              <div className="metric-label">Target revenue ($):</div>
              <div className="metric-value">{performanceData.targetRevenue}</div>
            </div>

            <div className="metric-row">
              <div className="metric-label">Achievement %:</div>
              <div className="metric-value">{performanceData.achievementPercentage}</div>
            </div>

            <div className="metric-row">
              <div className="metric-label">Incentive earned ($):</div>
              <div className="metric-value">{performanceData.incentiveEarned}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeePerformance

