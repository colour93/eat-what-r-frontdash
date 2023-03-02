<template>
    <el-container>

        <!-- 侧边栏 -->
        <el-aside width="200px" class="aside">

            <!-- 导航 -->
            <el-menu :default-active="route.path" background-color="#F7F9FA" class="nav" :router="true">

                <el-menu-item index="/">
                    <el-icon>
                        <House />
                    </el-icon>
                    <span>仪表板</span>
                </el-menu-item>

                <el-menu-item index="/manage/school">
                    <el-icon>
                        <School />
                    </el-icon>
                    <span>学校管理</span>
                </el-menu-item>

                <el-menu-item index="/manage/shop">
                    <el-icon>
                        <ShoppingCart />
                    </el-icon>
                    <span>店铺管理</span>
                </el-menu-item>

                <el-menu-item index="/manage/item">
                    <el-icon>
                        <ShoppingBag />
                    </el-icon>
                    <span>商品管理</span>
                </el-menu-item>

            </el-menu>

        </el-aside>

        <!-- 主体 -->
        <el-container class="container"><router-view></router-view></el-container>

    </el-container>
</template>

<style scoped>
.aside {
    background: #F7F9FA;
    min-height: 100vh;
    padding: 20px;
}

.nav {
    border-right: none;
}

.container {
    flex-direction: column;
    padding: 0 40px;
}
</style>

<script setup>

import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

</script>
