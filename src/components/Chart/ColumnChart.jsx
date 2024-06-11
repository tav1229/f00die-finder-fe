import ReactApexChart from "react-apexcharts";

export default function ColumnChart({ title, data }) {
    const series = [
        {
            name: "sales",
            data: data,
        },
    ];
    const options = {
        chart: {
            type: "bar",
        },
        xaxis: {
            type: "category",
            labels: {
                formatter: function (val) {
                    return val;
                },
            },
        },
        title: {
            text: title,
            style: {
                fontFamily: 'Arial, sans-serif', // Đặt font bạn muốn ở đây
                fontWeight: 'bold', // Có thể là 'normal', 'bold', 'bolder', hoặc một số từ 100 đến 900
                fontSize: '16px', // Đặt kích thước font bạn muốn
                color: '#333' // Đặt màu cho tiêu đề
            }
        },
    };

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={380}
            className="!font-sans"
        />
    );
}
