<template>
    <div class='echarts'></div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'         /** */
import 'echarts/lib/chart/lines'        /** */
import 'echarts/lib/chart/bar'          /** */
import 'echarts/lib/chart/pie'          /** */
import 'echarts/lib/chart/gauge'          /** */
import 'echarts/lib/chart/map'          /** */
import 'echarts/lib/chart/radar'        /**雷达图坐标系组件，只适用于雷达图。 */
import 'echarts/lib/chart/scatter'      /** */
import 'echarts/lib/chart/effectScatter'/** */
import 'echarts/lib/component/tooltip'  /**提示框*/
import 'echarts/lib/component/polar'    /** */
import 'echarts/lib/component/geo'      /** 地理坐标系组件。*/
import 'echarts/lib/component/legend'   /**图例组件。 */
import 'echarts/lib/component/title'    /**标题组件，包含主标题和副标题。*/
import 'echarts/lib/component/visualMap'/** */
export default {
    name: 'Charts',
    props: {
        options: {
            type: Object,
            default () {
            return {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }
            }
        }
    },
    data () {
        return {
            myChart: ''
        }
    },
    mounted () {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(this.$el);
        // 绘制图表
        this.myChart.setOption(this.options);
    },
    methods: {
        setOption (options) {
            this.myChart.setOption(options)
        }
    }
}
</script>

