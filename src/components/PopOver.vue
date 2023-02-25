<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <div class="inline bg-red rounded-borders cursor-pointer">
        <div
          class="popover-message-block fit flex flex-center text-center non-selectable q-pa-md"
        >
          Sorry, we have technical problems. Try to reload page later
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PopOver'
})
</script>

<style lang="sass">
.popover-message-block
  min-height: 100px
  font-size: 24px
  font-weight: 600
</style>
