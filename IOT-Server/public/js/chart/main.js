var maxDataPoints = 10;
var chart;
var data;
var options

document.addEventListener("DOMContentLoaded", function () {
    maxDataPoints = 10;
    chart;
    data;
    options = {
        title: 'Temperature',
        curveType: 'function',//try 'function' to fit the curve
        vAxis: { minValue: 0, maxValue: 100 },
        width: '100px',
        height: '100px',
        backgroundColor: 'aliceblue',
        chartArea: {
            left: '8%',
            right: '2%',
            top: '10%',
            down: '15%',
            width: '90%',
            height: '80%',
        },
        pointShape: 'square',
        pointSize: 15,
        /*animation: {
            duration: 950,
            easing: 'linear'
        },*/
        legend: { position: 'top' }
    };

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(function () {
        data = new google.visualization.DataTable();
        data.addColumn('string', 'Time');
        data.addColumn('number', 'Temperature');
        chart = new google.visualization.LineChart(document.getElementById('chart'));
    });

   /* setInterval(function () {
        if (data) {
            data.addRow([(new Date()).toLocaleTimeString(), Math.random() * 100]);
            if (data.getNumberOfRows() > maxDataPoints) {
                data.removeRow(0);
            }
            chart.draw(data, options);
        }
    }, 1000);*/
});

