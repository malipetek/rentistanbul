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

	/** @type {{src: string, alt: string}[]} */
	export let images = [
		{
			src: 'https://picsum.photos/seed/133/600/600',
			alt: 'Flat living room'
		},
		{
			src: 'https://picsum.photos/seed/341/600/600',
			alt: 'Flat bathroom'
		},
		{
			src: 'https://picsum.photos/seed/122/600/600',
			alt: 'Flat kitchen'
		}
	];
	export let title = '2 Room Flat';
	export let subtitle = 'Istanbul, Beyoğlu';
	export let description =
		'Charming one-bedroom apartment in Beyoğlu, the cultural and historical center of the city. This flat offers a spacious living room with a sofa bed, a fully equipped kitchen, a bathroom with a shower, and a balcony with a stunning view of the Golden Horn. The flat is located on the third floor of a renovated building with an elevator and security. You will have access to free Wi-Fi, cable TV, air conditioning, heating, and a washing machine. The flat is ideal for couples, solo travelers, or business guests who want to enjoy the vibrant and diverse atmosphere of Beyoğlu. You will be within walking distance of many attractions.';

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

<div class="flat-card rounded shadow-lg grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 mb-12">
	<div class="gallery px-8">
		<div class="grid grid-cols-3 grid-rows-2 h-full max-h-96 rounded-lg overflow-hidden">
			{#each images as image, index (image.src)}
				<div
					class:col-span-1={index > 0}
					class:row-span-1={index > 0}
					class="object-cover w-full h-full"
					class:row-span-2={index === 0}
					class:col-span-2={index === 0}
				>
					<img class="object-cover w-full h-full" src={image.src} alt={image.alt} />
				</div>
			{/each}
		</div>
	</div>
	<div class="details pl-4 pr-16">
		<h2 class="text-2xl mb-1">{title}</h2>
		<h3 class="text-xl mb-4 text-slate-600">{subtitle}</h3>
		<a
      href="/flat/123"
			class="bg-sky-800 text-sky-200 px-8 py-2 rounded-lg mt-8 mr-4 shadow-sm hover:shadow-lg transition-shadow"
		>
			Discover
    </a>
		<button
			type="button"
			class="bg-teal-800 text-teal-200 px-8 py-2 rounded-lg mt-8 mr-4 shadow-sm hover:shadow-lg transition-shadow"
		>
			Rent
		</button>
	</div>
	<div class="pl-8 pr-16 py-4 col-span-2">
		<p class="text-base text-slate-600">{description}</p>
	</div>
</div>
