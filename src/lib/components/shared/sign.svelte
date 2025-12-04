<script>
  import { fade } from "svelte/transition";
    import { tooltip } from '$lib/actions/tooltip';

  const props = $props();
</script>

<div
  class="tooltip-target"
  transition:fade
  use:tooltip={{
    content: props.tooltipContent,
    animation: "perspective-subtle",
  }}
>
  <p class="error">
    {props.markingSign}
  </p>
</div>

<style>
  div.tooltip-target {
    height: 1.3rem;
    width: 1.3rem;
    background-color: red;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;

    & p.error {
      font-weight: 900;
      text-align: center;
      color: white;
    }
  }
</style>
