<script>
  export let data;
  import Block from '../../components/block.svelte';
</script>

{#each data.data.content as block}
<Block data={block} />
{/each}