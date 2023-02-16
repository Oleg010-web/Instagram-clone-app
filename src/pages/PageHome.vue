<template>
  <q-page class="constrain q-pa-md">
    <q-card class="card-post" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">Oleg_Nesterov</q-item-label>
          <q-item-label caption>
            Phuket, Thailand
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      />
      <q-card-section>
        <div >Golden Gate</div>
        <div class="text-caption text-grey">16 February 2023, 9:52AM</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageHome'
})
</script>


<style lang="sass">
.card-post
  .q-img
    min-height: 200px
</style>