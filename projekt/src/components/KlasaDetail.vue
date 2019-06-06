<template>
    <div class="classdetail">
        <div v-if="klasa">
            <input v-model.number="klasa.numer" :disabled="!editable">
            <input v-model="klasa.kat" :disabled="!editable">
            <div class="komisja"
                 v-for="(s, i) in klasa.komisja"
                 :key="i"
            >
                <input type="checkbox" :disabled="!editable" :id="s">
                <label :for="s" >{{getJudgeById(s).sedzia}}</label>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';
    export default {
        data () {
            return {
                editable: false
            };
        },
        props: ['id'],
        computed: {
            ...mapGetters(['getClassById', 'getJudgeById']),
            ...mapState('sedziowie'),
            klasa () {
                return this.getClassById(this.id);
            }
        },
        methods: {
            edit: function () {
                if (this.editable) {
                    this.editable = false;
                } else {
                    this.editable = true;
                }
            },
            judge (id) {
                return this.getJudgeById(id);
            }
        }
    };
</script>

<style lang="less">

</style>
