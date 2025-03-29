"use client"

import { useState } from "react"
//import { saveAs } from "file-saver"
//import * as XLSX from "xlsx"
import { Edit2, Download, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import "./salarytable.css";

const SalaryTable = () => {
  const [viewType, setViewType] = useState("row")
  const [editingId, setEditingId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [data, setData] = useState([
    {
      id: 1,
      component: "Basic Salary",
      eligibility: "Permanent Employees",
      limit: "No Limit",
      period: "MONTHLY",
      remarks: "Mandatory for all employees.",
    },
    {
      id: 2,
      component: "House Rent Allowance",
      eligibility: "Permanent Employees",
      limit: "40% of Basic",
      period: "MONTHLY",
      remarks: "Tax exempt under certain conditions.",
    },
    {
      id: 3,
      component: "Medical Allowance",
      eligibility: "Permanent Employees",
      limit: "1000 per month",
      period: "MONTHLY",
      remarks: "Taxable if exceeding the limit.",
    },
    {
      id: 4,
      component: "Conveyance",
      eligibility: "Permanent Employees",
      limit: "1200 per month",
      period: "MONTHLY",
      remarks: "Taxable if exceeding the limit.",
    },
  ])

  const [newRow, setNewRow] = useState({
    component: "",
    eligibility: "",
    limit: "",
    period: "MONTHLY",
    remarks: "",
  })

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
    setDeleteConfirmId(null)
  }

  const handleDownload = (row) => {
    const csvContent = Object.values(row).join(",")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `salary-data-${row.component}.csv`;

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleAddRow = () => {
    const newId = Math.max(...data.map((item) => item.id)) + 1
    setData([...data, { id: newId, ...newRow }])
    setNewRow({
      component: "",
      eligibility: "",
      limit: "",
      period: "MONTHLY",
      remarks: "",
    })
  }

  const handleEditSave = () => {
    setEditingId(null)
  }

  return (
    <div className="salarytable-container">
      <div className="salarytable-header">
        <h2>Salary Data</h2>
        <div className="salarytable-header-buttons">
        <button className="salarytable-download-btn" onClick={handleDownload}>
            <i className="fas fa-download"></i> Download
          </button>
        <button className="salarytable-add-new-btn" onClick={() => setEditingId(0)}>
          <Plus className="icon" />
          Add New
        </button>
        </div>
      </div>

      <div className="salarytable-table-container">
        <table>
          <thead>
            <tr>
              <th>HEAD/COMPONENT</th>
              <th>ELIGIBILITY</th>
              <th>LIMIT</th>
              <th>PERIOD</th>
              <th>REMARKS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="salarytable-component">{item.component}</td>
                <td>{item.eligibility}</td>
                <td>{item.limit}</td>
                <td>{item.period}</td>
                <td>{item.remarks}</td>
                <td>
                  <div className="salarytable-actions">
                    <button onClick={() => setEditingId(item.id)}>
                      <Edit2 className="icon" />
                    </button>
                    <button onClick={() => setDeleteConfirmId(item.id)}>
                      <Trash2 className="icon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SalaryTable;
