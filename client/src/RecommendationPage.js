import React from "react";

const RecommendationPage = () => {
  return <div>RecommendationPage</div>;
};

export default RecommendationPage;

// function CheckOut() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     creditCard: "",
//     expirationDate: "",
//     ccv: "",
//     // Add other necessary fields
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form data submitted:", formData);
//     fetch("/addPurchase", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         navigate(`/Confirmation/${formData.firstName}`);
//         console.log(data);
//       })
//       .catch((error) => {
//         window.alert(error);
//       });
//   };

//   return (
//     <div>
//       <h2>Checkout</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           First Name:
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Last Name:
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Billing Address:
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Credit Card:
//           <input
//             type="text"
//             name="creditCard"
//             value={formData.creditCard}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Expiration Date:
//           <input
//             type="text"
//             name="expirationDate"
//             value={formData.expirationDate}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           CCV:
//           <input
//             type="text"
//             name="ccv"
//             value={formData.ccv}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <button type="submit" onClick={handleSubmit}>
//           Submit Order
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CheckOut;
