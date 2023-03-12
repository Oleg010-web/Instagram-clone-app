<template>
  <q-page class="constrain q-pa-md">
    <template v-if="pageHomeData.posts">
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
              <div class="text-caption text-grey">{{ post.date }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4 large-screen-only">
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
    </template>

    <pop-over v-if="loadingData" class="pop-over"></pop-over>
    <pre-loader v-if="preLoaderStatus"></pre-loader>
  </q-page>
</template>

<script setup>
import { date } from 'quasar'
import axios from 'axios'
import { filter } from 'compression'
import { getAllPosts, loadingData, preLoaderStatus } from 'src/api/posts/get/getPosts.js'
import PreLoader from 'src/components/PreLoader.vue'
import PopOver from 'src/components/PopOver.vue'
import { reactive, computed, onMounted, ref } from 'vue'

const pageHomeData = reactive({
  posts: null
})
const user = {
  name: 'Oleg_Nesterov'
}

onMounted(async () => {
  pageHomeData.posts = await getAllPosts()
 
 

  pageHomeData.posts.forEach(element => {
    element.date = date.formatDate(element.date, 'DD-MM-YYYY')
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
