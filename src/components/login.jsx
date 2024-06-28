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
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { urlState } from "@/context";

const Login = () => {
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const {
    data,
    error: hookErr,
    loading,
    fn: fnLogin,
  } = useFetch(login, formData);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const { fetchUser } = urlState();

  useEffect(() => {
    if (hookErr === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, hookErr]);

  const handleLogin = async () => {
    setError([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email.")
          .required("Email is required."),
        password: Yup.string()
          .min(6, "Password must be atleast 6 character long.")
          .required("Password is required."),
      });

      await schema.validate(formData, { abortEarly: false });
      //! api call
      await fnLogin();
    } catch (e) {
      const newErrors = [];
      e?.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setError(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to your accoout, if you have one!</CardDescription>
        {hookErr && <Error message={hookErr.message} />}
      </CardHeader>
      <CardContent classname="space-y-2">
        <div className="space=y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleInputChange}
          />

          {error.email && <Error message={error.email} />}
        </div>
        <div className="mt-4">
          <Input
            name="password"
            type="password"
            placeholder="Enter your Password"
            onChange={handleInputChange}
          />

          {error.password && <Error message={error.password} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={8} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
