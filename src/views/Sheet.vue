<template>
    <!-- 标题 -->
    <span class="page-title">{{ title }}</span>

    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-if="currentSchoolInfo.schoolName" :to="'/manage/shop?id=' + currentSchoolInfo.schoolId">{{ currentSchoolInfo.schoolName }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="currentShopInfo.shopName" >{{ currentShopInfo.shopName }}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表 -->
    <el-table style="margin-top: 20px" :stripe="true" :data=tableData empty-text="这里空空如也" table-layout="auto" height="80vh"
        highlight-current-row v-loading="sheetLoading">
        <el-table-column v-for="(value, index) in tableHead" :prop="value[0]" :label="value[1]"
            :type="index == 0 ? 'index' : ''"></el-table-column>

        <el-table-column fixed="right" width="160">
            <template #header>
                <el-button type="primary" size="small" @click="handleAddClick">新增</el-button>
            </template>
            <template #default="scope">
                <el-button type="primary" plain size="small" @click="handleDetailClick(scope.row)" v-if="route.params.viewType != 'item'">详情</el-button>
                <el-button type="info" plain size="small" @click="handleEditClick(scope.row)">编辑</el-button>
            </template>
        </el-table-column>

    </el-table>
</template>

<style scoped></style>

<script setup>

import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

import { ArrowRight } from '@element-plus/icons-vue';

import getGlobalProperties from '../hooks/getGlobal';

let route = useRoute();
let router = useRouter();

const { $apiUrl } = getGlobalProperties();

const title = ref("管理");
const sheetLoading = ref(false);

const tableHead = ref([]);
const tableData = ref([]);

const currentSchoolInfo = ref({});
const currentShopInfo = ref({});

const tableHeadTemplate = {
    school: {
        schoolId: "ID",
        schoolName: "学校名称",
        keywords: "搜索关键词"
    },
    shop: {
        shopId: "ID",
        shopName: "店铺名称",
        tag: "标签",
        location: "位置",
        delivery: "支持外卖"
    },
    item: {
        itemId: "ID",
        itemName: "商品名称",
        price: "价格",
        type: "类型"
    }
}

let query = '';
let targetType = '';

// params: viewType 侦听器
const viewTypeWatcher = watch(
    () => route.params.viewType,
    (newVal) => {

        // 判断是否包含 viewType
        if (!newVal) return;

        switchType(newVal);
        getData();
    }
)

// query: id 侦听器
const idWatcher = watch(
    () => route.query.id,
    (newVal) => {

        // 判断是否包含 viewType 和 id
        if (!newVal || !route.params.viewType) return;

        switchType(route.params.viewType);
        getData();
    }
)

// 挂载之后初始化一下
onMounted(() => {

    switchType(route.params.viewType);
    getData();

})

// 切换到其他视图之前 unwatch 一下
onBeforeUnmount(() => {

    viewTypeWatcher();
    idWatcher();

})

// 切换类别
function switchType(value) {
    switch (value) {
        case 'school':
            title.value = "学校管理";
            targetType = 'shop';
            query = '';
            break;

        case 'shop':
            title.value = "店铺管理";
            targetType = 'item';
            query = '?schoolId=' + route.query.id;
            break;

        case 'item':
            title.value = "商品管理";
            query = '?shopId=' + route.query.id;
            break;

        default:
            break;
    }

    tableHead.value = [];
    tableData.value = [];
}

// 获取数据
async function getData() {

    tableHead.value = [];
    tableData.value = [];

    sheetLoading.value = true;

    let r;

    try {
        r = await fetch(`${$apiUrl}/manage/${route.params.viewType}/list${query}`);
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

    // 处理表头
    tableHead.value = Object.keys(tableHeadTemplate[route.params.viewType]).map(v => {
        return [
            v,
            tableHeadTemplate[route.params.viewType][v]
        ]
    })

    // 处理数据
    tableData.value = r.data.data;

    // 处理额外数据
    switch (route.params.viewType) {

        case 'shop':
            currentSchoolInfo.value = r.data.school;
            currentShopInfo.value = {};
            break;

        case 'item':
            currentSchoolInfo.value = r.data.school;
            currentShopInfo.value = r.data.shop;
            break;

        default:
            currentSchoolInfo.value = {};
            currentShopInfo.value = {};
            break;
    }

    sheetLoading.value = false;

}

// 点击详情
function handleDetailClick(row) {

    router.push(`/manage/${targetType}?id=${row[route.params.viewType + 'Id']}`);

}

// 点击编辑
function handleEditClick(e) {

    console.log(e);

}

// 点击新增
function handleAddClick(e) {

    console.log(e);

}

</script>