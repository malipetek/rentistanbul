import { writable } from 'svelte/store';
import { Directus } from '@directus/sdk';
import { 
  DIRECTUS_URL,
  DIRECTUS_TOKEN
 } from '$env/static/private'


function getDirectus() {
  if(!DIRECTUS_URL || !DIRECTUS_TOKEN) {
      throw new Error('Directus token not set');
  }
  const directus = new Directus(DIRECTUS_URL);
  
  directus.auth.static(DIRECTUS_TOKEN).then(() => { 
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