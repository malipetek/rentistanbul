import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const body = await event.request.formData();

    const res = await fetch(`${DIRECTUS_URL}/items/contact_form_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`
      },
      body: JSON.stringify(Object.fromEntries(body))
    });

    if (res.ok) {
      throw redirect(303, '/contact/thankyou');
    } else {
      throw redirect(303, '/contact/error');
    }
  }
};