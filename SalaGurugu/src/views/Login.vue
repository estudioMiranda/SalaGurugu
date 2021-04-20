<template>
<div>
    <Navbar />
    <div class="container">
        <b-form class="mt-5" @submit.prevent="loguear">
            <h2>Inicia sesión:</h2>

            <b-form-group label="Correo electrónico:" description="Intruduce tu correo electrónico.">
                <b-form-input v-model="email" type="email" required placeholder="Introduce un correo electrónico"></b-form-input>
            </b-form-group>
            <b-form-group label="Contraseña:" description="Intruduce una contraseña.">
                <b-form-input v-model="password" type="password" required placeholder="Introduce una contraseña"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="info">Enviar</b-button>
        </b-form>
        {{email}} - {{password}}
    </div>
</div>
</template>

<script>
import firebase from 'firebase'
import {
    db,
    auth
} from '@/firebase'

import Navbar from '@/components/Navbar.vue'

export default {
    name: 'Login',
    components: {
        Navbar
    },
    data() {
        return {
            email: '',
            name: '',
            password: ''
        }
    },
    methods: {
        loguear() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    this.$router.push({
                        name: 'Home'
                    })
                })
                .catch(function (error) {
                    // Handle Errors here
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });

        }
    },
}
</script>
