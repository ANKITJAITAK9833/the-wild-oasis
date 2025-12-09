import supabase from "./supabase";

export async function getCabins(){
let { data: cabins, error } = await supabase
  .from('cabins')
  .select('*');

  if(error){
    console.error("Error fetching cabins:", error);
    throw new Error("Could not fetch cabins");
  }
  return cabins;
}