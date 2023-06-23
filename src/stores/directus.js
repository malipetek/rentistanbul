import { writable } from 'svelte/store';
import { config } from 'dotenv';
config();
import { Directus } from '@directus/sdk';


function getDirectus() {
  if(!process.env.DIRECTUS_URL || !process.env.DIRECTUS_TOKEN) {
      throw new Error('Directus token not set');
  }
  const directus = new Directus(process.env.DIRECTUS_URL);
  
  directus.auth.static(process.env.DIRECTUS_TOKEN).then(() => { 
    console.log('Directus connected');
  });
	
  const { subscribe, set, update } = writable({
    rentals: new Map
  });
  
  return {
    subscribe,
    /** @param {number} id */
    async loadRental(id) {
      const rental = await directus.items('rental').readOne(id);
      
      set(data => {
        data.rentals.set(id, rental);
        return data;
      });
    }
  }
}

export default getDirectus();