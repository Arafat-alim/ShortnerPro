import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortner <br />
        you'll ever need! 👇
      </h2>
      <form
        onSubmit={handleSubmit}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:W-2/4 gap-2"
      >
        <Input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter your Loooong URL"
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full" type="submit" variant="destructive">
          Shortner
        </Button>
      </form>
      <img
        src="/public/banner1.jpg"
        alt="banner"
        className="w-full my-11 md:mx-11"
      />

      <Accordion type="multiple" collapsible className="w-full pb-4 md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>1. What is URL Shortener?</AccordionTrigger>
          <AccordionContent>
            URL Shortener is a web application that allows users to convert long
            URLs into shorter, more manageable links. This service helps make
            URLs easier to share, track, and analyze.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>2. How does URL Shortener work?</AccordionTrigger>
          <AccordionContent>
            Users input a long URL into the application, and the service
            generates a shorter, unique URL. When someone clicks on the
            shortened URL, they are redirected to the original long URL
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            3. Why should I use URL Shortener?
          </AccordionTrigger>
          <AccordionContent>
            URL Shortener makes it easier to share links on social media, in
            emails, and in other communications. It also provides analytics to
            track how often your links are clicked and where the clicks are
            coming from.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>4. Is URL Shortener free to use?</AccordionTrigger>
          <AccordionContent>
            Yes, URL Shortener offers a free tier with basic features. Advanced
            features and analytics may be available through a premium
            subscription plan.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            5. Can I customize my shortened URL?
          </AccordionTrigger>
          <AccordionContent>
            Yes, URL Shortener allows users to customize the suffix of their
            shortened URLs, making them more relevant and easier to remember.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            6. How can I track the performance of my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            URL Shortener provides detailed analytics, including the number of
            clicks, geographic location of clicks, referral sources, and more.
            You can access these analytics through your user dashboard.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>
            7. Is there a limit to the number of URLs I can shorten?
          </AccordionTrigger>
          <AccordionContent>
            The free tier may have limitations on the number of URLs you can
            shorten per month. Premium plans offer higher limits or unlimited
            URL shortening capabilities.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>
            8. Are the shortened URLs permanent?
          </AccordionTrigger>
          <AccordionContent>
            Yes, once a URL is shortened, it remains active and functional
            unless you decide to delete it. URL Shortener ensures that your
            links remain operational for as long as you need them.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger>9. Can I delete a shortened URL?</AccordionTrigger>
          <AccordionContent>
            Yes, users have the option to delete their shortened URLs at any
            time through their dashboard. Deleting a URL will make it inactive
            and it will no longer redirect to the original link.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-10">
          <AccordionTrigger>10. How secure is URL Shortener?</AccordionTrigger>
          <AccordionContent>
            URL Shortener uses industry-standard security measures to protect
            user data and ensure the integrity of shortened links. All data is
            encrypted and stored securely, and the service monitors for
            suspicious activity to prevent abuse.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landing;
