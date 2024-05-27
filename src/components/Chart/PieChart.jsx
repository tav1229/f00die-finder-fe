import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function PieChart() {
    const series = [200, 41];
    const options = {
        chart: {
            type: "donut",
        },
        labels: [ "Khách hàng", "Chủ nhà hàng"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: "100%",
                    },
                    theme: {
                        monochrome: {
                            enabled: true,
                        },
                    },
                    legend: {
                        position: "bottom",
                        offsetY: 0,
                        height: 230,
                        show: false,
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                offset: -5,
                            },
                        },
                    },
                    title: {
                        text: "Monochrome Pie",
                    },
                },
            },
        ],
    };

    return <ReactApexChart options={options} series={series} type="donut" />;
}
