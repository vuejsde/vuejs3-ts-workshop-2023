<script setup lang="ts">
type Props = {
  show: boolean;
}

defineProps<Props>()
defineEmits(['confirm', 'cancel'])
</script>

<template>
  <dialog :open="show">
    <article>
      <a href="#close" aria-label="Close" class="close" @click.prevent="$emit('cancel')"></a>
      <h3>
        <slot name="header">Do you want to confirm?</slot>
      </h3>
      <p>
        <slot name="body">Do you really want to confirm your action?</slot>
      </p>
      <footer>
        <a href="#cancel" role="button" class="secondary" @click.prevent="$emit('cancel')">
          Cancel
        </a>
        <a href="#confirm" role="button" @click.prevent="$emit('confirm')">
          Confirm
        </a>
      </footer>
    </article>
  </dialog>
</template>