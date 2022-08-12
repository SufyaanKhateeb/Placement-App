import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList'
import { VectorMap } from "react-jvectormap"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import ChartJs from '../charts/ChartJs';



export default function Dashboard() {
  // const [cookies, setCookie, removeCookie] = useCookies([]);

  const mapData = {
    "BZ": 75.00,
    "US": 56.25,
    "AU": 15.45,
    "GB": 25.00,
    "RO": 10.25,
    "GE": 33.25
  }

  var transactionHistoryData =  {
    labels: ["Paypal", "Stripe","Cash"],
    datasets: [{
        data: [55, 25, 20],
        backgroundColor: [
          "#111111","#00d25b","#ffab00"
        ]
      }
    ]
  };

  var transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
          borderWidth: 0
      }
    },      
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    }
  }

  var sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const history = useHistory();

  const logOut = () => {
    // removeCookie("jwt");
    console.log('hello')
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    history.push("/login");
  };
  
    return (

        
        <div>
        <button className="btn btn-danger mr-2" onClick={logOut}>Logout</button>
        <ChartJs />
        </div>
    );
  }

// export default Dashboard;