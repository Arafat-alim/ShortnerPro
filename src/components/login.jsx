import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Error from "./error";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const [name, value] = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to your accoout, if you have one!</CardDescription>
        <Error message={"Something went wrong"} />
      </CardHeader>
      <CardContent classname="space-y-2">
        <div className="space=y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
          <Error message={"Something went wrong"} />
        </div>
        <div className="space=y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter your Password"
            onChange={handleInputChange}
          />
          <Error message={"Something went wrong"} />
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          {" "}
          {false ? <BeatLoader size={8} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
