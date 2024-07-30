<script>
  export let data = {};
  // console.log('page data', data);
  import RentalCard from './flat-card.svelte';
  import 'swipe-scroller/style';
  import Scroller from 'swipe-scroller/Scroller.svelte';
</script>

{#if data.item.type === 'rental_card'}
  <RentalCard data={data.item.entity} />

{:else if data.item.type === 'two_column'}
  <div class="flat-card rounded shadow-lg grid grid-cols-1 md:grid-cols-2 mb-12">
    <div class="p-8">
      <div class="h-full max-h-96 rounded-lg overflow-hidden">
        <img class="object-cover w-full h-full aspect-square" src={`https://rentistanbul.malipetek.dev/assets/${data.item.image}`} alt={data.item.image} />
      </div>
		</div>
    <div class="p-8">
      <article class="prose lg:prose-lg inline">
        {@html (data.item.content || '')}
      </article>
    </div>
  </div>
{:else if data.item.type === 'image'}
  <div class="flat-card rounded shadow-lg grid grid-cols-1 mb-12 relative">
    <div class="h-full max-h-96 rounded-lg overflow-hidden">
      <img class="object-cover w-full h-full aspect-square" src={`https://rentistanbul.malipetek.dev/assets/${data.item.image}`} alt={data.item.image} />
      {#if data.item.image_overlay}
        <div class="overlay-backdrop absolute inset-0 z-10 rounded-lg"></div>
        <div class="absolute bottom-0 p-2 pb-5 overlay-content z-30" style="color: {data.item.overlay_text_color}">
          <article class="prose lg:prose-lg inline">
            {@html (data.item.content || '')}
          </article>
        </div>
      {/if}
    </div>
  </div>
{:else if data.item.type === 'slider'}
  <Scroller class="mb-4 rounded-2xl overflow-hidden min-h-[100px]" 
      slides-per-view="2"
      space-betwwen="10"
      loop="true" 
      auto-height="true"
      calculate-height="true"
      >
        {#each data.item.images as image, index}
        <div class="h-full max-h-96 px-2">
          <div class="h-96 rounded-lg overflow-hidden">
            <img class="object-cover w-full h-full aspect-square" src={`https://rentistanbul.malipetek.dev/assets/${image.directus_files_id}`} alt={image.directus_files_id} />
          </div>
        </div>
        {/each}
      </Scroller>
{:else if data.item.type === 'text'}
  <div class="flat-card rounded shadow-lg grid grid-cols-1 mb-12 p-8">
      <article class="prose lg:prose-lg inline">
      {@html (data.item.content || '')}
      </article>
  </div>

  {/if}


  <style>
    :global(.overlay-content *) {
      color: inherit !important;
    }

    .overlay-backdrop {
      background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
    }
  </style>