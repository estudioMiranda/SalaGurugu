<template>
      <b-card>
        <b-card-text>
          <b-avatar>
            <img :src="obra.foto" alt="avatar">
          </b-avatar>
        </b-card-text>
        <b-card-text>
          <h3>{{obra.title}}</h3>
        </b-card-text>
        <b-card-text>
          
          <input type="file" ref="boton" class="d-none" @change="buscarImagen($event)">

          <b-btn color="primary" @click="$refs.boton.click()">Buscar imagen</b-btn>
          <b-btn color="secondary" :disabled="file === null"
          @click="subirImagen()" :loading="loading">Subir imagen</b-btn>

        </b-card-text>

        <b-card-text v-if="error">
          <h4>{{error}}</h4>
        </b-card-text>

        <b-card-text v-if="file">
          <h4>{{file.name}}</h4>
          <b-img :src="urlTemporal"></b-img>
        </b-card-text>


      </b-card>
</template>

<script>
import { mapState } from "vuex";
import { firebase, storage, db } from "@/firebase";

export default {
  data() {
    return {
      file: null,
      urlTemporal: '',
      loading: false,
      error: null
    }
  },
  computed:{
    ...mapState(['obra'])
  },
  methods:{
    buscarImagen(event){
      console.log(event.target.files[0]);

      const tipoArchivo = event.target.files[0].type;

      if(tipoArchivo === 'image/jpeg' || tipoArchivo === 'image/png'){
         this.file = event.target.files[0]
         this.error = null
      }else{
        this.error = 'Archivo no válido'
        this.file = null
        return 
      }
      
     

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        // console.log(e.target.result);
        this.urlTemporal = e.target.result
      }

    },
    async subirImagen(){

      try {

        this.loading = true
  
        const refImagen = storage.ref().child('imagenes').child('foto perfil')

        const res = await refImagen.put(this.file)

        console.log(res);

        const urlDescarga = await refImagen.getDownloadURL()
        this.obra.foto = urlDescarga

        await db.collection('obras').doc(this.obra.id).update({
          foto: urlDescarga
        })

        this.error = 'Imagen subida con éxito'
        this.file = null
        
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false
      }

    }
  }
}
</script>
