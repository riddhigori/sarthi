"use client"

import { useState, useEffect } from "react"
import "./jobInvoiceForm.css"

const JobInvoiceForm = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    kindlyShareName: "",
    contactPerson: "",
    nameOfTeamLeader: "",
    doYouHaveGstNo: "",
    gstNo: "",
    detailsOfJobPortal: "",
    noOfLoginForNaukri: "",
    noOfJobSlotForLinkedin: "",
    amountPaidWithoutGst: "",
    gstAmount: "",
    totalAmountPaid: "",
    dateOfPayment: "",
    paymentScreenshot: null,
    billDate: "",
    billNo: "",
  })

  // Initialize form with initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        paymentScreenshot: null, // Reset file input
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Calculate total amount when amount or GST changes
  useEffect(() => {
    if (formData.amountPaidWithoutGst && formData.gstAmount) {
      const amount = Number.parseFloat(formData.amountPaidWithoutGst) || 0
      const gst = Number.parseFloat(formData.gstAmount) || 0
      setFormData({
        ...formData,
        totalAmountPaid: (amount + gst).toString(),
      })
    }
  }, [formData.amountPaidWithoutGst, formData.gstAmount, formData])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="job-invoice-form-overlay" onClick={onClose}>
      <div className="job-invoice-form" onClick={(e) => e.stopPropagation()}>
        <div className="job-invoice-form-header">
          <h2>Job Invoice Sheet</h2>
          <button className="job-invoice-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="job-invoice-form-row">
            <div className="job-invoice-form-group">
              <label htmlFor="kindlyShareName">Kindly Share Name (As Per Agreement)</label>
              <input
                type="text"
                id="kindlyShareName"
                name="kindlyShareName"
                value={formData.kindlyShareName}
                onChange={handleChange}
                className="job-invoice-input"
              />
            </div>

            <div className="job-invoice-form-group">
              <label htmlFor="contactPerson">Contact Person</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="job-invoice-input"
              />
            </div>
          </div>

          <div className="job-invoice-form-row">
            <div className="job-invoice-form-group">
              <label htmlFor="nameOfTeamLeader">Name of Team Leader</label>
              <input
                type="text"
                id="nameOfTeamLeader"
                name="nameOfTeamLeader"
                value={formData.nameOfTeamLeader}
                onChange={handleChange}
                className="job-invoice-input"
              />
            </div>

            <div className="job-invoice-form-group">
              <label htmlFor="doYouHaveGstNo">Do You Have GST No</label>
              <select
                id="doYouHaveGstNo"
                name="doYouHaveGstNo"
                value={formData.doYouHaveGstNo}
                onChange={handleChange}
                className="job-invoice-select"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="job-invoice-form-group">
              <label htmlFor="gstNo">Please Mention Your GST No If Any</label>
              <input
                type="text"
                id="gstNo"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
                className="job-invoice-input"
              />
            </div>
          </div>

          <div className="job-invoice-form-row">
            <div className="job-invoice-form-group">
              <label htmlFor="detailsOfJobPortal">Details Of Job Portal Taken (As Per Planning Sheet)</label>
              <input
                type="text"
                id="detailsOfJobPortal"
                name="detailsOfJobPortal"
                value={formData.detailsOfJobPortal}
                onChange={handleChange}
                className="job-invoice-input"
              />
            </div>

            <div className="job-invoice-form-group">
              <label htmlFor="noOfLoginForNaukri">No Of Login For Naukri</label>
              <input
                type="text"
                id="noOfLoginForNaukri"
                name="noOfLoginForNaukri"
                value={formData.noOfLoginForNaukri}
                onChange={handleChange}
                className="job-invoice-input"
              />
            </div>
          </div>

          <div className="job-invoice-form-row">
            <div className="job-invoice-form-group">
              <label htmlFor="noOfJobSlotForLinkedin">No Of Job Slot For LinkedIn</label>
              <input
                type="text"
                id="noOfJobSlotForLinkedin"
                name="noOfJobSlotForLinkedin"
                value={formData.noOfJobSlotForLinkedin}
                onChange={handleChange}
                className="job-invoice-input"
              />
            </div>

            <div className="job-invoice-form-group">
              <label htmlFor="amountPaidWithoutGst">Amount Paid - Without GST</label>
              <input
                type="number"
                id="amountPaidWithoutGst"
                name="amountPaidWithoutGst"
                value={formData.amountPaidWithoutGst}
                onChange={handleChange}
                className="job-invoice-input"
              />
            </div>
          </div>

          <div className="job-invoice-form-row">
            <div className="job-invoice-form-group">
              <label htmlFor="gstAmount">GST Amount</label>
              <input
                type="number"
                id="gstAmount"
                name="gstAmount"
                value={formData.gstAmount}
                onChange={handleChange}
                className="job-invoice-input"
              />
            </div>

            <div className="job-invoice-form-group">
              <label htmlFor="totalAmountPaid">Total Amount Paid</label>
              <input
                type="number"
                id="totalAmountPaid"
                name="totalAmountPaid"
                value={formData.totalAmountPaid}
                onChange={handleChange}
                className="job-invoice-input"
                readOnly
              />
            </div>

            <div className="job-invoice-form-group">
              <label htmlFor="dateOfPayment">Date Of Payment</label>
              <input
                type="date"
                id="dateOfPayment"
                name="dateOfPayment"
                value={formData.dateOfPayment}
                onChange={handleChange}
                className="job-invoice-date-input"
              />
            </div>
          </div>

          <div className="job-invoice-form-row">
            <div className="job-invoice-form-group">
              <label htmlFor="paymentScreenshot">Payment Screenshot</label>
              <input
                type="file"
                id="paymentScreenshot"
                name="paymentScreenshot"
                onChange={handleChange}
                className="job-invoice-file-input"
              />
              <div className="job-invoice-file-info">No File Chosen (Max 5 MB)</div>
            </div>

            <div className="job-invoice-form-group">
              <label htmlFor="billDate">Bill Date</label>
              <input
                type="date"
                id="billDate"
                name="billDate"
                value={formData.billDate}
                onChange={handleChange}
                className="job-invoice-date-input"
              />
            </div>

            <div className="job-invoice-form-group">
              <label htmlFor="billNo">Bill No.</label>
              <input
                type="text"
                id="billNo"
                name="billNo"
                value={formData.billNo}
                onChange={handleChange}
                className="job-invoice-input"
              />
            </div>
          </div>

          <div className="job-invoice-form-actions">
            <button type="submit" className="job-invoice-save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobInvoiceForm

