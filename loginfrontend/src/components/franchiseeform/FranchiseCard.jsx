

// import React, { useState } from "react";
// import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

// const FranchiseCard = ({ franchise, deleteFranchise, updateFranchise }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState({ ...franchise });

//   // ✅ Date Format Function (Convert to yyyy-MM-dd)
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toISOString().split("T")[0];
//   };

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   // ✅ Save changes
//   const handleSave = async () => {
//     const updatedData = {};
    
//     Object.keys(editedData).forEach((key) => {
//       if (editedData[key] !== franchise[key]) {
//         updatedData[key] = editedData[key];
//       }
//     });
  
//     if (Object.keys(updatedData).length > 0) {
//       const response = await updateFranchise(franchise.id, updatedData);
//       if (response) {
//         // ✅ State ko real-time update karo
//         setEditedData(response);
//       }
//     } else {
//       alert("⚠️ No changes to update");
//     }
  
//     setIsEditing(false);
//   };
  

//   // ✅ Cancel Edit
//   const handleCancel = () => {
//     setEditedData({ ...franchise });
//     setIsEditing(false);
//   };

//   return (
//     <tr className="hover:bg-purple-50 transition-colors border-b border-gray-200">
//       {/* ✅ Office Email ID */}
//       <td className="px-6 py-4 text-blue-600 font-medium cursor-pointer">
//         {isEditing ? (
//           <input
//             type="text"
//             name="officialEmailId"
//             value={editedData.officialEmailId || ""}
//             onChange={handleChange}
//             className="w-full border p-2 rounded-md"
//           />
//         ) : (
//           franchise.officialEmailId || "N/A"
//         )}
//       </td>

//       {/* ✅ Date of Creation */}
//       <td className="px-6 py-4 text-gray-700">
//         {isEditing ? (
//           <input
//             type="date"
//             name="dateOfCreation"
//             value={formatDate(editedData.dateOfCreation) || ""}
//             onChange={handleChange}
//             className="w-full border p-2 rounded-md"
//           />
//         ) : (
//           formatDate(franchise.dateOfCreation) || "N/A"
//         )}
//       </td>

//       {/* ✅ Date of Closing */}
//       <td className="px-6 py-4 text-gray-700">
//         {isEditing ? (
//           <input
//             type="date"
//             name="dateOfClosing"
//             value={formatDate(editedData.dateOfClosing) || ""}
//             onChange={handleChange}
//             className="w-full border p-2 rounded-md"
//           />
//         ) : (
//           formatDate(franchise.dateOfClosing) || "N/A"
//         )}
//       </td>

//       {/* ✅ Email ID Status */}
//       <td className="px-6 py-4 text-gray-700">
//         {isEditing ? (
//           <select
//             name="emailIdStatus"
//             value={editedData.emailIdStatus || ""}
//             onChange={handleChange}
//             className="w-full border p-2 rounded-md"
//           >
//             <option value="Working">Working</option>
//             <option value="Deleted">Deleted</option>
//           </select>
//         ) : (
//           franchise.emailIdStatus || "N/A"
//         )}
//       </td>

//       {/* ✅ Action Buttons */}
//       <td className="px-6 py-4 flex items-center justify-center gap-3">
//         {isEditing ? (
//           <>
//             {/* Save Button */}
//             <button
//               onClick={handleSave}
//               className="text-green-500 hover:text-green-700 transition-colors"
//             >
//               <FaSave size={18} />
//             </button>
//             {/* Cancel Button */}
//             <button
//               onClick={handleCancel}
//               className="text-red-500 hover:text-red-700 transition-colors"
//             >
//               <FaTimes size={18} />
//             </button>
//           </>
//         ) : (
//           <>
//             {/* Edit Button */}
//             <button
//               onClick={() => setIsEditing(true)}
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <FaEdit size={18} />
//             </button>
//             {/* Delete Button */}
//             <button
//               onClick={() => deleteFranchise(franchise.id)}
//               className="text-red-500 hover:text-red-700 transition-colors"
//             >
//               <FaTrash size={18} />
//             </button>
//           </>
//         )}
//       </td>
//     </tr>
//   );
// };

// export default FranchiseCard;
