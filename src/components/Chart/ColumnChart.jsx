import ReactApexChart from "react-apexcharts";


export default function ColumnChart() {
    const series = [
        {
            name: "sales",
            data: [
                {
                    x: "Tháng 1",
                    y: 400,
                },
                {
                    x: "Tháng 2",
                    y: 430,
                },
                {
                    x: "Tháng 3",
                    y: 448,
                },
                {
                    x: "Tháng 4",
                    y: 470,
                },
                {
                    x: "Tháng 5",
                    y: 540,
                },
                {
                    x: "Tháng 6",
                    y: 580,
                }
            ],
        },
    ];
    const options = {
        chart: {
            type: "bar",
            // height: 380,
        },
        xaxis: {
            type: "category",
            labels: {
                formatter: function (val) {
                    return val
                },
            },
        },
        title: {
            text: "Grouped Labels on the X-axis",
        },
        // tooltip: {
        //     x: {
        //         formatter: function (val) {
        //             return (
        //                 "Q" +
        //                 dayjs(val).quarter() +
        //                 " " +
        //                 dayjs(val).format("YYYY")
        //             );
        //         },
        //     },
        // },
    };

    return (
        <ReactApexChart options={options} series={series} type="bar" height={380} />
    )
}
