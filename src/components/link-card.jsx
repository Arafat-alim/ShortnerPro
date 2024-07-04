import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrl }) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title || "download";

    if (!imageUrl) {
      console.error("Image URL not found");
      return;
    }

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  };

  const { fn: deleteFn, loading: deleteLoader } = useFetch(deleteUrl, url?.id);

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg ">
      <img
        src={
          url?.qr ||
          "https://cdn.iconscout.com/icon/premium/png-256-thumb/no-image-2840213-2359555.png"
        }
        alt="qr-image"
        className="h-32 object-contain ring ring-blue-500 self-start bg-white"
      />
      <Link className="flex flex-col flex-1">
        <span className="text-2xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-xl text-blue-400 hover:underline cursor-pointer">{`http://localhost:5173/${
          url?.custom_url ? url?.custom_url : url?.short_url
        }`}</span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url.orginal_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            navigator.clipboard.writeText(`http://localhost/${url.short_url}`);
            alert("Copied");
          }}
        >
          <Copy />
        </Button>
        <Button
          variant="ghost"
          onClick={downloadImage}
          disabled={url?.qr ? false : true}
          className={url?.qr ? "" : "cursor-not-allowed"}
        >
          <Download />
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            deleteFn().then(() => fetchUrl());
          }}
        >
          {deleteLoader ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
