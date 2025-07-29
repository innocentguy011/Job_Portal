import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false); // 👈 Local loader state

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      setFormLoading(true); // 👈 start spinner
      dispatch(setLoading(true));
      const res = await axios.post("https://careenow-1.onrender.com/api/v1/user/register", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
      setFormLoading(false); // 👈 stop spinner
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xl border border-gray-200 rounded-xl shadow-md p-6 mt-10 bg-white space-y-5"
        >
          <h1 className="font-bold text-2xl text-gray-800">Create an Account</h1>

          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label>Email Address</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@email.com"
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="e.g. +91 94XXXXXXX"
            />
          </div>

          <div className="relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[38px]"
            >
              {showPassword ? (
                <FiEyeOff size={20} color={input.password ? 'black' : '#60a5fa'} />
              ) : (
                <FiEye size={20} color={input.password ? 'black' : '#60a5fa'} />
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
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

          {formLoading ? (
            <Button className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md shadow-sm transition duration-200"
            >
              Sign Up
            </Button>
          )}

          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
