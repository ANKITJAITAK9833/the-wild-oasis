import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.error("Error fetching cabins:", error);
    throw new Error("Could not fetch cabins");
  }
  return cabins;
}

export async function createEditCabin(cabin, id) {
  console.log(cabin, id);
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${cabin.image?.name || Math.random() + new Date()}`.replaceAll("/", "") ;
  const imagePath = hasImagePath ? cabin.image :`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

// 1. Create/Edit cabin entry in the database
let query = supabase
  .from('cabins');
 
  // Create new cabin
  if(!id){
    query = query.insert([
    { name: cabin.name, maxCapacity: cabin.maxCapacity, regularPrice: cabin.regularPrice, discount: cabin.discount, description: cabin.description, image: imagePath },
  ]);
  }
  // Edit existing cabin
  if(id){
   query =  query.update(
      { name: cabin.name, maxCapacity: cabin.maxCapacity, regularPrice: cabin.regularPrice, discount: cabin.discount, description: cabin.description, image: imagePath }
    ).eq('id', id);
  }
const { data, error } = await query.select().single();
  

    
  if (error) {
    console.error("Error creating cabin:", error);
    throw new Error("Could not create cabin", error);
  }
  if(hasImagePath) return data;

  // 2. Upload image to storage if there's a new image
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, cabin.image);

  if (storageError) {
     await supabase
    .from('cabins')
    .delete()
    .eq('id', cabin.id);
    console.error("Error uploading image:", storageError);
    throw new Error("Could not upload image and hence cabin was not created", storageError);
  } 
  return data;
}

export async function deleteCabin(cabinId) {

  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', cabinId);

  if (error) {
    console.error("Error deleting cabin:", error);
    throw new Error("Could not delete cabin", error);
  }
  return data;
}