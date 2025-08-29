<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0">
    <ToastList  v-for="msg in messages"
      :key="msg.id"
      :msg="msg"
    />
  </div>
</template>

<script>
import ToastList from './ToastList.vue';
export default {
    name:'ToastMessages',
    components:{ToastList},
    data() {
        return {
            messages:[]
        }
    },
    inject:['emitter'],
    mounted() {
        this.emitter.on('push-message',(message)=> {
                const { style = 'success', title, content} =message;
                const id = Date.now(); // ✅ 每個訊息有唯一 id
                this.messages.push({id, style, title, content})

                
            }
        )
    }
}
</script>

<style>

</style>