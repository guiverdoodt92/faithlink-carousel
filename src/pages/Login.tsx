import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    phoneRegion: '',
    instagramHandle: '',
    facebookHandle: '',
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = isSignUp 
        ? await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: {
                full_name: formData.fullName,
                phone_number: formData.phoneNumber,
                phone_region: formData.phoneRegion,
                instagram_handle: formData.instagramHandle,
                facebook_handle: formData.facebookHandle,
              }
            }
          })
        : await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });

      if (error) throw error;
      
      if (data.user) {
        toast.success(isSignUp ? "Account created successfully!" : "Logged in successfully!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            FaithLink
          </h1>
          <p className="text-gray-500">Connect with your spiritual community</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center space-x-4">
            <Button
              variant={isSignUp ? "outline" : "default"}
              onClick={() => setIsSignUp(false)}
            >
              Login
            </Button>
            <Button
              variant={isSignUp ? "default" : "outline"}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
            </div>

            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneRegion">Region Code</Label>
                    <Input
                      id="phoneRegion"
                      name="phoneRegion"
                      type="text"
                      value={formData.phoneRegion}
                      onChange={handleInputChange}
                      placeholder="e.g., US"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagramHandle">Instagram Handle</Label>
                  <Input
                    id="instagramHandle"
                    name="instagramHandle"
                    type="text"
                    value={formData.instagramHandle}
                    onChange={handleInputChange}
                    placeholder="@yourusername"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebookHandle">Facebook Handle</Label>
                  <Input
                    id="facebookHandle"
                    name="facebookHandle"
                    type="text"
                    value={formData.facebookHandle}
                    onChange={handleInputChange}
                    placeholder="@yourusername"
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full">
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#4F46E5',
                    brandAccent: '#4338CA',
                  }
                }
              }
            }}
            providers={["google"]}
            redirectTo={window.location.origin}
            onlyThirdPartyProviders
          />
        </div>
      </div>
    </div>
  );
};

export default Login;