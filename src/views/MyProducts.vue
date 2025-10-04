<template>
  <div class="text-end">
      <productModal  ref="productModal"  :product="tempProduct" @update-product="updateProduct"></productModal>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <VueLoading  v-model:active="isLoading"/>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">{{ $filters.currency(item.origin_price) }}</td>
        <td class="text-right">{{ $filters.currency(item.price) }}</td>
        <td>
          <span class="text-success" v-if=" item.is_enabled ">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm"
            @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm"
            @click="openDelProductModal(item)">刪除</button>
        </div>
      </td>
      </tr>
      
    </tbody>
  </table>
  <MyPagination :pages="pagination" @emit-pages="getProducts"></MyPagination>
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct"/>


</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import productModal from '@/components/productModal.vue';
import DelModal from '@/components/DelModals.vue';
import MyPagination from '@/components/MyPagination.vue';

export default {
    name:'MyProducts',
    components:{productModal,DelModal,MyPagination},
    inject:['emitter'],
    emits: ['update-product'],
    data() {
      return {
        products:[],
        pagination:{},
        apiPath: 'yusei-api',
        tempProduct:{},
        isLoading:false
      }
    },
    
    methods: {
      async getProducts(page = 1) {
        const token = Cookies.get('token') || '';
        if (!token) {
          alert('尚未登入，請先登入');
          return;
        }
        try {
          const res = await axios.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`, {
            headers: { Authorization: token }
          });
          console.log(res.data)
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination; //分頁引入
          } else {
            alert(res.data.message || '取得產品失敗');
          }
        } catch (err) {
          console.error(err);
          alert('網路錯誤');
        }
      },
      updateProduct(item) {
        this.tempProduct = item;
        const token = Cookies.get('token') || '';

        let api = `https://vue3-course-api.hexschool.io/api/yusei-api/admin/product`;
        let method = 'post';

        // 如果有 id，表示是編輯 → 用 PUT
        if (item.id) {
          api = `https://vue3-course-api.hexschool.io/api/yusei-api/admin/product/${item.id}`;
          method = 'put';
        }

        axios[method](api, { data: item }, { 
          headers: { Authorization: token } 
        })
          .then(response => {
            if(response.data.success) {
              this.$refs.productModal.hideModal();
              this.tempProduct = {}
              this.emitter.emit('push-message', {
                style:'success',
                title: response.data.message || '更新成功'
              });
              this.getProducts();
            } else {
              // 後端回傳失敗訊息
              this.emitter.emit('push-message', {
                style:'danger',
                title:'更新失敗',
                content: response.data.message.join('、') || '發生錯誤'
              });
            }
          })
          .catch(error => {
            console.error(error);
            this.emitter.emit('push-message', {
              style:'danger',
              title:'更新失敗',
              content: error.response?.data?.message?.join('、') || '發生錯誤'
              
            })
          });
      },


      openDelProductModal(item) {
            this.tempProduct = { ...item };
            const delComponent = this.$refs.delModal;
            delComponent.showModal();
        },
      openModal(isNew, product) {
        if (isNew) {
          this.tempProduct = {}; // 新增產品
        } else {
          this.tempProduct = JSON.parse(JSON.stringify(product));
        }
        this.$refs.productModal.showModal(); // 打開 productModal
      },

      delProduct() {
        const url = `https://vue3-course-api.hexschool.io/api/yusei-api/admin/product/${this.tempProduct.id}`;
        axios.delete(url, {
          headers: { Authorization: Cookies.get('token') || '' }
        })
        .then(response => {
          console.log(response.data);
          this.$refs.delModal.hideModal();
          this.getProducts();
        })
        .catch(err => console.error(err));
      }
    },
    created() {
      this.getProducts()
    }
}
</script>

<style>



</style>