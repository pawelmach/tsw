<template>
    <div class="classdetail">
        <input v-model="klasa">
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        props: ['id'],
        computed: {
            ...mapGetters(['getClassById']),
            klasa: () => {
                return this.getClassById(this.id);
            }
        }
    };
</script>

<style lang="less">

</style>
