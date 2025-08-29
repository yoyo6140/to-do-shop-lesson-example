<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">香菇圖</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/dashboard/products" class="nav-link">產品</router-link>
            </li>
            <li class="nav-item">
               <router-link to="/dashboard/orders" class="nav-link">訂單</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/dashboard/coupons" class="nav-link">優惠券</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="logout">登出</a>
            </li>
          </ul>
          <span class="navbar-text">
            Blog
          </span>
          <span class="navbar-text">
            <router-link to="/user/cart" class="nav-link">購物車</router-link>
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    name:'MyNavbar',
    props: [
        'logout' // 父層傳入的 logout
    ]
        
    
}
</script>

<style>

</style>