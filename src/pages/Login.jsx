import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from '../features/authSlice'
import { useNavigate, Link } from "react-router-dom"
import Inputfield from "../app/ui/Inputfield"
import Button from "../app/ui/Button"
import { useForm } from "react-hook-form"

const Login = () => {
  const { user, status, error } = useSelector((state) => state.auth)
  
  // Remove these unused state variables
  // const [email, setEmail] = useState()
  // const [password, setPassword] = useState()
  
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Fix: Use data.email and data.password from React Hook Form
  const onSubmit = (data) => {
    console.log('data', data)
    dispatch(login({ 
      email: data.email, 
      password: data.password 
    }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login__container">
      <h2 className="m-2">Welcome to E-shop</h2>
      
      <Inputfield 
        type="email" 
        placeholder="Enter your email"
        {...register('email', {
          required: 'Email is required', 
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email format' // Fixed message
          }
        })}
        autoComplete="email" 
      />
      {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

      <Inputfield 
        type="password" 
        autoComplete="current-password" 
        placeholder="Enter your password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
      />
      {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

      {/* Show API error if exists */}
      {error && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </p>
      )}

      <div className="flex gap-4">
        <Button 
          type="submit" 
          disabled={status === 'loading'}
          children={status === 'loading' ? 'Logging in...' : 'Login'} 
        />
        <Button children={<Link to='/register'>Register</Link>} />
      </div>
    </form>
  )
}

export default Login;


























// import React, { usimport React from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';

// function DynamicFormHook() {
//   const { control, handleSubmit, register } = useForm({
//     defaultValues: {
//       users: [{ name: '', age: '' }]
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "users"
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {fields.map((field, index) => (
//         <div key={field.id}>
//           <input
//             {...register(`users.${index}.name`, { required: true })}
//             placeholder="Name"
//           />
//           <input
//             {...register(`users.${index}.age`, { required: true })}
//             placeholder="Age"
//           />
//           <button type="button" onClick={() => remove(index)}>
//             Remove
//           </button>
//         </div>
//       ))}
//       <button 
//         type="button" 
//         onClick={() => append({ name: '', age: '' })}
//       >
//         Add User
//       </button>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }








// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';

// // Form schema from backend/API
// const formSchema = {
//   firstName: {
//     label: "First Name",
//     type: "text",
//     placeholder: "Enter your first name",
//     defaultValue: "",
//     rules: { required: true }
//   },
//   lastName: {
//     label: "Last Name", 
//     type: "text",
//     placeholder: "Enter your last name",
//     defaultValue: "",
//     rules: { required: true }
//   },
//   gender: {
//     label: "Gender",
//     type: "radio",
//     options: ["male", "female"],
//     defaultValue: "",
//     rules: { required: true }
//   },
//   profession: {
//     label: "Profession",
//     type: "dropdown",
//     options: ["Frontend Developer", "Backend Developer", "DevOps Engineer"],
//     defaultValue: "",
//     rules: { required: true }
//   }
// };

// // Reusable Input Component
// const DynamicInput = ({ value, onChange, type, options, placeholder }) => {
//   switch (type) {
//     case "text":
//       return (
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//         />
//       );
    
//     case "radio":
//       return options.map((option) => (
//         <label key={option}>
//           <input
//             type="radio"
//             value={option}
//             checked={value === option}
//             onChange={(e) => onChange(e.target.value)}
//           />
//           {option}
//         </label>
//       ));
    
//     case "dropdown":
//       return (
//         <select value={value} onChange={(e) => onChange(e.target.value)}>
//           <option value="">Select...</option>
//           {options.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       );
    
//     default:
//       return null;
//   }
// };

// function JSONDrivenForm() {
//   const { handleSubmit, control, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   // Generate form fields from schema
//   const formFields = Object.keys(formSchema).map((fieldName) => {
//     const { rules, defaultValue, label, ...fieldProps } = formSchema[fieldName];
    
//     return (
//       <div key={fieldName}>
//         <label>{label}</label>
//         <Controller
//           name={fieldName}
//           control={control}
//           rules={rules}
//           defaultValue={defaultValue}
//           render={({ field }) => (
//             <DynamicInput
//               value={field.value}
//               onChange={field.onChange}
//               {...fieldProps}
//             />
//           )}
//         />
//         {errors[fieldName] && <p style={{color: 'red'}}>This field is required</p>}
//       </div>
//     );
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {formFields}
//       <button type="submit">Submit</button>
//     </form>
//   );
// }


