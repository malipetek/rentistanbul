<script>
    export let data;
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

</script>

<div class="map-container h-[80vh]">
  <Map 
    accessToken="pk.eyJ1IjoibWFsaXBldGVrIiwiYSI6ImNsamE1cmdlOTFmazczaHFuNWd4aXFmZzEifQ.o6BYqxdbYqCpCzXqKeGImA" 
    bind:this={mapComponent}
    options={{ scrollZoom: true }}
    >
    {#each data.rentals as rental}
    <Marker lat={rental.location.coordinates[1]} lng={rental.location.coordinates[0]} > 
      <img src="/images/home_pin.svg" alt="home pin on map"/>
      <a slot="popup" target="_blank" href="/flat/{rental.id}"> {rental.title} </a>
    </Marker>
    {/each}
  </Map>
</div>

<style>
  :global(.mapboxgl-marker){
    cursor: pointer;
  }   
</style>
