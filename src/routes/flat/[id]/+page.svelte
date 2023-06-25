<script>
	import isFuture from 'date-fns/isFuture';
	import differenceInDays from 'date-fns/differenceInDays';
	import { enhance } from '$app/forms';

  /** @type {import('./$types').PageData} */
	export let data;
	/** @type {{title:string, description:string}} */
	export let rental = {...data.rental};
	// import function to register Swiper custom elements
	import { register } from 'swiper/element/bundle';
	// register Swiper custom elements
	register();
	import 'swiper/css';

	import { DatePicker } from 'date-picker-svelte';
	let start_date, end_date;
	let today = Date.now();
	// if it is before today make it today
	let avail_start_date = isFuture(new Date(rental.available_start)) ? new Date(rental.available_start) : new Date();
	let avail_end_date = new Date(rental.available_end);
	const dateDiffDays = differenceInDays(avail_end_date, avail_start_date);

	import {onMount} from 'svelte';
    let mapComponent;
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox'
    let lat = 41.0567073;
    let lng = 28.9889063;
    let zoom = 10;

    onMount(() => {
      mapComponent.setCenter([lng,lat],zoom) // zoom is optional
      mapComponent.flyTo({center:[lng,lat], zoom}) // documentation (https://docs.mapbox.com/mapbox-gl-js/example/flyto)
    });

		let formResult;

</script>
<div class="md:grid md:grid-cols-2 md:grid-rows-1 md:gap-8">
	<div class="gallery w-full overflow-hidden">
		<swiper-container class="mb-4 rounded-2xl overflow-hidden min-h-[100px]" thumbs-swiper=".thumbnails" loop="true" 
		auto-height="true"
		calculate-height="true">
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
			<swiper-slide class="p-1 sm:p-4">
				<img class="object-cover rounded-md" src={`https://directus-production-3791.up.railway.app/assets/${image}`} alt={image} />
			</swiper-slide>
			{/each}
		</swiper-container>
		<div class="inline-flex w-auto grid grid-cols-4">
			{#each [1,2,3,4] as i}
				<div>
					<div class="material-symbols-outlined text-theme text-[5rem] flex-1">{rental['icon'+i]}</div>
					<div class="text-theme text-lg flex-1">{rental['text'+i]}</div>
				</div>
			{/each}
		</div>
	</div>
	<article class="details mt-12 md:mt-0 px-4 md:px-0 lg:px-0">
		<h1 class="text-4xl mb-4">{rental.title} <span class="price text-slate-600 text-lg">${rental.price}/night</span></h1>
		<h3 class="text-xl mb-4 text-slate-600">{rental.address}</h3>
		<p>{@html rental.description}</p>
		
		<form method="POST" use:enhance={({ formElement, formData, action, cancel, submitter }) => {
			// `formElement` is this `<form>` element
			// `formData` is its `FormData` object that's about to be submitted
			// `action` is the URL to which the form is posted
			// calling `cancel()` will prevent the submission
			// `submitter` is the `HTMLElement` that caused the form to be submitted

			return async ({ result, update }) => {
				formResult = result;
			};
	}} class="space-y-8">
		{#if dateDiffDays > 0 }
		<h2 class="text-3xl mb-4 mt-12">Available Dates</h2>
		<div class="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
			<input hidden type="text" name="start_date" value={start_date?.toISOString() || ''} />
			<input hidden type="text" name="end_date" value={end_date?.toISOString() || ''} />
			<input hidden type="text" name="rental_id" value={rental.id} />
			<div class="flex flex-col">
				<label class="text-lg"> Pick start date: { start_date?.toDateString() || '--' } </label>
				<DatePicker 
				bind:value={start_date}
				min={avail_start_date}
				max={avail_end_date}
				/>
			</div>
			<div class="mt-8 lg:mt-0 flex flex-col">
				<label class="text-lg"> Pick end date { end_date?.toDateString() || '--' } </label>
				<DatePicker 
				bind:value={end_date}
				min={avail_start_date}
				max={avail_end_date}
				/>
			</div>
		</div>
		<br>
		<div class="flex flex-col">
			<label for="email"> Email </label>
			<input type="email" name="email" required class="appearance-none block border border-gray-300 rounded-md py-2 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email">
		</div>

		{#if formResult && formResult.type === 'failure'}
			<div class="relative w-full shadow-lg bg-red-100 border-gray-400 p-8 text-xl text-red-700">
				{ (formResult?.data?.errors || 'unknown error') }
			</div>
		{:else if formResult}
			<div class="relative w-full shadow-lg bg-green-100 border-gray-400 p-8 text-xl text-green-700">
				Reservation request received, we will email you shortly.
			</div>
		{/if}
		<button type="submit" class="bg-theme text-white px-8 py-2 rounded-lg mt-8 mr-4 shadow-sm hover:shadow-lg transition-shadow">Request Reservation</button>
		{:else}
		<div class="relative w-full h-96 shadow-lg bg-red-100 border-gray-400 p-8">
			No available dates at this time. Check back later or <a class="text-theme text-xl" href="/contact"> contact us </a> if you think something is wrong.
			<img class="w-64 absolute right-6 bottom-6 z-0" src="/images/full.png" />
		</div>
		{/if}
	</form>
	</article>

</div>

<div class="map-container h-[80vh] mb-[30vh] px-4 md:px-0">
	<h3 class="text-3xl mt-12 mb-6"> Location </h3>
  <Map 
    accessToken="pk.eyJ1IjoibWFsaXBldGVrIiwiYSI6ImNsamE1cmdlOTFmazczaHFuNWd4aXFmZzEifQ.o6BYqxdbYqCpCzXqKeGImA" 
    bind:this={mapComponent}
    options={{ scrollZoom: false }}
    >
    <Marker lat={rental.location.coordinates[1]} lng={rental.location.coordinates[0]} > 
      <img src="/images/home_pin.svg" alt="home pin on map"/>
    </Marker>
  </Map>
</div>
