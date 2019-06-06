<template>
    <div class="paneloceniania" v-on:nowyWynik="nowyWynik()">
        <KlasyList @klasaSelected="showKlasa($event)"/>
        <KonieList @konSelected="showKon($event)" v-if="klasaid" :mode="mode" :klasaid="klasaid"/>
        <Ocenianie v-if="konid" :konid="konid" :klasaid="klasaid"/>
    </div>
</template>

<script>
    import KlasyList from '@/components/KlasyList.vue';
    import KonieList from '@/components/KonieList.vue';
    import Ocenianie from '@/components/Ocenianie.vue';
    export default {
        data () {
            return {
                klasaid: undefined,
                konid: undefined,
                mode: 'ocena'
            };
        },
        components: { KlasyList: KlasyList, Ocenianie, KonieList },
        methods: {
            showKlasa (id) {
                this.konid = null;
                this.klasaid = id;
            },
            showKon (id) {
                this.konid = id;
            },
            nowyWynik () {
                this.mode = 'nowaocena';
            }
        }
    };
</script>

<style lang="less">
    .paneloceniania {
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
