<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card
          v-for="post in posts"
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
      <div class="col-4 large-screen-only" v-if="posts">
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
    <pop-over v-if="popover" class="pop-over"></pop-over>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import axios from 'axios'
import { filter } from 'compression'
import { getAllPosts } from 'src/api/posts/get/getPosts.js'
import PopOver from 'src/components/PopOver.vue'

export default defineComponent({
  name: 'PageHome',
  components: {
    'pop-over': PopOver
  },
  data () {
    return {
      user: {
        name: 'Oleg_Nesterov'
      },
      posts: null,
      popover: false
    }
  },
  computed: {
    getDate () {
      const datePost = this.posts.map(post => post.date)
      let timeStamp
      for (let index = 0; index < datePost.length; index++) {
        timeStamp = datePost[index]
      }
      return date.formatDate(timeStamp, 'MMMM D h:mmA')
    }
  },
  async mounted () {
    this.posts = await getAllPosts().catch(error => {
      if (error) {
        this.popover = true
      }
      //Logs a string: Error: Request failed with status code 404
    })
  }
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
