<template>
<div>
    <Navbar />
    <div class="container">
        <b-form class="mt-5" @submit.prevent="crearUsuario({email: email, password: password})">
            <h2>Crear una cuenta:</h2>

            <b-form-group label="Correo electrónico:" description="Intruduce tu correo electrónico.">
                <b-form-input v-model="email" type="email" required placeholder="Introduce un correo electrónico"></b-form-input>
            </b-form-group>
            <b-form-group label="Contraseña:" description="Intruduce una contraseña.">
                <b-form-input v-model="password" type="password" required placeholder="Introduce una contraseña"></b-form-input>
            </b-form-group>
            <b-form-group label="Repite la contraseña:" description="Repite la contraseña.">
                <b-form-input v-model="password2" type="password" required placeholder="Repite la contraseña"></b-form-input>
            </b-form-group>

            <b-button :disabled='!desactivar' type="submit" variant="info">Enviar</b-button>
        </b-form>
        {{email}} - {{password}} - {{password2}}
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import {
    mapState,
    mapActions
} from 'vuex'

export default {
    name: 'Registro',
    components: {
        Navbar
    },
    data() {
        return {
            email: '',
            password: '',
            password2: ''
        }
    },
    created() {

    },
    methods: {
        ...mapActions(['crearUsuario']),
    },
    computed: {
        ...mapState(['error']),

        desactivar() {
            return this.password === this.password2 &&
                this.password.trim() !== '' &&
                this.password.length > 5
        }
    }
}
</script>
