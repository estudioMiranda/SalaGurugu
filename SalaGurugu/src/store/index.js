import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store ( {
  state: {
    usuario: null,
    error: null,
    foto: null,
    
    urlTemporal: '',
    loading: false,
    file: null,
    
    obras: [ ],
    obra: {
      id: '',
      title: '',
      author: '',
      year: '',
      photo: ''
    }
  },
  mutations: {
    updatePhoto (state, foto) {
      state.foto = foto
      console.log(foto)
    },
    updateFile (state, file) {
      state.file = file
    },
    setUsuario (state, payload){
      state.usuario = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setObras (state, payload) {
      state.obras = payload
    },
    setObra (state, payload) {
      state.obra = payload
    },
    setDeleteObra (state, payload) {
      state.obras = state.obras.filter(item => item.id !== payload)
    }
  },
  actions: {

    deleteObra({ commit }, id){
      db.collection('obras').doc(id).delete()
      .then(() => {
          commit('setDeleteObra', id)
      })
      .catch (error => console.log (error))
    },
    addObra({commit}, obra ){
      db.collection('obras').add({
        title: obra.title,
        author: obra.author,
        year: obra.year,
        photo: this.foto
      })
      .then(doc => {
/*       router.push({name: 'About'})
 */      })
    },

    getObra({commit}, id){
    db.collection('obras').doc(id).get()
    .then(doc => {
        let obra= doc.data()
        obra.id = doc.id
        commit('setObra', obra)
      })
    },

    updateObra({commit}, obra){
      db.collection('obras').doc(obra.id).update({
          title: obra.title,
          author: obra.author,
          year: obra.year

      })
      .then(() => {
        router.push({name: 'About'})
      })
    },

    getObras({commit}){
      const obras = []
      db.collection('obras').get()
      .then(res => {
          res.forEach(doc => {
              let obra = doc.data()
              obra.id = doc.id
              obras.push(obra)
          })
          commit('setObras', obras)
      })
    },

    crearUsuario ({commit}, usuario){
      auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then (res =>{
        const usuarioCreado = {
          email: res.user.email,
          uid: res.user.uid
        }
        commit ( 'setUsuario',usuarioCreado)
        router.push('/')
        
      })
      .catch( error => {
        console.log(error)
        commit('setError', error)
      });
    },

    cerrarSesion(){
      auth.signOut()
      .then (() => {
        router.push('/login')
      })
    },

    detectarUsuario( {commit}, usuario ){
      commit ('setUsuario', usuario)
    },
  },

  modules: {
  },

  getters: {
    existeUsuario(state){
      if(state.usuario === null){
          return false
      }else{
          return true
      }
    }
 },
}
)


