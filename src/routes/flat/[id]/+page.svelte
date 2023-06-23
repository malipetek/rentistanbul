<script>
  /** @type {import('./$types').PageData} */
	export let data;
	/** @type {{title:string, description:string}} */
	export let rental = {...data.rental};
	// import function to register Swiper custom elements
	import { register } from 'swiper/element/bundle';
	// register Swiper custom elements
	register();
	import 'swiper/css';
</script>
<div class="md:grid md:grid-cols-2 md:grid-rows-1 md:gap-8">
	<div class="gallery w-full">
		<swiper-container class="mb-4 rounded-2xl overflow-hidden" thumbs-swiper=".thumbnails" loop="true" >
			{#each [rental.image, ...rental.images] as image, index}
			<swiper-slide>
				<img src={`https://directus-production-3791.up.railway.app/assets/${image}`} alt={image} />
			</swiper-slide>
			{/each}
		</swiper-container>
		<swiper-container 
					class="thumbnails" 
					loop="true" 
					space-between="10" 
					slides-per-view="4" 
					free-mode="true"
					watch-slides-progress="true">
			{#each [rental.image, ...rental.images] as image, index}
			<swiper-slide class="p-4">
				<img class="object-cover rounded-md" src={`https://directus-production-3791.up.railway.app/assets/${image}`} alt={image} />
			</swiper-slide>
			{/each}
		</swiper-container>
	</div>
	<article class="details mt-12 md:mt-0 px-8 md:px-0">
		<h1 class="text-4xl mb-4">{rental.title}</h1>
		<p>{@html rental.description}</p>
	</article>
</div>

