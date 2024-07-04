import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
  return { data, error };
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
  return { data, error };
}

export async function createUrl(
  { title, custom_url, orginal_url, user_id },
  qrcode
) {
  //! create a short url
  const short_url = Math.random().toString(36).substring(2, 6);
  //! file name of qr
  const fileName = `qr-${qrcode}`;
  //! upload the qr
  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`;

  //! inserting the payload to the provided qr

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        custom_url: custom_url || null,
        short_url,
        user_id,
        qr,
        orginal_url,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Error occured while creating an URL");
  }

  return data;
}
