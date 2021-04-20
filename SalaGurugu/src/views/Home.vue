<template>
<div>
    <Navbar />
    <div class="container mt-5">
  <b-card-group columns>

    <b-card v-for="(item, index) in obras" :key="index" :src="item.photo" img-alt="Image" img-top>
      <b-card-img :src="item.photo">{{item.photo}}</b-card-img>
      <b-card-text>
        {{item.title}}
      </b-card-text>
      <b-card-text>
        {{item.author}}
      </b-card-text>
      <b-card-text class="small text-muted">{{item.year}}</b-card-text>
        <b-button variant="success" :to = "`/obra/${item.id}`" class="btn-block" >Ver mas</b-button>
    </b-card>
   
  </b-card-group>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Home',
    components: {
        Navbar
    },
    computed: {
        ...mapState(['obras', 'obra'])
    },
    methods: {
        ...mapActions(['getObras'])
    }, 
    created(){
        this.getObras()
    }, 
}
</script>
