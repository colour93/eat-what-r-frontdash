<template>
    <span class="page-title">仪表板</span>

    <el-container class="panel-list">

        <Panel desc="学校总数" :data="dataObj.schoolCount"><el-icon>
                <School />
            </el-icon></Panel>
        <Panel desc="店铺总数" :data="dataObj.shopCount"><el-icon>
                <ShoppingCart />
            </el-icon></Panel>
        <Panel desc="API今日请求量" :data="dataObj.apiTodayCount"><el-icon>
                <View />
            </el-icon></Panel>
        <Panel desc="API总请求量" :data="dataObj.apiTotalCount"><el-icon>
                <PieChart />
            </el-icon></Panel>

    </el-container>
</template>

<style scoped>
.panel-list {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 0;
}

.panel-list>* {
    margin: 10px;
}
</style>

<script setup>

import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';

import Panel from '../components/Panel.vue';

import getGlobalProperties from '../hooks/getGlobal';

const { $apiUrl } = getGlobalProperties();

const dataObj = ref({
    "schoolCount": 0,
    "shopCount": 0,
    "apiTodayCount": 0,
    "apiTotalCount": 0
})

onMounted(() => {
    getData();
});

// 获取数据
async function getData() {

    let r;

    try {
        r = await fetch(`${$apiUrl}/manage/overviewStats`);
        r = await r.json();
    } catch (error) {
        ElMessage.error("数据请求错误，请查看控制台输出");
        console.log(error)
        return;
    }

    if (r.code != 100) {
        ElMessage.error(r.msg);
        return;
    };

    dataObj.value = r.data;

}

</script>