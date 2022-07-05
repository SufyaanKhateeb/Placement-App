import React, { Component } from "react";
import { Spinner as MySpinner } from "react-bootstrap";

export class Spinner extends Component {
    render() {
        return (
            <div>
                <div className="spinner-wrapper">
                    <div className="donut">
                    <MySpinner animation="border" variant="light" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Spinner;
