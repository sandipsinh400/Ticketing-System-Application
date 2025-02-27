import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';



function CreateTicket() {
  const { register, handleSubmit } = useForm()
  const redirect = useNavigate()

  async function SubTicket(data) {
    console.log(data)
    const formData = new FormData();
    formData.append("Subject", data.Subject);
    formData.append("Category", data.Category);
    formData.append("Description", data.Description);
    formData.append("Sub_Category", data.Sub_Category);
    formData.append("File", data.File[0]);

  try {
      const res = await axios.post("http://localhost:3000/api/ticket", formData)
      if(res.data.success){
        toast.success(res.data.message)
        redirect("/")
       }else{
        toast.error(res.data.message)
       }
  } catch (error) {
    toast.error(error)
  }
      

  }

  return (
    <>
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 rounded-4 w-100" style={{ maxWidth: "600px" }}>
        <h4 className="text-center text-primary fw-bold mb-4">🎫 Create Ticket</h4>
        <form method="post" encType="multi" onSubmit={handleSubmit(SubTicket)}>
       
          <div className="mb-3">
            <label className="form-label fw-semibold">Subject *</label>
            <input
              type="text"
              className="form-control"
              name="Subject"

              {...register("Subject")}
              placeholder="Enter your ticket subject"
              required
            />
          </div>

          {/* Category & Sub-Category */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Category *</label>
              <select className="form-select" {...register("Category")} name="Category" required>
                <option selected disabled>Select Category</option>
                <option value="Administrator">Administrator</option>
                <option value="Developer">Developer</option>
                <option value="Support">Support</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Sub-Category *</label>
              <select className="form-select"{...register("Sub_Category")} name="Sub_Category" required>
                <option selected disabled>Select Category</option>
                <option value="Administrator">Administrator</option>
                <option value="Developer">Developer</option>
                <option value="Support">Support</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea

              className="form-control"
              rows="0"
              name="Description"
              placeholder="Enter details..."
              {...register("Description")}
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Attachments</label>
           
            <input type="file" name="File" {...register("File")} className="form-control" required multiple/>
          </div>

   
          <div className="d-flex justify-content-between mt-3">
            <button type="reset" className="btn btn-outline-secondary px-4">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>


    
    </>


  );
}

export default CreateTicket;
