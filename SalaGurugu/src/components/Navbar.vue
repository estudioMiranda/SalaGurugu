<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Miranda</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item router-liok to="/">Home</b-nav-item>
                <b-nav-item router-link to="/form">Formulario</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-button class="mr-3" variant="success" v-if="!existeUsuario" router-link to="/">Inicia sesión</b-button>
                <b-button class="mr-3" variant="danger" v-if="existeUsuario" @click="cerrarSesion">Cerrar sesión</b-button>
                <b-button class="mr-3" variant="danger" v-if="!existeUsuario" router-link to="/registro">Regístrate</b-button>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
export default {
    name: 'Navbar',

    methods: {
        ...mapActions(['cerrarSesion'])
    },
    computed: {
        ...mapGetters(['existeUsuario'])
    }
}
</script>
