import { setPreview } from "sveltekit-preview-mode";

/** @type {import('./$types').LayoutLoad} */
export async function load({data}) {
  console.log('isPreview', data);
  // setPreview(data?.isPreview);
};