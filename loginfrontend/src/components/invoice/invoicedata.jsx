"use client"

import { useState, useEffect } from "react"
import CreditNoteForm from "./creditnoteform"
import PaymentResForm1 from "./paymentResform1"
import OutstandingForm from "./outstandingform"
import RevisedForm from "./revisedform"
import "./invoicedata.css"
// Add the JobInvoiceForm component import at the top
import JobInvoiceForm from "./jobInvoiceForm"

const InvoiceData = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [fiscalYear, setFiscalYear] = useState("FY 2022-23")
  const [month, setMonth] = useState("")
  const [activeTab, setActiveTab] = useState("invoice")
  const [showCreditNoteForm, setShowCreditNoteForm] = useState(false)
  const [showPaymentForm1, setShowPaymentForm1] = useState(false)
  const [showOutstandingForm, setShowOutstandingForm] = useState(false)
  const [showRevisedForm, setShowRevisedForm] = useState(false)
  const [activeInfoRow, setActiveInfoRow] = useState(null)

  // Add these state variables inside the InvoiceData component
  const [jobInvoiceData, setJobInvoiceData] = useState([])
  const [showJobInvoiceForm, setShowJobInvoiceForm] = useState(false)
  const [activeJobInvoiceRow, setActiveJobInvoiceRow] = useState(null)
  const [jobSearchTerm, setJobSearchTerm] = useState("")


  const App = () => {
    const getForm = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/form");
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }};
  
    useEffect(() => {
      // getForm();
    }, []);

  // Update the invoiceData state to include new fields for calculations
  const [invoiceData, setInvoiceData] = useState([
    {
      id: 1,
      timestamp: new Date().toLocaleString(),
      emailAddress: "example1@company.com",
      franchiseName: "Franchise A",
      contactPersonName: "John Doe",
      payingGst: "Yes",
      isProprietor: "No",
      teamLeader: "Jane Smith",
      companyName: "ABC Corp",
      companyAddress: "123 Main St",
      companyCity: "Mumbai",
      pinCode: "400001",
      state: "Maharashtra",
      isFromMaharashtra: "Yes",
      contactPerson: "John Doe",
      designation: "Manager",
      contactNumber: "9876543210",
      contactEmail: "john@abccorp.com",
      gstNo: "GST123456789",
      industry: "IT",
      subIndustry: "Software",
      serviceCharge: "5",
      creditPeriod: "30 days",
      replacementPeriod: "15 days",
      dueDate: "2025-04-15",
      info: "CN",
      // Credit Note specific fields
      creditDate: "",
      creditNoteNo: "",
      // Payment Received specific fields
      dateReceived: "",
      amountReceived: "",
      tdsBackend: "",
      // Revised specific fields
      paidOnDate: "",
      soaNo: "",
      addDebitCorrection: false,
      // Outstanding specific fields
      billDate: "2025-03-15",
      billNumber: "BILL-2025-001",
      // GST Paid status
      gstPaidStatus: "Unpaid",
      // Additional fields for calculations
      Nameofcandidate: "John Smith",
      Mobilenumber: "9876543210",
      Emailofcandidate: "john.smith@example.com",
      Postofcandidate: "Software Developer",
      yearofexp: "5",
      Sourceofresume: "LinkedIn",
      dateofjoining: "2025-04-01",
      annualsalaryoffered: "1200000",
      Nameofbd: "Sarah Johnson",
      billdate: "2025-03-15",
      billnumber: "INV-2025-001",
      servicecharges: "",
      CGST: "",
      SGST: "",
      IGST: "",
      totalGST: "",
      TOTALBILLAMT: "",
      Duedate: "",
      franchiseeShare: "",
      franchiseeGST: "",
    }
  ])

  // Add a useEffect to calculate all the formulas when invoiceData changes
  useEffect(() => {
    const updatedData = invoiceData.map((invoice) => {
      // Calculate service charges
      let calculatedServiceCharges = ""
      if (Number.parseFloat(invoice.serviceCharge) > 1 && invoice.annualsalaryoffered) {
        calculatedServiceCharges = Math.round(
          (Number.parseFloat(invoice.annualsalaryoffered) * Number.parseFloat(invoice.serviceCharge)) / 100,
        ).toString()
      }

      // Calculate CGST
      let calculatedCGST = ""
      if (invoice.isFromMaharashtra === "Yes" && calculatedServiceCharges) {
        calculatedCGST = Math.round(Number.parseFloat(calculatedServiceCharges) * 0.09).toString()
      }

      // Calculate SGST (same as CGST)
      const calculatedSGST = calculatedCGST

      // Calculate IGST
      let calculatedIGST = ""
      if (invoice.isFromMaharashtra === "No" && calculatedServiceCharges) {
        calculatedIGST = Math.round(Number.parseFloat(calculatedServiceCharges) * 0.18).toString()
      }

      // Calculate Total GST
      let calculatedTotalGST = ""
      if (calculatedCGST && calculatedSGST) {
        calculatedTotalGST = (Number.parseFloat(calculatedCGST) + Number.parseFloat(calculatedSGST)).toString()
      } else if (calculatedIGST) {
        calculatedTotalGST = calculatedIGST
      }

      // Calculate Total Bill Amount
      let calculatedTotalBillAmt = ""
      if (invoice.teamLeader && calculatedServiceCharges) {
        calculatedTotalBillAmt = (
          Number.parseFloat(calculatedServiceCharges) + (calculatedTotalGST ? Number.parseFloat(calculatedTotalGST) : 0)
        ).toString()
      }

      // Calculate Due Date
      let calculatedDueDate = ""
      if (invoice.creditPeriod && Number.parseInt(invoice.creditPeriod) > 29 && invoice.billdate) {
        const billDate = new Date(invoice.billdate)
        const creditPeriodDays = Number.parseInt(invoice.creditPeriod)
        billDate.setDate(billDate.getDate() + creditPeriodDays)
        calculatedDueDate = billDate.toISOString().split("T")[0]
      }

      // Calculate TDS
      let calculatedTDS = invoice.tdsBackend
      if ((invoice.info === "R" || invoice.info === "CR") && calculatedTotalBillAmt && invoice.amountReceived) {
        calculatedTDS = Math.round(
          Number.parseFloat(calculatedTotalBillAmt) - Number.parseFloat(invoice.amountReceived),
        ).toString()
      }

      // Calculate Franchisee Share
      let calculatedFranchiseeShare = ""
      if (calculatedServiceCharges) {
        if (invoice.info === "R") {
          calculatedFranchiseeShare = Math.round(Number.parseFloat(calculatedServiceCharges) * 0.75).toString()
        } else if (invoice.info === "PP") {
          calculatedFranchiseeShare = Math.round(Number.parseFloat(calculatedServiceCharges) * 0.375).toString()
        } else if (["C", "AD", "CN", "L"].includes(invoice.info)) {
          calculatedFranchiseeShare = "0"
        } else if (invoice.info === "O") {
          calculatedFranchiseeShare = Math.round(Number.parseFloat(calculatedServiceCharges) * 0.75).toString()
        }
      }

      // Calculate Franchisee GST
      let calculatedFranchiseeGST = ""
      if (calculatedFranchiseeShare) {
        if (invoice.payingGst === "Yes") {
          calculatedFranchiseeGST = Math.round(Number.parseFloat(calculatedFranchiseeShare) * 0.18).toString()
        } else {
          calculatedFranchiseeGST = "0"
        }
      }

      return {
        ...invoice,
        servicecharges: calculatedServiceCharges,
        CGST: calculatedCGST,
        SGST: calculatedSGST,
        IGST: calculatedIGST,
        totalGST: calculatedTotalGST,
        TOTALBILLAMT: calculatedTotalBillAmt,
        Duedate: calculatedDueDate,
        tdsBackend: calculatedTDS,
        franchiseeShare: calculatedFranchiseeShare,
        franchiseeGST: calculatedFranchiseeGST,
      }
    })

    setInvoiceData(updatedData)
  }, [])

  // Handle info dropdown change
  const handleInfoChange = (id, value) => {
    const updatedData = invoiceData.map((item) => (item.id === id ? { ...item, info: value } : item))
    setInvoiceData(updatedData)
  }

  // Handle GST paid status change
  const handleGstPaidStatusChange = (id, value) => {
    const updatedData = invoiceData.map((item) => (item.id === id ? { ...item, gstPaidStatus: value } : item))
    setInvoiceData(updatedData)
  }

  // Open appropriate form based on info type
  const openInfoForm = (id, infoType) => {
    setActiveInfoRow(id)

    // Close all forms first
    setShowCreditNoteForm(false)
    setShowPaymentForm1(false)
    setShowOutstandingForm(false)
    setShowRevisedForm(false)

    // Open the appropriate form
    if (infoType === "CN" || infoType === "RV" || infoType === "LEGAL-CN") {
      setShowCreditNoteForm(true)
    } else if (infoType === "PR") {
      setShowPaymentForm1(true)
    } else if (infoType === "O") {
      setShowOutstandingForm(true)
    } else if (infoType === "R") {
      setShowRevisedForm(true)
    }
  }

  // Close all forms
  const closeAllForms = () => {
    setShowCreditNoteForm(false)
    setShowPaymentForm1(false)
    setShowOutstandingForm(false)
    setShowRevisedForm(false)
    setActiveInfoRow(null)
  }

  // Save credit note data
  const saveCreditNoteData = (creditData) => {
    const updatedData = invoiceData.map((item) =>
      item.id === activeInfoRow
        ? {
            ...item,
            creditDate: creditData.creditDate,
            creditNoteNo: creditData.creditNoteNo,
          }
        : item,
    )
    setInvoiceData(updatedData)
    closeAllForms()
  }

  // Save payment received data (PR form)
  const savePaymentData1 = (paymentData) => {
    const updatedData = invoiceData.map((item) =>
      item.id === activeInfoRow
        ? {
            ...item,
            dateReceived: paymentData.dateReceived,
            amountReceived: paymentData.amountReceived,
            tdsBackend: paymentData.tdsBackend,
          }
        : item,
    )
    setInvoiceData(updatedData)
    closeAllForms()
  }

  // Save revised data (R form)
  const saveRevisedData = (revisedData) => {
    const updatedData = invoiceData.map((item) =>
      item.id === activeInfoRow
        ? {
            ...item,
            paidOnDate: revisedData.paidOnDate,
            soaNo: revisedData.soaNo,
            addDebitCorrection: revisedData.addDebitCorrection,
          }
        : item,
    )
    setInvoiceData(updatedData)
    closeAllForms()
  }

  // Save outstanding data
  const saveOutstandingData = (outstandingData) => {
    const updatedData = invoiceData.map((item) =>
      item.id === activeInfoRow
        ? {
            ...item,
            billDate: outstandingData.billDate,
            billNumber: outstandingData.billNumber,
          }
        : item,
    )
    setInvoiceData(updatedData)
    closeAllForms()
  }

  // Delete invoice row
  const deleteInvoiceRow = (id) => {
    setInvoiceData(invoiceData.filter((item) => item.id !== id))
  }

  // Update the search functionality
  const filteredInvoiceData = invoiceData.filter((invoice) => {
    const searchTermLower = searchTerm.toLowerCase()
    return (
      invoice.franchiseName?.toLowerCase().includes(searchTermLower) ||
      invoice.companyName?.toLowerCase().includes(searchTermLower) ||
      invoice.contactPersonName?.toLowerCase().includes(searchTermLower) ||
      invoice.contactEmail?.toLowerCase().includes(searchTermLower) ||
      invoice.gstNo?.toLowerCase().includes(searchTermLower) ||
      invoice.billnumber?.toLowerCase().includes(searchTermLower) ||
      invoice.Nameofcandidate?.toLowerCase().includes(searchTermLower)
    )
  })

  // Add these functions inside the InvoiceData component before the return statement

  // Open job invoice form for adding new data
  const openJobInvoiceForm = () => {
    setActiveJobInvoiceRow(null)
    setShowJobInvoiceForm(true)
  }

  // Open job invoice form for editing existing data
  const editJobInvoiceData = (id) => {
    setActiveJobInvoiceRow(id)
    setShowJobInvoiceForm(true)
  }

  // Save job invoice data
  const saveJobInvoiceData = (jobData) => {
    if (activeJobInvoiceRow === null) {
      // Add new job invoice data
      setJobInvoiceData([
        ...jobInvoiceData,
        {
          id: jobInvoiceData.length > 0 ? Math.max(...jobInvoiceData.map(item => item.id)) + 1 : 1,
          ...jobData
        }
      ])
    } else {
      // Update existing job invoice data
      setJobInvoiceData(
        jobInvoiceData.map(item => 
          item.id === activeJobInvoiceRow ? { ...item, ...jobData } : item
        )
      )
    }
    setShowJobInvoiceForm(false)
    setActiveJobInvoiceRow(null)
  }

  // Delete job invoice data
  const deleteJobInvoiceData = (id) => {
    setJobInvoiceData(jobInvoiceData.filter(item => item.id !== id))
  }

  // Filter job invoice data based on search term
  const filteredJobInvoiceData = jobInvoiceData.filter(invoice => {
    const searchTermLower = jobSearchTerm.toLowerCase()
    return (
      invoice.kindlyShareName?.toLowerCase().includes(searchTermLower) ||
      invoice.contactPerson?.toLowerCase().includes(searchTermLower) ||
      invoice.nameOfTeamLeader?.toLowerCase().includes(searchTermLower) ||
      invoice.gstNo?.toLowerCase().includes(searchTermLower) ||
      invoice.billNo?.toLowerCase().includes(searchTermLower)
    )
  })

  // Update the return statement to include the job invoice data table
  // Replace the existing return statement with this updated one that includes the job invoice data table

  // Modify the content inside the invoice-data-container div to include the job invoice data table
  // Find the line with <div className="invoice-data-container"> and replace everything inside it with:

  // Update the return statement to include the job invoice data table
  // Find the line with <div className="invoice-data-container"> and replace the content inside it with:
  return (
    <div className="invoice-container">
      <h1 className="invoice-title">Invoice Data</h1>
      <p className="invoice-subtitle">All the Invoice Data are listed here</p>

      <div className="invoice-search-filter-container">
        <div className="invoice-search-container">
          <i className="invoice-search-icon">🔍</i>
          <input
            type="text"
            placeholder="Search"
            value={activeTab === "invoice" ? searchTerm : jobSearchTerm}
            onChange={(e) => activeTab === "invoice" ? setSearchTerm(e.target.value) : setJobSearchTerm(e.target.value)}
            className="invoice-search-input"
          />
        </div>

        <div className="invoice-filters">
          <select className="invoice-filter-select" value={fiscalYear} onChange={(e) => setFiscalYear(e.target.value)}>
            <option value="FY 2022-23">FY 2022-23</option>
            <option value="FY 2023-24">FY 2023-24</option>
            <option value="FY 2024-25">FY 2024-25</option>
          </select>

          <select className="invoice-filter-select" value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>

      <div className="invoice-tabs">
        <button
          className={`invoice-tab ${activeTab === "invoice" ? "active" : ""}`}
          onClick={() => setActiveTab("invoice")}
        >
          Invoice Data
        </button>
        <button className={`invoice-tab ${activeTab === "job" ? "active" : ""}`} onClick={() => setActiveTab("job")}>
          Job invoice Data
        </button>
      </div>

      <div className="invoice-data-container">
        {activeTab === "invoice" ? (
          <>
            <div className="invoice-header">
              <h2 className="invoice-section-title">Invoice Data</h2>
              <button className="invoice-download-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
                  <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z"></path>
                </svg>
              </button>
            </div>

            <div className="invoice-table-container">
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>TIMESTAMP</th>
                    <th>FRANCHISE NAME</th>
                    <th>CONTACT PERSON NAME</th>
                    <th>Are you PAYING GST</th>
                    <th>PROPRIETOR (1% TDS)</th>
                    <th>TEAM LEADER</th>
                    <th>COMPANY NAME</th>
                    <th>COMPANY ADDRESS</th>
                    <th>COMPANY CITY</th>
                    <th>PIN CODE</th>
                    <th>STATE</th>
                    <th>FROM MAHARASHTRA</th>
                    <th>CONTACT PERSON</th>
                    <th>DESIGNATION</th>
                    <th>CONTACT NUMBER</th>
                    <th>CONTACT Person EMAIL</th>
                    <th>GST NO.</th>
                    <th>INDUSTRY</th>
                    <th>SUB-INDUSTRY</th>
                    <th>SERVICE CHARGE</th>
                    <th>CREDIT PERIOD</th>
                    <th>REPLACEMENT PERIOD</th>
                  
                  <th>Name of candidate</th>
                  <th>Mobile number</th>
                  <th>Email of candidate</th>
                  <th>Post of candidate</th>
                  <th>year of exp</th>
                  <th>Source of resume</th>
                  <th>date of joining</th>
                  <th>annual salary offered</th>
                  <th>Name of bd</th>
                  <th>bill date</th>
                  <th>bill number</th>
                  <th>service charges</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>IGST</th>
                  <th>TOTAL GST</th>
                  <th>TOTAL BILL AMT</th>
                  <th>Due date</th>
                  <th>INFO</th>

                  {/* Credit Note specific columns */}
                  <th>CREDIT DATE</th>
                  <th>CREDIT NOTE NO.</th>

                  {/* Payment Received specific columns */}
                  <th>DATE of RECEIVED</th>
                  <th>AMOUNT RECEIVED</th>
                  <th>TDS</th>
                  <th>FRANCHISEE SHARE</th>
                  <th>FRANCHISEE GST</th>

                  {/* Revised specific columns */}
                  <th>PAID ON DATE</th>
                  <th>SOA NO.</th>
                  <th>DEBIT CORRECTION</th>

                  {/* Outstanding specific columns */}
                  <th>BILL DATE</th>
                  <th>BILL NUMBER</th>

                  {/* GST Paid Status */}
                  <th>GST PAID OR NOT</th>

                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoiceData.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.timestamp}</td>
                    <td>{invoice.franchiseName}</td>
                    <td>{invoice.contactPersonName}</td>
                    <td>{invoice.payingGst}</td>
                    <td>{invoice.isProprietor}</td>
                    <td>{invoice.teamLeader}</td>
                    <td>{invoice.companyName}</td>
                    <td>{invoice.companyAddress}</td>
                    <td>{invoice.companyCity}</td>
                    <td>{invoice.pinCode}</td>
                    <td>{invoice.state}</td>
                    <td>{invoice.isFromMaharashtra}</td>
                    <td>{invoice.contactPerson}</td>
                    <td>{invoice.designation}</td>
                    <td>{invoice.contactNumber}</td>
                    <td>{invoice.contactEmail}</td>
                    <td>{invoice.gstNo}</td>
                    <td>{invoice.industry}</td>
                    <td>{invoice.subIndustry}</td>
                    <td>{invoice.serviceCharge}</td>
                    <td>{invoice.creditPeriod}</td>
                    <td>{invoice.replacementPeriod}</td>
                    <td>{invoice.Nameofcandidate}</td>
                    <td>{invoice.Mobilenumber}</td>
                    <td>{invoice.Emailofcandidate}</td>
                    <td>{invoice.Postofcandidate}</td>
                    <td>{invoice.yearofexp}</td>
                    <td>{invoice.Sourceofresume}</td>
                    <td>{invoice.dateofjoining}</td>
                    <td>{invoice.annualsalaryoffered}</td>
                    <td>{invoice.Nameofbd}</td>
                    <td>{invoice.billdate}</td>
                    <td>{invoice.billnumber}</td>
                    <td>{invoice.servicecharges}</td>
                    <td>{invoice.CGST}</td>
                    <td>{invoice.SGST}</td>
                    <td>{invoice.IGST}</td>
                    <td>{invoice.totalGST}</td>
                    <td>{invoice.TOTALBILLAMT}</td>
                    <td>{invoice.Duedate}</td>
                    <td>
                      <select
                        className="invoice-info-select"
                        value={invoice.info}
                        onChange={(e) => handleInfoChange(invoice.id, e.target.value)}
                        onClick={() => openInfoForm(invoice.id, invoice.info)}
                      >
                        <option value="CN">CN</option>
                        <option value="PR">PR</option>
                        <option value="R">R</option>
                        <option value="O">O</option>
                        <option value="PP">PP</option>
                        <option value="RV">RV</option>
                        <option value="LEGAL-CN">LEGAL-CN</option>
                        <option value="LEGAL">LEGAL</option>
                      </select>
                    </td>

                    {/* Credit Note specific data */}
                    <td>{invoice.creditDate}</td>
                    <td>{invoice.creditNoteNo}</td>

                    {/* Payment Received specific data */}
                    <td>{invoice.dateReceived}</td>
                    <td>{invoice.amountReceived}</td>
                    <td>{invoice.tdsBackend}</td>
                    <td>{invoice.franchiseeShare}</td>
                    <td>{invoice.franchiseeGST}</td>

                    {/* Revised specific data */}
                    <td>{invoice.paidOnDate}</td>
                    <td>{invoice.soaNo}</td>
                    <td>{invoice.addDebitCorrection ? "Yes" : "No"}</td>

                    {/* Outstanding specific data */}
                    <td>{invoice.billDate}</td>
                    <td>{invoice.billNumber}</td>

                    {/* GST Paid Status */}
                    <td>
                      <select
                        className="invoice-gst-status-select"
                        value={invoice.gstPaidStatus}
                        onChange={(e) => handleGstPaidStatusChange(invoice.id, e.target.value)}
                      >
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                      </select>
                    </td>

                    <td className="invoice-action-buttons">
                      <button className="invoice-delete-btn" onClick={() => deleteInvoiceRow(invoice.id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="invoice-header">
            <h2 className="invoice-section-title">Job Invoice Data</h2>
            <button className="invoice-add-btn" onClick={openJobInvoiceForm}>
              Add Job Invoice Data
            </button>
          </div>

          <div className="invoice-table-container">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>KINDLY SHARE NAME</th>
                  <th>CONTACT PERSON</th>
                  <th>NAME OF TEAM LEADER</th>
                  <th>DO YOU HAVE GST NO</th>
                  <th>GST NO</th>
                  <th>DETAILS OF JOB PORTAL</th>
                  <th>NO OF LOGIN FOR NAUKRI</th>
                  <th>NO OF JOB SLOT FOR LINKEDIN</th>
                  <th>AMOUNT PAID (WITHOUT GST)</th>
                  <th>GST AMOUNT</th>
                  <th>TOTAL AMOUNT PAID</th>
                  <th>DATE OF PAYMENT</th>
                  <th>BILL DATE</th>
                  <th>BILL NO</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobInvoiceData.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.kindlyShareName}</td>
                    <td>{invoice.contactPerson}</td>
                    <td>{invoice.nameOfTeamLeader}</td>
                    <td>{invoice.doYouHaveGstNo}</td>
                    <td>{invoice.gstNo}</td>
                    <td>{invoice.detailsOfJobPortal}</td>
                    <td>{invoice.noOfLoginForNaukri}</td>
                    <td>{invoice.noOfJobSlotForLinkedin}</td>
                    <td>{invoice.amountPaidWithoutGst}</td>
                    <td>{invoice.gstAmount}</td>
                    <td>{invoice.totalAmountPaid}</td>
                    <td>{invoice.dateOfPayment}</td>
                    <td>{invoice.billDate}</td>
                    <td>{invoice.billNo}</td>
                    <td className="invoice-action-buttons">
                      <button className="invoice-edit-btn" onClick={() => editJobInvoiceData(invoice.id)}>
                        ✏️
                      </button>
                      <button className="invoice-delete-btn" onClick={() => deleteJobInvoiceData(invoice.id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="invoice-pagination">
        <button className="invoice-pagination-btn">◀</button>
        <div className="invoice-pagination-indicator"></div>
        <button className="invoice-pagination-btn">▶</button>
      </div>
    </div>

    {/* Credit Note Form */}
    {showCreditNoteForm && <CreditNoteForm onClose={closeAllForms} onSave={saveCreditNoteData} />}

    {/* Payment Received Form (PR) */}
    {showPaymentForm1 && <PaymentResForm1 onClose={closeAllForms} onSave={savePaymentData1} />}

    {/* Revised Form (R) */}
    {showRevisedForm && <RevisedForm onClose={closeAllForms} onSave={saveRevisedData} />}

    {/* Outstanding Form (O) */}
    {showOutstandingForm && <OutstandingForm onClose={closeAllForms} onSave={saveOutstandingData} />}

    {/* Job Invoice Form */}
    {showJobInvoiceForm && (
      <JobInvoiceForm 
        onClose={() => setShowJobInvoiceForm(false)} 
        onSave={saveJobInvoiceData} 
        initialData={activeJobInvoiceRow !== null ? jobInvoiceData.find(item => item.id === activeJobInvoiceRow) : null}
      />
    )}
  </div>
)
}
export default InvoiceData

// "use client"

// import { useState, useEffect } from "react"
// import CreditNoteForm from "./creditnoteform"
// import PaymentResForm1 from "./paymentResform1"
// import OutstandingForm from "./outstandingform"
// import RevisedForm from "./revisedform"
// import "./invoicedata.css"
// // Add the JobInvoiceForm component import at the top
// import JobInvoiceForm from "./jobInvoiceForm"

// const InvoiceData = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [fiscalYear, setFiscalYear] = useState("FY 2022-23")
//   const [month, setMonth] = useState("")
//   const [activeTab, setActiveTab] = useState("invoice")
//   const [showCreditNoteForm, setShowCreditNoteForm] = useState(false)
//   const [showPaymentForm1, setShowPaymentForm1] = useState(false)
//   const [showOutstandingForm, setShowOutstandingForm] = useState(false)
//   const [showRevisedForm, setShowRevisedForm] = useState(false)
//   const [activeInfoRow, setActiveInfoRow] = useState(null)

//   // Add these state variables inside the InvoiceData component
//   const [jobInvoiceData, setJobInvoiceData] = useState([])
//   const [showJobInvoiceForm, setShowJobInvoiceForm] = useState(false)
//   const [activeJobInvoiceRow, setActiveJobInvoiceRow] = useState(null)
//   const [jobSearchTerm, setJobSearchTerm] = useState("")

//   // Update the invoiceData state to include new fields for calculations
//   const [invoiceData, setInvoiceData] = useState([
//     {
//       id: 1,
//       timestamp: new Date().toLocaleString(),
//       emailId: "example1@company.com",
//       franchiseeName: "Franchise A",
//       contactPersonName: "John Doe",
//       payingGst: "Yes",
//       isProprietor: "No",
//       teamLeaderName: "Jane Smith",
//       companyName: "ABC Corp",
//       addressLine1: "123 Main St",
//       companyCity: "Mumbai",
//       pinCode: "400001",
//       state: "Maharashtra",
//       isFromMaharashtra: "Yes",
//       contactPerson: "John Doe",
//       designation: "Manager",
//       mobileNo: "9876543210",
//       emailId: "john@abccorp.com",
//       gstNo: "GST123456789",
//       industry: "IT",
//       subIndustry: "Software",
//       placementFees: "5",
//       creditPeriod: "30 days",
//       replacementPeriod: "15 days",
//       dueDate: "2025-04-15",
//       info: "CN",
//       // Credit Note specific fields
//       creditDate: "",
//       creditNoteNo: "",
//       reasonForCreditNote: "",
//       // Payment Received specific fields
//       dateReceived: "",
//       amountReceived: "",
//       tdsBackend: "",
//       // Revised specific fields
//       paidOnDate: "",
//       soaNo: "",
//       addDebitCorrection: false,
//       revisionDetails: "",
//       // Outstanding specific fields
//       billDate: "2025-03-15",
//       billNo: "BILL-2025-001",
//       // GST Paid status
//       gstPaidStatus: "Unpaid",
//       // Additional fields for calculations
//       candidateName: "John Smith",
//       mobileNumber: "9876543210",
//       emailId: "john.smith@example.com",
//       positionname: "Software Developer",
//       yearofexp: "5",
//       sourceOfCV: "LinkedIn",
//       dateOfJoining: "2025-04-01",
//       salary: "1200000",
//       bdMemberName: "Sarah Johnson",
//       billdate: "2025-03-15",
//       billNo: "INV-2025-001",
//       servicecharges: "",
//       CGST: "",
//       SGST: "",
//       IGST: "",
//       totalGST: "",
//       TOTALBILLAMT: "",
//       Duedate: "",
//       franchiseeShare: "",
//       franchiseeGST: "",
//       website: "",
//       hrExecutiveName: "",
//       enquiryStatus: "",
//       clientStatus: "",
//       dateOfAllocation: "",
//       dateOfReallocation: "",
//       newTeamLeader: "",
//       nameOfFranchisee: "",
//       dateOfBirth: "",
//       hireFor: "",
//       salaryOffer: "",
//     },
//     {
//       id: 2,
//       timestamp: new Date().toLocaleString(),
//       emailId: "example2@company.com",
//       franchiseeName: "Franchise B",
//       contactPersonName: "Alice Brown",
//       payingGst: "Yes",
//       isProprietor: "Yes",
//       teamLeaderName: "Bob Johnson",
//       companyName: "XYZ Ltd",
//       addressLine1: "456 Park Ave",
//       companyCity: "Delhi",
//       pinCode: "110001",
//       state: "Delhi",
//       isFromMaharashtra: "No",
//       contactPerson: "Alice Brown",
//       designation: "Director",
//       mobileNo: "8765432109",
//       emailId: "alice@xyzltd.com",
//       gstNo: "GST987654321",
//       industry: "Manufacturing",
//       subIndustry: "Automotive",
//       placementFees: "7.5",
//       creditPeriod: "45 days",
//       replacementPeriod: "30 days",
//       dueDate: "2025-05-01",
//       info: "PR",
//       // Credit Note specific fields
//       creditDate: "",
//       creditNoteNo: "",
//       reasonForCreditNote: "",
//       // Payment Received specific fields
//       dateReceived: "15/03/2025",
//       amountReceived: "25000",
//       tdsBackend: "250",
//       // Revised specific fields
//       paidOnDate: "",
//       soaNo: "",
//       addDebitCorrection: false,
//       revisionDetails: "",
//       // Outstanding specific fields
//       billDate: "",
//       billNo: "",
//       // GST Paid status
//       gstPaidStatus: "Paid",
//       // Additional fields for calculations
//       candidateName: "Emily Davis",
//       mobileNumber: "8765432109",
//       emailId: "emily.davis@example.com",
//       positionname: "Project Manager",
//       yearofexp: "8",
//       sourceOfCV: "Referral",
//       dateOfJoining: "2025-04-15",
//       salary: "1800000",
//       bdMemberName: "Michael Wilson",
//       billdate: "2025-03-01",
//       billNo: "INV-2025-002",
//       servicecharges: "",
//       CGST: "",
//       SGST: "",
//       IGST: "",
//       totalGST: "",
//       TOTALBILLAMT: "",
//       Duedate: "",
//       franchiseeShare: "",
//       franchiseeGST: "",
//       website: "",
//       hrExecutiveName: "",
//       enquiryStatus: "",
//       clientStatus: "",
//       dateOfAllocation: "",
//       dateOfReallocation: "",
//       newTeamLeader: "",
//       nameOfFranchisee: "",
//       dateOfBirth: "",
//       hireFor: "",
//       salaryOffer: "",
//     },
//     {
//       id: 3,
//       timestamp: new Date().toLocaleString(),
//       emailId: "example3@company.com",
//       franchiseeName: "Franchise C",
//       contactPersonName: "David Wilson",
//       payingGst: "No",
//       isProprietor: "No",
//       teamLeaderName: "Emily Davis",
//       companyName: "PQR Industries",
//       addressLine1: "789 Lake Rd",
//       companyCity: "Bangalore",
//       pinCode: "560001",
//       state: "Karnataka",
//       isFromMaharashtra: "No",
//       contactPerson: "David Wilson",
//       designation: "CEO",
//       mobileNo: "7654321098",
//       emailId: "david@pqrindustries.com",
//       gstNo: "GST456789123",
//       industry: "Healthcare",
//       subIndustry: "Pharmaceuticals",
//       placementFees: "10",
//       creditPeriod: "60 days",
//       replacementPeriod: "45 days",
//       dueDate: "2025-06-15",
//       info: "R",
//       // Credit Note specific fields
//       creditDate: "",
//       creditNoteNo: "",
//       reasonForCreditNote: "",
//       // Payment Received specific fields
//       dateReceived: "",
//       amountReceived: "90000",
//       tdsBackend: "",
//       // Revised specific fields
//       paidOnDate: "2025-03-20",
//       soaNo: "SOA-2025-001",
//       addDebitCorrection: true,
//       revisionDetails: "",
//       // Outstanding specific fields
//       billDate: "",
//       billNo: "",
//       // GST Paid status
//       gstPaidStatus: "Paid",
//       // Additional fields for calculations
//       candidateName: "Robert Brown",
//       mobileNumber: "7654321098",
//       emailId: "robert.brown@example.com",
//       positionname: "Medical Director",
//       yearofexp: "12",
//       sourceOfCV: "Agency",
//       dateOfJoining: "2025-05-01",
//       salary: "2400000",
//       bdMemberName: "Jennifer Lee",
//       billdate: "2025-02-15",
//       billNo: "INV-2025-003",
//       servicecharges: "",
//       CGST: "",
//       SGST: "",
//       IGST: "",
//       totalGST: "",
//       TOTALBILLAMT: "",
//       Duedate: "",
//       franchiseeShare: "",
//       franchiseeGST: "",
//       website: "",
//       hrExecutiveName: "",
//       enquiryStatus: "",
//       clientStatus: "",
//       dateOfAllocation: "",
//       dateOfReallocation: "",
//       newTeamLeader: "",
//       nameOfFranchisee: "",
//       dateOfBirth: "",
//       hireFor: "",
//       salaryOffer: "",
//     },
//   ])

//   // Add a useEffect to calculate all the formulas when invoiceData changes
//   useEffect(() => {
//     const updatedData = invoiceData.map((invoice) => {
//       // Calculate service charges
//       let calculatedServiceCharges = ""
//       if (Number.parseFloat(invoice.placementFees) > 1 && invoice.salary) {
//         calculatedServiceCharges = Math.round(
//           (Number.parseFloat(invoice.salary) * Number.parseFloat(invoice.placementFees)) / 100,
//         ).toString()
//       }

//       // Calculate CGST
//       let calculatedCGST = ""
//       if (invoice.isFromMaharashtra === "Yes" && calculatedServiceCharges) {
//         calculatedCGST = Math.round(Number.parseFloat(calculatedServiceCharges) * 0.09).toString()
//       }

//       // Calculate SGST (same as CGST)
//       const calculatedSGST = calculatedCGST

//       // Calculate IGST
//       let calculatedIGST = ""
//       if (invoice.isFromMaharashtra === "No" && calculatedServiceCharges) {
//         calculatedIGST = Math.round(Number.parseFloat(calculatedServiceCharges) * 0.18).toString()
//       }

//       // Calculate Total GST
//       let calculatedTotalGST = ""
//       if (calculatedCGST && calculatedSGST) {
//         calculatedTotalGST = (Number.parseFloat(calculatedCGST) + Number.parseFloat(calculatedSGST)).toString()
//       } else if (calculatedIGST) {
//         calculatedTotalGST = calculatedIGST
//       }

//       // Calculate Total Bill Amount
//       let calculatedTotalBillAmt = ""
//       if (invoice.teamLeaderName && calculatedServiceCharges) {
//         calculatedTotalBillAmt = (
//           Number.parseFloat(calculatedServiceCharges) + (calculatedTotalGST ? Number.parseFloat(calculatedTotalGST) : 0)
//         ).toString()
//       }

//       // Calculate Due Date
//       let calculatedDueDate = ""
//       if (invoice.creditPeriod && Number.parseInt(invoice.creditPeriod) > 29 && invoice.billdate) {
//         const billDate = new Date(invoice.billdate)
//         const creditPeriodDays = Number.parseInt(invoice.creditPeriod)
//         billDate.setDate(billDate.getDate() + creditPeriodDays)
//         calculatedDueDate = billDate.toISOString().split("T")[0]
//       }

//       // Calculate TDS
//       let calculatedTDS = invoice.tdsBackend
//       if ((invoice.info === "R" || invoice.info === "CR") && calculatedTotalBillAmt && invoice.amountReceived) {
//         calculatedTDS = Math.round(
//           Number.parseFloat(calculatedTotalBillAmt) - Number.parseFloat(invoice.amountReceived),
//         ).toString()
//       }

//       // Calculate Franchisee Share
//       let calculatedFranchiseeShare = ""
//       if (calculatedServiceCharges) {
//         if (invoice.info === "R") {
//           calculatedFranchiseeShare = Math.round(Number.parseFloat(calculatedServiceCharges) * 0.75).toString()
//         } else if (invoice.info === "PP") {
//           calculatedFranchiseeShare = Math.round(Number.parseFloat(calculatedServiceCharges) * 0.375).toString()
//         } else if (["C", "AD", "CN", "L"].includes(invoice.info)) {
//           calculatedFranchiseeShare = "0"
//         } else if (invoice.info === "O") {
//           calculatedFranchiseeShare = Math.round(Number.parseFloat(calculatedServiceCharges) * 0.75).toString()
//         }
//       }

//       // Calculate Franchisee GST
//       let calculatedFranchiseeGST = ""
//       if (calculatedFranchiseeShare) {
//         if (invoice.payingGst === "Yes") {
//           calculatedFranchiseeGST = Math.round(Number.parseFloat(calculatedFranchiseeShare) * 0.18).toString()
//         } else {
//           calculatedFranchiseeGST = "0"
//         }
//       }

//       return {
//         ...invoice,
//         servicecharges: calculatedServiceCharges,
//         CGST: calculatedCGST,
//         SGST: calculatedSGST,
//         IGST: calculatedIGST,
//         totalGST: calculatedTotalGST,
//         TOTALBILLAMT: calculatedTotalBillAmt,
//         Duedate: calculatedDueDate,
//         tdsBackend: calculatedTDS,
//         franchiseeShare: calculatedFranchiseeShare,
//         franchiseeGST: calculatedFranchiseeGST,
//       }
//     })

//     setInvoiceData(updatedData)
//   }, [])

//   // Handle info dropdown change
//   const handleInfoChange = (id, value) => {
//     const updatedData = invoiceData.map((item) => (item.id === id ? { ...item, info: value } : item))
//     setInvoiceData(updatedData)
//   }

//   // Handle GST paid status change
//   const handleGstPaidStatusChange = (id, value) => {
//     const updatedData = invoiceData.map((item) => (item.id === id ? { ...item, gstPaidStatus: value } : item))
//     setInvoiceData(updatedData)
//   }

//   // Open appropriate form based on info type
//   const openInfoForm = (id, infoType) => {
//     setActiveInfoRow(id)

//     // Close all forms first
//     setShowCreditNoteForm(false)
//     setShowPaymentForm1(false)
//     setShowOutstandingForm(false)
//     setShowRevisedForm(false)

//     // Open the appropriate form
//     if (infoType === "CN" || infoType === "RV" || infoType === "LEGAL-CN") {
//       setShowCreditNoteForm(true)
//     } else if (infoType === "PR") {
//       setShowPaymentForm1(true)
//     } else if (infoType === "O") {
//       setShowOutstandingForm(true)
//     } else if (infoType === "R") {
//       setShowRevisedForm(true)
//     }
//   }

//   // Close all forms
//   const closeAllForms = () => {
//     setShowCreditNoteForm(false)
//     setShowPaymentForm1(false)
//     setShowOutstandingForm(false)
//     setShowRevisedForm(false)
//     setActiveInfoRow(null)
//   }

//   // Save credit note data
//   const saveCreditNoteData = (creditData) => {
//     const updatedData = invoiceData.map((item) =>
//       item.id === activeInfoRow
//         ? {
//             ...item,
//             creditDate: creditData.creditDate,
//             creditNoteNo: creditData.creditNoteNo,
//           }
//         : item,
//     )
//     setInvoiceData(updatedData)
//     closeAllForms()
//   }

//   // Save payment received data (PR form)
//   const savePaymentData1 = (paymentData) => {
//     const updatedData = invoiceData.map((item) =>
//       item.id === activeInfoRow
//         ? {
//             ...item,
//             dateReceived: paymentData.dateReceived,
//             amountReceived: paymentData.amountReceived,
//             tdsBackend: paymentData.tdsBackend,
//           }
//         : item,
//     )
//     setInvoiceData(updatedData)
//     closeAllForms()
//   }

//   // Save revised data (R form)
//   const saveRevisedData = (revisedData) => {
//     const updatedData = invoiceData.map((item) =>
//       item.id === activeInfoRow
//         ? {
//             ...item,
//             paidOnDate: revisedData.paidOnDate,
//             soaNo: revisedData.soaNo,
//             addDebitCorrection: revisedData.addDebitCorrection,
//           }
//         : item,
//     )
//     setInvoiceData(updatedData)
//     closeAllForms()
//   }

//   // Save outstanding data
//   const saveOutstandingData = (outstandingData) => {
//     const updatedData = invoiceData.map((item) =>
//       item.id === activeInfoRow
//         ? {
//             ...item,
//             billDate: outstandingData.billDate,
//             billNumber: outstandingData.billNumber,
//           }
//         : item,
//     )
//     setInvoiceData(updatedData)
//     closeAllForms()
//   }

//   // Delete invoice row
//   const deleteInvoiceRow = (id) => {
//     setInvoiceData(invoiceData.filter((item) => item.id !== id))
//   }

//   // Update the search functionality
//   const filteredInvoiceData = invoiceData.filter((invoice) => {
//     const searchTermLower = searchTerm.toLowerCase()
//     return (
//       invoice.franchiseeName?.toLowerCase().includes(searchTermLower) ||
//       invoice.companyName?.toLowerCase().includes(searchTermLower) ||
//       invoice.contactPersonName?.toLowerCase().includes(searchTermLower) ||
//       invoice.emailId?.toLowerCase().includes(searchTermLower) ||
//       invoice.gstNo?.toLowerCase().includes(searchTermLower) ||
//       invoice.billNo?.toLowerCase().includes(searchTermLower) ||
//       invoice.candidateName?.toLowerCase().includes(searchTermLower)
//     )
//   })

//   // Add these functions inside the InvoiceData component before the return statement

//   // Open job invoice form for adding new data
//   const openJobInvoiceForm = () => {
//     setActiveJobInvoiceRow(null)
//     setShowJobInvoiceForm(true)
//   }

//   // Open job invoice form for editing existing data
//   const editJobInvoiceData = (id) => {
//     setActiveJobInvoiceRow(id)
//     setShowJobInvoiceForm(true)
//   }

//   // Save job invoice data
//   const saveJobInvoiceData = (jobData) => {
//     if (activeJobInvoiceRow === null) {
//       // Add new job invoice data
//       setJobInvoiceData([
//         ...jobInvoiceData,
//         {
//           id: jobInvoiceData.length > 0 ? Math.max(...jobInvoiceData.map((item) => item.id)) + 1 : 1,
//           ...jobData,
//         },
//       ])
//     } else {
//       // Update existing job invoice data
//       setJobInvoiceData(
//         jobInvoiceData.map((item) => (item.id === activeJobInvoiceRow ? { ...item, ...jobData } : item)),
//       )
//     }
//     setShowJobInvoiceForm(false)
//     setActiveJobInvoiceRow(null)
//   }

//   // Delete job invoice data
//   const deleteJobInvoiceData = (id) => {
//     setJobInvoiceData(jobInvoiceData.filter((item) => item.id !== id))
//   }

//   // Filter job invoice data based on search term
//   const filteredJobInvoiceData = jobInvoiceData.filter((invoice) => {
//     const searchTermLower = jobSearchTerm.toLowerCase()
//     return (
//       invoice.kindlyShareName?.toLowerCase().includes(searchTermLower) ||
//       invoice.contactPerson?.toLowerCase().includes(searchTermLower) ||
//       invoice.nameOfTeamLeader?.toLowerCase().includes(searchTermLower) ||
//       invoice.gstNo?.toLowerCase().includes(searchTermLower) ||
//       invoice.billNo?.toLowerCase().includes(searchTermLower)
//     )
//   })

//   // Update the return statement to include the job invoice data table
//   // Replace the existing return statement with this updated one that includes the job invoice data table

//   // Modify the content inside the invoice-data-container div to include the job invoice data table
//   // Find the line with <div className="invoice-data-container"> and replace everything inside it with:

//   // Update the return statement to include the job invoice data table
//   // Find the line with <div className="invoice-data-container"> and replace the content inside it with:
//   return (
//     <div className="invoice-container">
//       <h1 className="invoice-title">Invoice Data</h1>
//       <p className="invoice-subtitle">All the Invoice Data are listed here</p>

//       <div className="invoice-search-filter-container">
//         <div className="invoice-search-container">
//           <i className="invoice-search-icon">🔍</i>
//           <input
//             type="text"
//             placeholder="Search"
//             value={activeTab === "invoice" ? searchTerm : jobSearchTerm}
//             onChange={(e) =>
//               activeTab === "invoice" ? setSearchTerm(e.target.value) : setJobSearchTerm(e.target.value)
//             }
//             className="invoice-search-input"
//           />
//         </div>

//         <div className="invoice-filters">
//           <select className="invoice-filter-select" value={fiscalYear} onChange={(e) => setFiscalYear(e.target.value)}>
//             <option value="FY 2022-23">FY 2022-23</option>
//             <option value="FY 2023-24">FY 2023-24</option>
//             <option value="FY 2024-25">FY 2024-25</option>
//           </select>

//           <select className="invoice-filter-select" value={month} onChange={(e) => setMonth(e.target.value)}>
//             <option value="">Month</option>
//             <option value="January">January</option>
//             <option value="February">February</option>
//             <option value="March">March</option>
//             <option value="April">April</option>
//             <option value="May">May</option>
//             <option value="June">June</option>
//             <option value="July">July</option>
//             <option value="August">August</option>
//             <option value="September">September</option>
//             <option value="October">October</option>
//             <option value="November">November</option>
//             <option value="December">December</option>
//           </select>
//         </div>
//       </div>

//       <div className="invoice-tabs">
//         <button
//           className={`invoice-tab ${activeTab === "invoice" ? "active" : ""}`}
//           onClick={() => setActiveTab("invoice")}
//         >
//           Invoice Data
//         </button>
//         <button className={`invoice-tab ${activeTab === "job" ? "active" : ""}`} onClick={() => setActiveTab("job")}>
//           Job invoice Data
//         </button>
//       </div>

//       <div className="invoice-data-container">
//         {activeTab === "invoice" ? (
//           <>
//             <div className="invoice-header">
//               <h2 className="invoice-section-title">Invoice Data</h2>
//               <button className="invoice-download-btn">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
//                   <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z"></path>
//                 </svg>
//               </button>
//             </div>

//             <div className="invoice-table-container">
//               <table className="invoice-table">
//                 <thead>
//                   <tr>
//                     <th>TIMESTAMP</th>
//                     <th>FRANCHISEE NAME</th>
//                     <th>CONTACT PERSON NAME</th>
//                     <th>Are you PAYING GST</th>
//                     <th>PROPRIETOR (1% TDS)</th>
//                     <th>TEAM LEADER NAME</th>
//                     <th>COMPANY NAME</th>
//                     <th>ADDRESS LINE 1</th>
//                     <th>COMPANY CITY</th>
//                     <th>PIN CODE</th>
//                     <th>STATE</th>
//                     <th>FROM MAHARASHTRA</th>
//                     <th>CONTACT PERSON</th>
//                     <th>DESIGNATION</th>
//                     <th>MOBILE NO</th>
//                     <th>EMAIL ID</th>
//                     <th>GST NO.</th>
//                     <th>INDUSTRY</th>
//                     <th>SUB-INDUSTRY</th>
//                     <th>PLACEMENT FEES</th>
//                     <th>CREDIT PERIOD</th>
//                     <th>REPLACEMENT PERIOD</th>
//                     <th>CANDIDATE NAME</th>
//                     <th>MOBILE NUMBER</th>
//                     <th>EMAIL ID</th>
//                     <th>POSITION NAME</th>
//                     <th>YEAR OF EXP</th>
//                     <th>SOURCE OF CV</th>
//                     <th>DATE OF JOINING</th>
//                     <th>SALARY</th>
//                     <th>BD MEMBER NAME</th>
//                     <th>BILL DATE</th>
//                     <th>BILL NO</th>
//                     <th>SERVICE CHARGES</th>
//                     <th>CGST</th>
//                     <th>SGST</th>
//                     <th>IGST</th>
//                     <th>TOTAL GST</th>
//                     <th>TOTAL BILL AMT</th>
//                     <th>DUE DATE</th>
//                     <th>INFO</th>
//                     {/* Credit Note specific columns */}
//                     <th>CREDIT DATE</th>
//                     <th>CREDIT NOTE NO.</th>
//                     <th>REASON FOR CREDIT NOTE</th>
//                     {/* Payment Received specific columns */}
//                     <th>DATE of RECEIVED</th>
//                     <th>AMOUNT RECEIVED</th>
//                     <th>TDS</th>
//                     <th>FRANCHISEE SHARE</th>
//                     <th>FRANCHISEE GST</th>
//                     {/* Revised specific columns */}
//                     <th>PAID ON DATE</th>
//                     <th>SOA NO.</th>
//                     <th>DEBIT CORRECTION</th>
//                     <th>REVISION DETAILS</th>
//                     {/* Outstanding specific columns */}
//                     <th>BILL DATE</th>
//                     <th>BILL NO</th>
//                     {/* GST Paid Status */}
//                     <th>GST PAID OR NOT</th>
//                     <th>ACTION</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredInvoiceData.map((invoice) => (
//                     <tr key={invoice.id}>
//                       <td>{invoice.timestamp}</td>
//                       <td>{invoice.franchiseeName}</td>
//                       <td>{invoice.contactPersonName}</td>
//                       <td>{invoice.payingGst}</td>
//                       <td>{invoice.isProprietor}</td>
//                       <td>{invoice.teamLeaderName}</td>
//                       <td>{invoice.companyName}</td>
//                       <td>{invoice.addressLine1}</td>
//                       <td>{invoice.companyCity}</td>
//                       <td>{invoice.pinCode}</td>
//                       <td>{invoice.state}</td>
//                       <td>{invoice.isFromMaharashtra}</td>
//                       <td>{invoice.contactPerson}</td>
//                       <td>{invoice.designation}</td>
//                       <td>{invoice.mobileNo}</td>
//                       <td>{invoice.emailId}</td>
//                       <td>{invoice.gstNo}</td>
//                       <td>{invoice.industry}</td>
//                       <td>{invoice.subIndustry}</td>
//                       <td>{invoice.placementFees}</td>
//                       <td>{invoice.creditPeriod}</td>
//                       <td>{invoice.replacementPeriod}</td>
//                       <td>{invoice.candidateName}</td>
//                       <td>{invoice.mobileNumber}</td>
//                       <td>{invoice.emailId}</td>
//                       <td>{invoice.positionname}</td>
//                       <td>{invoice.yearofexp}</td>
//                       <td>{invoice.sourceOfCV}</td>
//                       <td>{invoice.dateOfJoining}</td>
//                       <td>{invoice.salary}</td>
//                       <td>{invoice.bdMemberName}</td>
//                       <td>{invoice.billdate}</td>
//                       <td>{invoice.billNo}</td>
//                       <td>{invoice.servicecharges}</td>
//                       <td>{invoice.CGST}</td>
//                       <td>{invoice.SGST}</td>
//                       <td>{invoice.IGST}</td>
//                       <td>{invoice.totalGST}</td>
//                       <td>{invoice.TOTALBILLAMT}</td>
//                       <td>{invoice.Duedate}</td>
//                       <td>
//                         <select
//                           className="invoice-info-select"
//                           value={invoice.info}
//                           onChange={(e) => handleInfoChange(invoice.id, e.target.value)}
//                           onClick={() => openInfoForm(invoice.id, invoice.info)}
//                         >
//                           <option value="CN">CN</option>
//                           <option value="PR">PR</option>
//                           <option value="R">R</option>
//                           <option value="O">O</option>
//                           <option value="PP">PP</option>
//                           <option value="RV">RV</option>
//                           <option value="LEGAL-CN">LEGAL-CN</option>
//                           <option value="LEGAL">LEGAL</option>
//                         </select>
//                       </td>
//                       {/* Credit Note specific data */}
//                       <td>{invoice.creditDate}</td>
//                       <td>{invoice.creditNoteNo}</td>
//                       <td>{invoice.reasonForCreditNote}</td>
//                       {/* Payment Received specific data */}
//                       <td>{invoice.dateReceived}</td>
//                       <td>{invoice.amountReceived}</td>
//                       <td>{invoice.tdsBackend}</td>
//                       <td>{invoice.franchiseeShare}</td>
//                       <td>{invoice.franchiseeGST}</td>
//                       {/* Revised specific data */}
//                       <td>{invoice.paidOnDate}</td>
//                       <td>{invoice.soaNo}</td>
//                       <td>{invoice.addDebitCorrection ? "Yes" : "No"}</td>
//                       <td>{invoice.revisionDetails}</td>
//                       {/* Outstanding specific data */}
//                       <td>{invoice.billDate}</td>
//                       <td>{invoice.billNo}</td>
//                       {/* GST Paid Status */}
//                       <td>
//                         <select
//                           className="invoice-gst-status-select"
//                           value={invoice.gstPaidStatus}
//                           onChange={(e) => handleGstPaidStatusChange(invoice.id, e.target.value)}
//                         >
//                           <option value="Paid">Paid</option>
//                           <option value="Unpaid">Unpaid</option>
//                         </select>
//                       </td>
//                       <td className="invoice-action-buttons">
//                         <button className="invoice-delete-btn" onClick={() => deleteInvoiceRow(invoice.id)}>
//                           🗑️
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="invoice-header">
//               <h2 className="invoice-section-title">Job Invoice Data</h2>
//               <button className="invoice-add-btn" onClick={openJobInvoiceForm}>
//                 Add Job Invoice Data
//               </button>
//             </div>

//             <div className="invoice-table-container">
//               <table className="invoice-table">
//                 <thead>
//                   <tr>
//                     <th>KINDLY SHARE NAME</th>
//                     <th>CONTACT PERSON</th>
//                     <th>NAME OF TEAM LEADER</th>
//                     <th>DO YOU HAVE GST NO</th>
//                     <th>GST NO</th>
//                     <th>DETAILS OF JOB PORTAL</th>
//                     <th>NO OF LOGIN FOR NAUKRI</th>
//                     <th>NO OF JOB SLOT FOR LINKEDIN</th>
//                     <th>AMOUNT PAID (WITHOUT GST)</th>
//                     <th>GST AMOUNT</th>
//                     <th>TOTAL AMOUNT PAID</th>
//                     <th>DATE OF PAYMENT</th>
//                     <th>BILL DATE</th>
//                     <th>BILL NO</th>
//                     <th>ACTION</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredJobInvoiceData.map((invoice) => (
//                     <tr key={invoice.id}>
//                       <td>{invoice.kindlyShareName}</td>
//                       <td>{invoice.contactPerson}</td>
//                       <td>{invoice.nameOfTeamLeader}</td>
//                       <td>{invoice.doYouHaveGstNo}</td>
//                       <td>{invoice.gstNo}</td>
//                       <td>{invoice.detailsOfJobPortal}</td>
//                       <td>{invoice.noOfLoginForNaukri}</td>
//                       <td>{invoice.noOfJobSlotForLinkedin}</td>
//                       <td>{invoice.amountPaidWithoutGst}</td>
//                       <td>{invoice.gstAmount}</td>
//                       <td>{invoice.totalAmountPaid}</td>
//                       <td>{invoice.dateOfPayment}</td>
//                       <td>{invoice.billDate}</td>
//                       <td>{invoice.billNo}</td>
//                       <td className="invoice-action-buttons">
//                         <button className="invoice-edit-btn" onClick={() => editJobInvoiceData(invoice.id)}>
//                           ✏️
//                         </button>
//                         <button className="invoice-delete-btn" onClick={() => deleteJobInvoiceData(invoice.id)}>
//                           🗑️
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}

//         <div className="invoice-pagination">
//           <button className="invoice-pagination-btn">◀</button>
//           <div className="invoice-pagination-indicator"></div>
//           <button className="invoice-pagination-btn">▶</button>
//         </div>
//       </div>

//       {/* Credit Note Form */}
//       {showCreditNoteForm && <CreditNoteForm onClose={closeAllForms} onSave={saveCreditNoteData} />}

//       {/* Payment Received Form (PR) */}
//       {showPaymentForm1 && <PaymentResForm1 onClose={closeAllForms} onSave={savePaymentData1} />}

//       {/* Revised Form (R) */}
//       {showRevisedForm && <RevisedForm onClose={closeAllForms} onSave={saveRevisedData} />}

//       {/* Outstanding Form (O) */}
//       {showOutstandingForm && <OutstandingForm onClose={closeAllForms} onSave={saveOutstandingData} />}

//       {/* Job Invoice Form */}
//       {showJobInvoiceForm && (
//         <JobInvoiceForm
//           onClose={() => setShowJobInvoiceForm(false)}
//           onSave={saveJobInvoiceData}
//           initialData={
//             activeJobInvoiceRow !== null ? jobInvoiceData.find((item) => item.id === activeJobInvoiceRow) : null
//           }
//         />
//       )}
//     </div>
//   )
// }

// export default InvoiceData;