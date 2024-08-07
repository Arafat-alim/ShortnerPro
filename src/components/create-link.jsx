import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import UrlValidator from "@/hooks/use-urlValidator";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { isValid, validateUrl } = UrlValidator();
  const longLink = searchParams.get("createNow");

  const [formData, setFormData] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const ref = useRef();

  useEffect(() => {
    validateUrl(formData.longUrl);
  }, [formData.longUrl]);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AlertDialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({}); // this feature isnt tested yet.
      }}
    >
      <AlertDialogTrigger>
        <Button variant="destructive">Create Link</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Create new</AlertDialogTitle>
        </AlertDialogHeader>

        {isValid && <QRCode values={formData.longUrl} size={250} ref={ref} />}
        <Input
          name="title"
          value={formData.value}
          type="text"
          placeholder="Enter a title"
          onChange={handleChange}
        />
        <Error message={"Some error"} />

        <Input
          name="longUrl"
          onChange={handleChange}
          value={formData.longUrl}
          type="url"
          placeholder="Enter a long url"
          disabled={longLink ? true : false}
        />

        {formData.longUrl ? (
          !isValid ? (
            <Error message={"Please paste the valid URL"} />
          ) : null
        ) : null}
        <div className="flex items-center gap-2">
          <Card className="p-2">localhost</Card>
          <Input
            name="customUrl"
            type="url"
            placeholder="Enter a Custom Link (Optional)"
            onChange={handleChange}
            value={formData.customUrl}
          />
        </div>
        <Error message={"Some error"} />

        <AlertDialogFooter className="sm:justify-start">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Create</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateLink;
