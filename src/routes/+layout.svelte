<script>
  import { PreviewBanner } from "sveltekit-preview-mode";
  import "../app.css";

  export let data;

  const headerMenu = (data.menus || []).find(e => e.name == 'header');
  const footer_1 = (data.menus|| []).find(e => e.name == 'footer 1');
  const footer_2 = (data.menus|| []).find(e => e.name == 'footer 2');
</script>
<PreviewBanner />
<header class="flex px-8 py-2 bg-slate-200 h-14">
<div class="logo">
  <a href="/">
    <img class="w-8 h-8" src="/images/renthouse.svg" alt="logo">
  </a>
</div>
<ul class="flex gap-2 ml-2">
  {#each (headerMenu?.links || []) as link }
  <li class="border-red-500 p-2 hover:bg-slate-400 rounded-md cursor-pointer">
    <a href="{link.item.url}">
      { link.item.label }
    </a>
  </li>
  {/each}
</ul>
</header>

<section class="bg-slate-100 p-3 md:p-8">
  <slot />
</section>

<footer class="bg-slate-200 p-8 w-full grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1">
  <div class="col-span-1 flex flex-col">
    {#each (footer_1?.links || []) as link }
      <a href="{link.item.url}">
        { link.item.label }
      </a>
    {/each}
  </div>
  <div class="col-span-1 flex flex-col">

  </div>
  <div class="col-span-1 flex flex-col">
    {#each (footer_2?.links || []) as link }
    <a href="{link.item.url}">
      { link.item.label }
    </a>
  {/each}
  </div>
  <div class="md:col-span-3 w-full text-center py-16"> { 'All rights reserved ®'} </div>
</footer>
