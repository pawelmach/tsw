<template>
    <tr>
        <td @click="props.expanded = !props.expanded">
            {{props.item.sedzia}}
        </td>
        <td @click="props.expanded = !props.expanded">
            {{props.item.kraj}}
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
