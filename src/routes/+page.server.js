import { error } from '@sveltejs/kit';
import { BYPASS_TOKEN, DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  try {
    const url = new URL(`${DIRECTUS_URL}/items/pages`);
    url.searchParams.append('filter[url][_eq]', '/');
    url.searchParams.append('fields[]', 'content.item:blocks.*');
    url.searchParams.append('limit', '100');
    const res = await fetch(url, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`
      },
    });
    const { data } = await res.json();
    let [pagedata] = (data || []);

    pagedata.content = await Promise.all(pagedata.content.map(async (e) => {
      if (e.item.type === 'rental_card') {
        const url = new URL(`${DIRECTUS_URL}/items/rentals/${e.item.entity}`);
        const res = await fetch(url, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${DIRECTUS_TOKEN}`
          },
        });
        e.item.entity = (await res.json()).data;
      }
      if (e.item.type === 'slider') {
        const url = new URL(`${DIRECTUS_URL}/items/blocks/${e.item.id}`);
        url.searchParams.append('fields[]', 'type,image,images.*');
        const res = await fetch(url, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${DIRECTUS_TOKEN}`
          },
        });
        e.item = (await res.json()).data;
      }
      return e;
    }));
        return {
          params,
          data: pagedata
        };
  } catch (err) {
    throw error(404, err.message);
  }
}

export const config = {
  isr: {
    bypassToken: BYPASS_TOKEN,
    expiration: 60,
  },
};