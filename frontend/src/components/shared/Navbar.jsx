import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("https://careenow-1.onrender.com/api/v1/user/logout", { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Logout failed.');
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16">
        {/* Logo */}
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold tracking-wide text-gray-800">
              Career<span className="text-[#F83002]">Now</span>
            </h1>
          </Link>
        </div>

        {/* Navigation + Actions */}
        <div className="flex items-center gap-10">
          {/* Links */}
          <ul className="flex font-medium items-center gap-6 text-gray-700">
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link className="hover:text-[#F83002] transition-colors" to="/admin/companies">Companies</Link></li>
                <li><Link className="hover:text-[#F83002] transition-colors" to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link className="hover:text-[#F83002] transition-colors" to="/">Home</Link></li>
                <li><Link className="hover:text-[#F83002] transition-colors" to="/jobs">Jobs</Link></li>
                <li><Link className="hover:text-[#F83002] transition-colors" to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {/* Auth Buttons or Avatar */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="hover:border-[#F83002] hover:text-[#F83002] transition-all">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#F83002] hover:bg-[#e12f00] text-white transition-all">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-orange-500 hover:scale-105 transition-transform">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 shadow-xl rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12 ring-2 ring-orange-500">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-gray-600">
                  {user?.role === 'student' && (
                    <div className="flex items-center gap-2 hover:text-[#F83002] transition-all">
                      <User2 size={18} />
                      <Link to="/profile">
                        <Button variant="link" className="p-0 text-sm">View Profile</Button>
                      </Link>
                    </div>
                  )}

                  <div className="flex items-center gap-2 hover:text-[#F83002] transition-all">
                    <LogOut size={18} />
                    <Button onClick={logoutHandler} variant="link" className="p-0 text-sm">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
