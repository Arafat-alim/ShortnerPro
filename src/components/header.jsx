import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";

const Header = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();

  console.log("user", user);

  function createAbbreviation(fullName = "") {
    // Return early if the input is not a string or is empty
    if (typeof fullName !== "string" || fullName.trim() === "") {
      return "";
    }

    // Split the full name by spaces and filter out empty strings
    const nameParts = fullName.split(" ").filter((part) => part.trim() !== "");

    // Map the first character of each part to a new array
    const abbreviation = nameParts
      .map((part) => part[0].toUpperCase())
      .join("");

    return abbreviation;
  }

  return (
    <nav className="py-4 flex justify-between items-center">
      <Link to="/">
        <img
          src="/public/shrinker.png"
          alt="shrinker-pro-logo"
          className="w-40 "
        />
      </Link>
      {!user ? (
        <Button onClick={() => navigate("/auth")}>Login</Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
            <Avatar>
              <AvatarImage
                src={`${user?.user_metadata?.profile_pic}`}
                className="object-contain"
              />
              <AvatarFallback>
                {createAbbreviation(user?.user_metadata?.name)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LinkIcon className="h-4 w-4 mr-2" />
              <span>My Links</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default Header;
