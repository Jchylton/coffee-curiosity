import React from "react";

const ProfilePage = () => {
  return <div>ProfilePage</div>;
};

export default ProfilePage;

//ecommerce checkout page AKA setting up a user profile

// function ProfilePage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     memberSince: "",
//    avatar: "",
//    recommendation: [],
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

//slingair customer input

// const Form = ({ handleSubmit, selectedSeat }) => {

//   const [formData, setFormData] = useState({});

//   const handleChange = (key, value) => {
//       setFormData({
//           ...formData,
//           [key]: value
//       })
//   }

//   return (
//       <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
//           <Input
//               type="text"
//               placeholder="First Name"
//               name={"firstName"}
//               required={true}
//               handleChange={handleChange}
//           />
//           <Input
//               type="text"
//               placeholder="Last Name"
//               name={"lastName"}
//               required={true}
//               handleChange={handleChange}
//           />
//           <Input
//               type="email"
//               placeholder="Email"
//               name={"email"}
//               required={true}
//               handleChange={handleChange}
//           />
//           <Submit type="submit" disabled={selectedSeat.length ? false : true}>Confirm</Submit>
//       </StyledForm>
//   )
// }

// const Submit = styled.button`
//   background-color: #d1560e;
//   border: none;
//   margin-top: 5px;
//   border-radius: 2px;

//   &:disabled{
//       color: var(--color-orange);
//   }
// `

// const StyledForm = styled.form`
//   margin-top: 24px;
//   border: 5px solid var(--color-alabama-crimson);
//   padding: 30px;
//   margin: auto 0px auto;
//   display: flex;
//   flex-direction: column;
//   margin-left: 50px;
// `

// export default Form
