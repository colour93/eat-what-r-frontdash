<template>
    <div class="panel">
        <div class="pull-left">
            <span class="stats-number">{{ data }}</span>
            <p class="stats-info">{{ desc }}</p>
        </div>
        <div class="pull-right">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    data: {
        default: "N/A",
        type: [String, Number]
    },
    desc: {
        default: "UNDEFINED",
        type: String
    }
})

</script>

<style scoped>
.panel {
    padding: 25px;
    background-color: #fff;
    border: 1px solid #E6E8EB;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    height: 60px;
    min-width: 200px;
}

.pull-right {
    margin-left: 20px;
    font-size: 28px;
}

.stats-number {
    color: #637282;
    font-size: 25px;
}

</style>