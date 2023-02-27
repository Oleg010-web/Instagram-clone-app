<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card
          v-for="post in pageHomeData.posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat
          bordered
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">{{ user.name }}</q-item-label>
              <q-item-label caption>
                {{ post.location }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />
          <q-img :src="post.imageUrl" />
          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-caption text-grey">{{ getDate }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 large-screen-only" v-if="pageHomeData.posts">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="50px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">{{ user.name }}</q-item-label>
            <q-item-label caption> {{ user.name }} </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <pop-over v-if="pageHomeData.popover" class="pop-over"></pop-over>
  </q-page>
</template>

<script setup>
import { date } from 'quasar'
import axios from 'axios'
import { filter } from 'compression'
import { getAllPosts } from 'src/api/posts/get/getPosts.js'
import PopOver from 'src/components/PopOver.vue'
import { reactive, computed, onMounted } from 'vue'

const pageHomeData = reactive({
  posts: null,
  popover: false
})
const user = {
  name: 'Oleg_Nesterov'
}

const getDate = computed(() => {
  const datePost = pageHomeData.posts.map(post => post.date)
  let timeStamp
  for (let index = 0; index < datePost.length; index++) {
    timeStamp = datePost[index]
  }
  return date.formatDate(timeStamp, 'MMMM D h:mmA')
})

onMounted(async () => {
  pageHomeData.posts = await getAllPosts().catch(error => {
    if (error) {
      pageHomeData.popover = true
    }
    //Logs a string: Error: Request failed with status code 404
  })
})
</script>

<style lang="sass">
.card-post
  .q-img
    min-height: 200px

.pop-over
  width: 100%
  min-height: 300px
</style>
