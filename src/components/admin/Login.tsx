import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { account } from "@/lib/appwrite";
import Link from "next/link";
import { ArrowBigLeftDash } from "lucide-react";


const Login = ({ onLogin }: { onLogin: () => void }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const session = await account.createEmailPasswordSession(email, password);
      console.log(session); // Success
      onLogin(); // Call the onLogin function to update the parent component's state
    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </form>
      </CardContent>
      <CardFooter className="flex flex-row gap-x-1">
        <Link href={"/"}>
          <Button className="" >
            <ArrowBigLeftDash className="w-4 h-4" />
          </Button>
        </Link>
        <Button type="submit" className="w-full" disabled={isLoading} onClick={handleLogin}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </CardFooter>
    </Card>
  )
}


export default Login;
