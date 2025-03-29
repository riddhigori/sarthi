
// import React, { useEffect, useState } from "react";
// import { IoFilter } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import FranchiseCard from "./FranchiseCard";

// const FranchiseMainContent = () => {
//   const navigate = useNavigate();
//   const [franchiseData, setFranchiseData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // ✅ Search term ko state me rakho
//   const [selectedYear, setSelectedYear] = useState(""); // ✅ Dropdown ke liye state

//   // ✅ Backend se data fetch karna
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/submit-franchise");
//         const data = await response.json();
//         setFranchiseData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);


//    // ✅ Filter Logic (Search + Dropdown Combined)
//   const filteredData = franchiseData.filter((data) => {
//     const searchMatch = data?.officialEmailId
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     // ✅ FY 24-25 ka matlab dateOfCreation ka year 2024 hona chahiye
//     const yearMatch = selectedYear
//       ? data?.dateOfCreation?.startsWith(selectedYear.split(" ")[1]) // ✅ 24-25 → 2024
//       : true;

//     return searchMatch && yearMatch;
//   });



//   // ✅ Add franchise directly state me add karega
//   const addFranchise = async (newFranchise) => {
//     try {
//       const response = await fetch("http://localhost:5000/submit-franchise", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newFranchise),
//       });

//       if (response.ok) {
//         const savedFranchise = await response.json();
//         setFranchiseData((prevData) => [...prevData, savedFranchise]); // ✅ State directly update
//         alert("✅ Franchise added successfully!");
//         navigate("/");
//       } else {
//         alert("❌ Error adding franchise");
//       }
//     } catch (error) {
//       console.error("Error adding franchise:", error);
//     }
//   };

//   // ✅ Delete function
//   const deleteFranchise = async (id) => {
//     try {
//       await fetch(`http://localhost:5000/submit-franchise/${id}`, {
//         method: "DELETE",
//       });
//       setFranchiseData((prevData) =>
//         prevData.filter((item) => item.id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting franchise:", error);
//     }
//   };


//   // ✅ Edit function define karo
//   const editFranchise = (id) => {
//     console.log(`Editing franchise with ID: ${id}`);
//     // Yaha par edit logic add karo, jaise ki ek modal open karna ya form fill karna
//   };

//   const updateFranchise = async (id, updatedData) => {
//     try {
//       const response = await fetch(`http://localhost:5000/submit-franchise/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedData),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setFranchiseData((prevData) =>
//           prevData.map((item) => (item.id === id ? { ...item, ...data.data } : item))
//         );
//       }
//     } catch (error) {
//       console.error("Error updating franchise:", error);
//     }
//   };


//   return (
//     <div className="p-6 flex-1 min-h-screen bg-[#F8F5FF]">
//       {/* ✅ Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-[#3B2858]">Franchise Data</h1>
//           <p className="text-gray-500 mt-2">
//             All the company franchises are listed here
//           </p>
//         </div>
//         <div className="flex items-center gap-5">
//           <button
//             className="bg-purple-950 text-white px-6 py-1 rounded-md text-lg"
//             onClick={() => navigate("/add-franchise")}
//           >
//             ➕ Add Franchise
//           </button>
//         </div>
//       </div>

//       {/* ✅ Search and Dropdown */}
//       <div className="flex items-center gap-8 mb-10">
//         {/* Search Bar */}
//         {/* <div className="relative w-1/3">
//           <input
//             type="text"
//             placeholder="Search"
//             className="px-4 py-3 pl-10 w-full border rounded-lg shadow-[0px_4px_12px_#E7E7F1] bg-purple-50 outline-none focus:ring-2 focus:ring-[#E7E7F1]"
//           />
//           <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//             🔍
//           </span>
//         </div> */}
//         <div className="relative w-1/3">
//           <input
//             type="text"
//             placeholder="Search by Email"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)} // ✅ Search term ko update karo
//             className="px-4 py-3 pl-10 w-full border rounded-lg shadow-[0px_4px_12px_#E7E7F1] bg-purple-50 outline-none focus:ring-2 focus:ring-[#E7E7F1]"
//           />
//           <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//             🔍
//           </span>
//         </div>


//         {/* Dropdown */}
//         {/* <div className="relative w-40">
//           <select className="px-4 py-3 w-full border rounded-lg shadow-[0px_4px_12px_#E7E7F1] bg-purple-50 outline-none focus:ring-2 focus:ring-[#E7E7F1]">
//             <option>FY 24-25</option>
//             <option>FY 23-24</option>
//             <option>FY 22-23</option>
//             <option>FY 21-22</option>
//           </select>
//         </div> */}
//         <div className="relative w-40">
//           <select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             className="px-4 py-3 w-full border rounded-lg shadow-[0px_4px_12px_#E7E7F1] bg-purple-50 outline-none focus:ring-2 focus:ring-[#E7E7F1]"
//           >
//             <option value="">All Years</option>
//             <option value="FY 24-25">FY 24-25</option>
//             <option value="FY 23-24">FY 23-24</option>
//             <option value="FY 22-23">FY 22-23</option>
//             <option value="FY 21-22">FY 21-22</option>
//           </select>
//         </div>
//       </div>

//       {/* ✅ Franchise Cards */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
//       {/* ✅ Table Format */}
//       <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
//         <table className="min-w-full border-collapse">
//           {/* ✅ Table Head */}
//           <thead className="bg-purple-100 text-gray-700 font-semibold">
//             <tr>
//               <th className="px-6 py-4 border-b border-gray-300 text-left">
//                 Office Email ID
//               </th>
//               <th className="px-6 py-4 border-b border-gray-300 text-left">
//                 Date of Creation
//               </th>
//               <th className="px-6 py-4 border-b border-gray-300 text-left">
//                 Date of Closing
//               </th>
//               <th className="px-6 py-4 border-b border-gray-300 text-left">
//                 Email ID Status
//               </th>
//               <th className="px-6 py-4 border-b border-gray-300 text-center">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           {/* ✅ Table Body */}
//           <tbody className="divide-y divide-gray-200">
//             {/* {franchiseData.map((franchise) => ( */}
//             {filteredData.map((franchise) => (
//               <FranchiseCard
//                 key={franchise.id}
//                 franchise={franchise}
//                 deleteFranchise={deleteFranchise}
//                 editFranchise={editFranchise}
//                 updateFranchise={updateFranchise}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>


//       {/* ✅ Click here to add Franchise - Dynamic shifting */}
//       <div
//         className="border-2 border-dashed border-gray-300 rounded-lg px-6 py-8 text-purple-950 cursor-pointer hover:border-gray-400 w-3/3 text-lg mt-6"
//         onClick={() => navigate("/add-franchise")}
//       >
//         ➕ Click here to add Franchise Data
//       </div>
//     </div>
//   );
// };

// export default FranchiseMainContent;































