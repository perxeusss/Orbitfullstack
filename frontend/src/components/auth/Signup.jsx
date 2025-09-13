import React, { useEffect, useState } from "react";
import NavBar from "../shared/NavBar.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constants.js"; // wherever you keep it
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice.js";
import { Loader2 } from "lucide-react";


export const Signup = () => {

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  // setInput({keep the input same(or intilaise empty strings) , update particular field with it's field name})
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }
  const navigate = useNavigate() // for sending one page to another 
  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData() // as we will use files 

    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data" // as we are sending form data
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex text-bold text-xl justify-center mb-5">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-xl p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-2">
            <Label className="my-2">Full Name</Label>
            <Input type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Full Name" />
          </div>

          <div className="my-2">
            <Label className="my-2">Email</Label>
            <Input type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="abc@gmail.com" />
          </div>

          <div className="my-2">
            <Label className="my-2">Phone Number</Label>
            <Input type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="1234567890" />
          </div>

          <div className="my-2">
            <Label className="my-2">Password</Label>
            <Input type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password" />
          </div>

          <div className="flex justify-between">

            <RadioGroup className="flex justify-between my-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {
            loading ?
              (
                <Button disabled className="w-full bg-[#cc1212] hover:bg-[#030101]"> <Loader2 className=" h-4 w-4 animate-spin" /> Please wait</Button>
              )
              :
              (
                <Button type="submit" className="w-full bg-[#cc1212] hover:bg-[#030101]">SignUp</Button>
              )
          }
          <span className="text-sm my-2"> Already have and account?
            <Link to="/login" className="mx-2 text-blue-600"> Login </Link>
          </span>
        </form>
      </div>
    </>
  );
};
