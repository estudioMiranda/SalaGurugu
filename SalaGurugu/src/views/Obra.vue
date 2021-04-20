
<template>
    <div>
        <Navbar />
    <div class="container mt-5">
    <h1>Ruta con parámetros</h1>
    <h2>Ruta con parámetros {{ $route.params.id}}</h2>
  <b-card-group columns>
    <b-card>
        <b-card-img :src="obra.photo">{{obra.photo}}</b-card-img>
      <b-card-text>
        {{obra.title}}
      </b-card-text>
      <b-card-text>
        {{obra.author}}
      </b-card-text>
      <b-card-text class="small text-muted">{{obra.year}}</b-card-text>
        <b-button variant="success" class="btn-block" >Salir</b-button>
        </b-card>
    </b-card-group>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import { mapActions, mapState } from 'vuex'
import router from '@/router'

export default {
    name: 'Home',
    components: {
        Navbar
    },
    computed: {
        ...mapState(['obra'])
    },
    methods: {
        ...mapActions(['getObra'])
    }, 
    created(){
        this.getObra(this.$route.params.id)
    }, 
}
</script>
