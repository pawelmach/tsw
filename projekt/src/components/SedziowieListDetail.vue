<template>
    <div class="judgeslisy">
        <div class="pages" v-if="pageNumber !== 0">
            <button @click="prevPage" :disabled="pageNumber === 0">
                Previous
            </button>
            <button @click="nextPage" :disabled="pageNumber >= pageCount - 1">
                Next
            </button>
        </div>
        <div v-for="judge in judges"
             :key="judge.id"
             @click="showDetail(judge.id)">
            <p>
                <span>{{ judge.sedzia }}</span>
                <span>{{ judge.kraj }}</span>
            </p>
            <div class="detail" v-if="selected === judge.id">
                <input v-model="judge.sedzia">
                <input v-model="judge.kraj">
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data: () => {
            return {
                pageNumber: 0,
                size: 10,
                selected: null
            };
        },
        computed: {
            ...mapGetters([
                'paginatedJudges',
                'judgesCount'
            ]),
            judges () {
                const start = this.pageNumber * this.size;
                const end = start + this.size;
                return this.paginatedJudges(start, end);
            },
            pageCount () {
                return Math.ceil(this.judgesCount / this.size);
            }
        },
        methods: {
            nextPage () {
                this.pageNumber++;
            },
            prevPage () {
                this.pageNumber--;
            },
            showDetail (id) {
                if (id === this.selected) {
                    this.selected = null;
                } else {
                    this.selected = id;
                }
            }
        }

    };
</script>

<style lang="less">

</style>
