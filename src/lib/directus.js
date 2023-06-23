import { config } from 'dotenv';
config();
import {
  browser, dev,
} from '$app/environment';
import { 
  DIRECTUS_URL,
  DIRECTUS_TOKEN
 } from '$env/static/private'

import { Directus } from '@directus/sdk';

if(!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  throw new Error('Directus token not set');
}

const directus = new Directus(DIRECTUS_URL, {
  auth: {
    mode: 'json',
    staticToken: DIRECTUS_TOKEN,
  },
  storage: {
    prefix: 'directus_',
    mode: 'MemoryStorage'
  }
});

// directus.auth.static(process.env.DIRECTUS_TOKEN).then(() => {
//   console.log('Authenticated');
// });

export default directus;