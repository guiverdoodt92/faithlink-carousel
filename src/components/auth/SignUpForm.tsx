import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SignUpFormData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  phoneRegion: string;
  instagramHandle: string;
  facebookHandle: string;
}

export const SignUpForm = ({ onToggle }: { onToggle: () => void }) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    phoneRegion: "",
    instagramHandle: "",
    facebookHandle: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            phone_region: formData.phoneRegion,
            instagram_handle: formData.instagramHandle,
            facebook_handle: formData.facebookHandle,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Account created successfully! Please check your email to verify your account.");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
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
          placeholder="Enter your password (min. 6 characters)"
        />
      </div>

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

      <Button type="submit" className="w-full">
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onToggle}
          className="text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};