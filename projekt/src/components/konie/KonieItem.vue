<template>
    <tr>
        <td @click="props.expanded = !props.expanded">
            {{props.item.numer}}
        </td>
        <td @click="props.expanded = !props.expanded">
            {{props.item.nazwa}}
        </td>
        <td @click="props.expanded = !props.expanded">
            {{props.item.rocznik}}
        </td>
        <td @click="props.expanded = !props.expanded">
            {{props.item.kraj}}
        </td>
        <td @click="props.expanded = !props.expanded">
            {{props.item.klasa}}
        </td>
        <td @click="props.expanded = !props.expanded">
            {{props.item.masc}}
        </td>
        <td @click="props.expanded = !props.expanded">
            {{props.item.plec}}
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
