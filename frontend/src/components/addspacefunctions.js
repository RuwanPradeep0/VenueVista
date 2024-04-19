// const apiCall = async (endpoint, method, formData) => {
//     try {
//       const response = await fetch(`/api/${endpoint}`, {
//         method: method,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error ${response.status}`);
//       }
  
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error during API call:', error);
//       throw error;
//     }
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Create a FormData object with the form data
//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append('name', formData.name);
//     formDataToSubmit.append('location', formData.location);
//     formDataToSubmit.append('capacity', formData.capacity);
//     formDataToSubmit.append('description', formData.description);
//     formDataToSubmit.append('image', formData.image);
//     formData.facilities.forEach((facility) => {
//       formDataToSubmit.append('facilities', facility);
//     });
  
//     try {
//       // Submit the form data to the backend
//       const response = await apiCall('halls', 'POST', formDataToSubmit);
//       console.log('Hall details submitted successfully:', response);
//       // You can perform additional actions after successful submission, like resetting the form or showing a success message
//     } catch (error) {
//       console.error('Error submitting hall details:', error);
//       // You can handle the error here, like showing an error message to the user
//     }
//   };



//   import java.util.List;

// public class Hall {
//     private String name;
//     private String location;
//     private int capacity;
//     private String description;
//     private byte[] image;
//     private List<String> facilities;

//     // Constructors, getters, and setters
//     // ...
// }