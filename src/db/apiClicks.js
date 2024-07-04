import supabase from "./supabase";

export async function getClicksForIds(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", url_id);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to load Clicks");
  }
  return data;
}
