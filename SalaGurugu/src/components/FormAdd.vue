<template>
  <div class="container mt-5">

<!-- ////////// formulario ////////// -->

    <b-form @submit.prevent="subirImagen()" >

<!-- ////////// Título ////////// -->  

    <h2>Añadir</h2>
      <b-form-group class="mt-5" label="Título:">
        <b-form-input
          type="text"
          v-model="obra.title"
          required
          placeholder="Introduce un título"
        ></b-form-input>
      </b-form-group>

<!-- ////////// Autor ////////// -->

      <b-form-group label="Autor:">
        <b-form-input
          type="text"
          v-model="obra.author"
          required
          placeholder="Introduzca autor"
        >
        </b-form-input>
      </b-form-group>

<!-- ////////// Año ////////// -->

      <b-form-group label="Año:">
        <b-form-input
          type="text"
          v-model="obra.year"
          required
          placeholder="Introduzca el año"
        >
        </b-form-input>
      </b-form-group>

<!-- ////////// imagen ////////// -->

     <b-card-text>
        <b-form-file
        @change="buscarImagen($event)"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Eliga un archivo o arrástrelo aquí..."
        drop-placeholder="Arrastre archivo aquí..."
    ></b-form-file>

    <div class="mt-3">Archivo seleccionado: {{ file ? file.name : '' }}</div>
        </b-card-text>
        <b-card-text v-if="error">
          <h4>{{error}}</h4>
        </b-card-text>

        <b-card-text v-if="file">
          <h4>{{file.name}}</h4>
          <b-img :src="urlTemporal"></b-img>
        </b-card-text>

 <!-- ////////// Botón Guardar ////////// -->   

    <div class="mt-3"></div>
        <div>
      <b-button type="submit" variant="primary">Guardar</b-button>
        </div>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {storage, db} from '../firebase'

export default {

    data() {
      return {
        urlTemporal: '',
        loading: false,
        error: null ,

      }
    },
    name: 'About',
    components: {
    
    },
    mutations: {

    },
    computed: {
      
        ...mapState(['obra', 'file']),
        file: {
          get () {
            return this.$store.state.file
          },
          set (value) {
            this.$store.commit('updateFile', value)
          }
        },
        photo: {
          get () {
            return this.$store.state.photo
          },
          set (value) {
            this.$store.commit('updatePhoto', value)
          }
        }
      },

      methods:{

         ...mapActions([]),

      buscarImagen(event){

        console.log(event.target.files[0]);

/*  Archivo válido */

        const tipoArchivo = event.target.files[0].type;

        if(tipoArchivo === 'image/jpeg' || tipoArchivo === 'image/png'){
          this.file = event.target.files[0]
          this.error = null
        }else{
          this.error = 'Archivo no válido'
          this.file = null
          return 
        }

/* Visualizar archivo  */       
        
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (e) => {
          // console.log(e.target.result);
          this.urlTemporal = e.target.result
        }

      },

/* Subir imagen */

      async subirImagen(){

        try {

          this.loading = true
    
          const refImagen = storage.ref().child('imagenes').child(this.file.name)

          const res = await refImagen.put(this.file)

          console.log(res);

          const urlDescarga = await refImagen.getDownloadURL()
          this.photo = urlDescarga

          await db.collection('obras').add({
                    title: this.obra.title,
                    author: this.obra.author,
                    year: this.obra.year,
                    photo: urlDescarga
                })

          this.error = 'Imagen subida con éxito'
          this.file = null
          
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false
        }
      }     
    }, 
    created(){

    },   
}
</script>