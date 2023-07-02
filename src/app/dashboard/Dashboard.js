import React from "react";
import Slider from "react-slick";
import { TodoListComponent } from "../apps/TodoList";
import { VectorMap } from "react-jvectormap";
import ChartJs from "../charts/ChartJs";

export default function Dashboard() {
    const mapData = {
        BZ: 75.0,
        US: 56.25,
        AU: 15.45,
        GB: 25.0,
        RO: 10.25,
        GE: 33.25,
    };

    var transactionHistoryData = {
        labels: ["Paypal", "Stripe", "Cash"],
        datasets: [
            {
                data: [55, 25, 20],
                backgroundColor: ["#111111", "#00d25b", "#ffab00"],
            },
        ],
    };

    var transactionHistoryOptions = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke: false,
        cutoutPercentage: 70,
        elements: {
            arc: {
                borderWidth: 0,
            },
        },
        legend: {
            display: false,
        },
        tooltips: {
            enabled: true,
        },
    };

    var sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            <ChartJs />
        </div>
    );
}

// export default Dashboard;
