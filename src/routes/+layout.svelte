<script>
  import { PreviewBanner } from "sveltekit-preview-mode";
  import "../app.css";
</script>
<PreviewBanner />
<header class="flex px-8 py-2 bg-slate-200 h-14">
<div class="logo">
  <a href="/">
    <img class="w-8 h-8" src="/images/renthouse.svg" alt="logo">
  </a>
</div>
<ul class="flex gap-2 ml-2">
  <li class="border-red-500 p-2 hover:bg-slate-400 rounded-md cursor-pointer">
    Home
  </li>
  <li class="border-red-500 p-2 hover:bg-slate-400 rounded-md cursor-pointer">
    Flats for rent
  </li>
</ul>
</header>

<section class="bg-slate-100 p-8">
  <slot />
</section>

<footer class="bg-slate-200 p-8 h-16 pb-16">
Footer
</footer>
