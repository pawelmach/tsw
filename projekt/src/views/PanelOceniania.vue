<template>
    <div class="paneloceniania">
        <KlasyList @klasaSelected="showKlasa($event)"/>
        <KonieList @konSelected="showKon($event)" v-if="klasaid" mode="ocena" :klasaid="klasaid"/>
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
                konid: undefined
            };
        },
        components: { KlasyList: KlasyList, Ocenianie, KonieList },
        methods: {
            showKlasa (id) {
                this.klasaid = id;
            },
            showKon (id) {
                this.konid = id;
            }
        }
    };
</script>

<style lang="less">
    .paneloceniania {
        display:flex;
        flex-direction: row;
    }
</style>
