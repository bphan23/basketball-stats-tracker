import supabase from "./supabase";

export async function getPlayers() {
  const { data, error } = await supabase.from("players").select("*");

  if (error) {
    console.log(error);
    throw new Error("Error fetching players");
  }

  return data;
}
