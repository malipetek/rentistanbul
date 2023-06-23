import previewMode from "sveltekit-preview-mode";
import { env } from "$env/dynamic/private";

/** @type {import('@sveltejs/kit').Handle} */
// export async function handle({ event, resolve }) { 
//   console.log('Hoooooker', env.PREVIEW_SECRET);
  
//   let hookresponse = previewMode({
//     previewSecret: env.PREVIEW_SECRET,
//     cookieName: '__prerender_bypass'
//   });

//   console.log('event.locals ', event.locals);
//   event.locals.isPreview = true;
//   return hookresponse({event, resolve});
// }

export const handle = previewMode({
  previewSecret: env.PREVIEW_SECRET,
  cookieName: '__prerender_bypass'
});