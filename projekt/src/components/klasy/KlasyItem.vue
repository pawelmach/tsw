<template>
    <tr>
        <td @click="props.expanded = !props.expanded">
            {{props.item.numer}}
        </td>
        <td @click="props.expanded = !props.expanded">
            {{props.item.kat}}
        </td>
        <slot></slot>
    </tr>
</template>

<script>
    export default {
        props: ['props']
    };
</script>

<style lang="less">

</style>
