import { error } from '@sveltejs/kit';
import { BYPASS_TOKEN, DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  try {
    const url = new URL(`${DIRECTUS_URL}/items/rentals`);
    url.searchParams.append('fields', 'id,title,price,icon1,icon2,icon3,icon4,location');
    url.searchParams.append('limit', '50');
    const res = await fetch(url, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`
      },
    });
    const {data} = await res.json();
        return {
          params,
          rentals: data
        };
  } catch (err) {
    throw error(404, err.message);
  }
}

export const config = {
  isr: {
    // Random token that can be provided to bypass the cached version of the page with a __prerender_bypass=<token> cookie. Allows rendering content at request time for this route.
    bypassToken: BYPASS_TOKEN,

    // Expiration time (in seconds) before the cached asset will be re-generated by invoking the Serverless Function.
    // Setting the value to `false` means it will never expire.
    expiration: 60,
  },
};