<script>
	// import function to register Swiper custom elements
	import { register } from 'swiper/element/bundle';
	// register Swiper custom elements
	register();
	import 'swiper/css';

	/** @type {HTMLElement|null} */
	let swiper_container;

	/** @type {import('swiper').Swiper|null}*/
	let swiper;

	import { onMount } from 'svelte';

	export let data = {};

	export let title = data.title;
	export let subtitle = data.address;
	export let description = data.description;

	function handleGallery() {
		if (swiper_container) {
			swiper = new Swiper('.swiper', {
				slidesPerView: 3,
				grid: {
					rows: 3
				},
				mousewheel: {
					forceToAxis: true
				}
			});
		}
	}

	onMount(() => {
		handleGallery();
	});
</script>

<div class="flat-card rounded shadow-lg flex flex-col md:grid md:grid-cols-2 md:grid-rows-1 mb-12">
	<div class="gallery px-8 col-span-1">
		<div class="h-full max-h-96 rounded-lg overflow-hidden">
			<img class="object-cover w-full h-full aspect-square" src={`https://directus-production-3791.up.railway.app/assets/${data.image}`} alt={data.image} />
		</div>
	</div>
	<div class="details px-8 mt-8 md:mt-0 md:pl-4 md:pr-16 col-span-1">
		<h2 class="text-2xl mb-1">{title}</h2>
		<h3 class="text-xl mb-4 text-slate-600">{subtitle}</h3>
		<a
      href="/flat/1"
			class="bg-theme inline-block text-sky-200 px-8 py-2 rounded-lg mt-8 mr-4 shadow-sm hover:shadow-lg transition-shadow"
		>
			Check Available Dates
    </a>
	</div>
	<div class="pl-8 pr-16 py-4 col-span-2">
		<article class="prose lg:prose-xl w-full inline">
			<p class="text-base text-slate-600">{@html (description||'').slice(0,200)+'...'}</p>
		</article>
	</div>
</div>
