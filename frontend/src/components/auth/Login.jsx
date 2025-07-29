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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import Eye and EyeOff icons

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false); 

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "https://careenow-1.onrender.com/api/v1/user/login",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10 relative">
          <h1 className="font-bold text-xl mb-5">Login</h1>

          {/* Email */}
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Password */}
<div className="my-2 relative">
  <Label>Password</Label>
  <Input
    type={showPassword ? 'text' : 'password'}
    value={input.password}
    name="password"
    onChange={changeEventHandler}
    placeholder="write your strong Password"
    required
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


          {/* Role Selection */}
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                required
              />
              <Label>Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>

          {/* Submit */}
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">Login</Button>
          )}

          {/* Link */}
          <span className="text-sm">
            Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
