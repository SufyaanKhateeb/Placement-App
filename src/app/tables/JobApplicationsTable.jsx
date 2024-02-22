import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Button from "react-bootstrap/Button";
import axios from "axios";
import JobCart from "./JobCart";

export default function JobApplicationsTable() {
	const [data, setData] = useState([]);
	useEffect(() => {
		try {
			axios.get(`${process.env.REACT_APP_SERVER_URL}/getjobs`).then((response) => setData(response.data));
		} catch (err) {
			console.log(err);
		}
	}, []);

	var sliderSettings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<>
			<div className="page-header">
				<h3 className="page-title">Job Opportunities</h3>
			</div>
			<div className="row">
				{data.map((item) => {
					return <JobCart key={item.id} company={item.company} location={item.location} desc={item.desc} role={item.role} deadline={item.deadline} eligibility={item.eligibility} ctc={item.ctc} />;
				})}
				{/* <JobCart company="Amazon" location="BLR" desc="NA" role="SDE" deadline="12th AUG" eligibility=">9" ctc="15LPA" />
          <JobCart company="Microsoft" location="HYD" desc="NA" role="SDE-2" deadline="18th AUG" eligibility=">7" ctc="25LPA" />
          <JobCart company="Apple" location="DEL" desc="NA" role="Intern" deadline="24th AUG" eligibility=">8" ctc="33LPA" />
          <JobCart company="Google" location="BLR" desc="NA" role="SDE" deadline="14th Oct" eligibility=">9" ctc="34LPA" /> */}
			</div>
		</>
	);
}

// export default Dashboard;
