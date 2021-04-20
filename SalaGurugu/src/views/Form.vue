<template>
<div>
    <Navbar />
    <FormAdd v-if="this.edit === true"/>
    <FormUpdate v-if="this.edit === false"/>

<!-- ////////// tabla ////////// -->

    <div class="container">
    <template>
      <div>
        <b-table striped hover :items="obras" :fields="fields">
          <template #cell(edit)="row">
<!--           {{obra.id}}- {{obra.title}} -->
            <b-button :pressed.sync="edit" variant="success" size="sm" @click.prevent="getObra( row.item.id )">
                  
            Editar
            </b-button>
          </template>
          <template #cell(delete)="row">
            <b-button variant="danger" size="sm" @click.prevent="deleteObra( row.item.id )">
            Eliminar
            </b-button>
          </template>
        </b-table>
      </div>
    </template>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import FormAdd  from '@/components/FormAdd.vue'
import FormUpdate  from '@/components/FormUpdate.vue'
import { mapActions, mapState } from 'vuex'
import {storage, db} from '../firebase'

export default {

    data() {
      return {
        edit: true,
        urlTemporal: '',
        loading: false,
        error: null,
       
        fields: ['id', 'photo', 'title', 'author', 'year', 'edit', 'delete'],
/*         obra: {
          id: '',
          title: '',
          author: '',
          year: ''
          } */
      }
    },
    name: 'About',
    components: {
        Navbar,
        FormAdd,
        FormUpdate
    },
    mutations: {

    },
    computed: {
      
        ...mapState(['obras', 'obra', 'file']),
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
            return this.$store.state.obra.foto
          },
          set (value) {
            this.$store.commit('updatePhoto', value)
          }
        }
      },

      methods:{

         ...mapActions(['getObras', 'addObra', 'getObra', 'updateObra', 'deleteObra']),

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
          this.foto = urlDescarga
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
        this.getObras()
    },
    
}
</script>