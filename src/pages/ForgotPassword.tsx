
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { useAuth } from '@/contexts/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar transparent />
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg animate-fade-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              {isSubmitted 
                ? "Check your email for the reset link"
                : "Enter your email address to receive a password reset link"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                <h3 className="font-medium text-green-800 mb-2">Email sent!</h3>
                <p className="text-green-700 text-sm">
                  We've sent you an email with a link to reset your password. Please check your inbox
                  and follow the instructions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Back to Login
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
