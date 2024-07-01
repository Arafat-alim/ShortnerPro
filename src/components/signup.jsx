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
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { urlState } from "@/context";

const Signup = () => {
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const {
    data,
    error: hookErr,
    loading,
    fn: fnSignUp,
  } = useFetch(signup, formData);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const { fetchUser } = urlState();

  useEffect(() => {
    if (hookErr === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [loading, hookErr]);

  const handleSignup = async () => {
    setError([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email.")
          .required("Email is required."),
        password: Yup.string()
          .min(6, "Password must be atleast 6 character long.")
          .required("Password is required."),
        name: Yup.string().required("Name is required"),
        profile_pic: Yup.mixed().required("Profile Picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      //! api call
      await fnSignUp();
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
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create a new account if you haven't!</CardDescription>
        {hookErr && <Error message={hookErr.message} />}
      </CardHeader>
      <CardContent classname="space-y-2">
        <div className="space=y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={handleInputChange}
          />

          {error.name && <Error message={error.name} />}
        </div>
        <div className="mt-4">
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
        <div className="mt-4">
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />

          {error.profile_pic && <Error message={error.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? <BeatLoader size={8} color="#36d7b7" /> : "SIgn Up"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
