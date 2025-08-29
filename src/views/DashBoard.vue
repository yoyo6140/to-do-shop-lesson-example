<template>    
    <MyNavbar :logout="logout"></MyNavbar>
    <div class="container-fluid">
        <router-view></router-view>
    </div>
    <ToastMessages />
</template>

<script>
import Cookies from 'js-cookie'
import MyNavbar from '@/components/MyNavbar.vue'
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
export default {
    name:'DashBoard',
    components:{MyNavbar,ToastMessages},
    data() {
        return {
            user: {}
        }
    },
    provide() {
        return {
            emitter
        }
    },
    created() {
        const token = Cookies.get('token')
        if (!token) {
        this.$router.push('/login')
        }
    },
    methods: {
        logout() {
        Cookies.remove('token')
        this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>