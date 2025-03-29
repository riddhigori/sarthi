"use client"

import { useState } from "react"
import { Trash2, Edit, Download } from "lucide-react"
import "./expenditure.css"

const ExpenditureTable = () => {
  const [data, setData] = useState([
    { id: 1, srNo: "001", particulars: "", expenses: "", amount: "", gst: "", tds: "", net: "" },
    { id: 2, srNo: "002", particulars: "", expenses: "", amount: "", gst: "", tds: "", net: "" },
    { id: 3, srNo: "003", particulars: "", expenses: "", amount: "", gst: "", tds: "", net: "" },
    { id: 4, srNo: "004", particulars: "", expenses: "", amount: "", gst: "", tds: "", net: "" },
  ])

  const [editId, setEditId] = useState(null)

  const handleEdit = (id) => {
    setEditId(id)
  }

  const handleChange = (id, field, value) => {
    if (!/^[0-9]*$/.test(value)) return
    setData(data.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

  const handleDownload = () => {
    const csvContent = [
      ["SR NO", "PARTICULARS", "EXPENSES HEAD", "AMOUNT", "GST", "TDS", "NET"],
      ...data.map((item) => [item.srNo, item.particulars, item.expenses, item.amount, item.gst, item.tds, item.net]),
    ]
      .map((e) => e.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "expenditure.csv"
    link.click()
  }

  const total = data.reduce(
    (acc, item) => {
      acc.expenses += Number(item.expenses) || 0
      acc.amount += Number(item.amount) || 0
      acc.gst += Number(item.gst) || 0
      acc.tds += Number(item.tds) || 0
      acc.net += Number(item.net) || 0
      return acc
    },
    { expenses: 0, amount: 0, gst: 0, tds: 0, net: 0 },
  )

  return (
    <div className="expenditure-container">
      <div className="expenditure-header-section">
        <h2 className="expenditure-main-title">Expenditure</h2>
        <p className="expenditure-subtitle">All the Invoice Data are listed here</p>
        <div className="expenditure-filter-section">
          <select className="expenditure-filter-select">
            <option>Vendor Name</option>
          </select>
          <select className="expenditure-filter-select">
            <option>Sub-expense Head</option>
          </select>
          <input type="text" placeholder="" className="expenditure-filter-input" />
          <button className="expenditure-search-button">Search</button>
        </div>
      </div>

      <div className="expenditure-table-header">
        <h2 className="expenditure-table-title">Expenditure</h2>
        <Download className="expenditure-download-icon" onClick={handleDownload} />
      </div>
      <div className="expenditure-table-container">
        <table className="expenditure-table">
          <thead>
            <tr className="expenditure-table-header-row">
              <th className="expenditure-table-cell">SR NO</th>
              <th className="expenditure-table-cell">PARTICULARS</th>
              <th className="expenditure-table-cell">EXPENSES HEAD</th>
              <th className="expenditure-table-cell">AMOUNT</th>
              <th className="expenditure-table-cell">GST</th>
              <th className="expenditure-table-cell">TDS</th>
              <th className="expenditure-table-cell">NET</th>
              <th className="expenditure-table-cell">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="expenditure-table-row">
                <td className="expenditure-table-cell expenditure-bold-text">{item.srNo}</td>
                <td className="expenditure-table-cell">
                  {editId === item.id ? (
                    <input
                      type="text"
                      value={item.particulars}
                      onChange={(e) => handleChange(item.id, "particulars", e.target.value)}
                      className="expenditure-edit-input"
                    />
                  ) : (
                    item.particulars || "XXX"
                  )}
                </td>
                {["expenses", "amount", "gst", "tds", "net"].map((field) => (
                  <td key={field} className="expenditure-table-cell">
                    {editId === item.id ? (
                      <input
                        type="text"
                        value={item[field]}
                        onChange={(e) => handleChange(item.id, field, e.target.value)}
                        className="expenditure-edit-input"
                      />
                    ) : (
                      item[field] || "XXX"
                    )}
                  </td>
                ))}
                <td className="expenditure-table-cell expenditure-action-cell">
                  <Edit className="expenditure-edit-icon" onClick={() => handleEdit(item.id)} />
                  <Trash2 className="expenditure-delete-icon" onClick={() => handleDelete(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="expenditure-footer-row">
              <td className="expenditure-table-cell" colSpan={2}>
                Total Net Payable
              </td>
              {["expenses", "amount", "gst", "tds", "net"].map((field, index) => (
                <td key={index} className="expenditure-table-cell">
                  {total[field].toFixed(2)}
                </td>
              ))}
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default ExpenditureTable;
