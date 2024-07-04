import Error from "@/components/error";
import LinkCard from "@/components/link-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/context";
import { getClicksForIds } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const { user, loading: userLoading } = UrlState();

  const {
    data: urls,
    loading: urlLoading,
    error: urlError,
    fn: urlFn,
  } = useFetch(getUrls, user.id);

  const {
    data: clicks,
    loading: clickLoading,
    error: clickError,
    fn: clickFn,
  } = useFetch(
    getClicksForIds,
    urls?.data?.map((url) => url.id)
  );

  useEffect(() => {
    urlFn();
  }, []);

  useEffect(() => {
    if (urls?.data?.length) clickFn();
  }, [urls?.data.length]);

  const filteredUrls = urls?.data?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(urlLoading || clickLoading) && (
        <BarLoader width={"100%"} color="#fff" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.data?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <Button>Create Link</Button>
      </div>
      {/* rendering the links */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={handleInput}
        />
        <Filter className="absolute right-2 top-2 p-1" />
      </div>
      {urlError || clickError ? (
        <Error message={urlError.message || clickError.message} />
      ) : null}

      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={i} fetchUrl={urlFn} url={url} />;
      })}
    </div>
  );
};

export default Dashboard;
