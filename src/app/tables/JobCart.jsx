import React from 'react'
import Button from "react-bootstrap/Button";

const JobCart = (props) => {
    return <div className="col-md-6 col-xl-4 grid-margin stretch-card">
        <div className="card">
            <div className="card-body">
                <h4 className="card-title" style={{ fontSize: '1.5rem' }}>{props.company}</h4>
                <div className="d-flex py-4">
                    <div className="preview-list w-100">
                        <div className="preview-item p-0">
                            <div className="preview-item-content d-flex flex-grow">
                                <div className="flex-grow">
                                    {/* <div className="d-flex d-md-block d-xl-flex" style={{ marginBottom: '13px' }}>
                                        <span className="preview-subject" style={{ fontSize: '1.2rem' }}>Company</span>:&nbsp;&nbsp;<span className="text-muted" style={{ fontSize: '1.2rem' }}>{'Apple'}</span>
                                    </div> */}
                                    <div className="d-flex d-md-block d-xl-flex" style={{ marginBottom: '13px' }}>
                                        <span className="preview-subject" style={{ fontSize: '1.2rem' }}>Location:</span>:&nbsp;&nbsp;<span className="text-muted" style={{ fontSize: '1.2rem' }}>{props.location}</span>
                                    </div>
                                    <div className="d-flex d-md-block d-xl-flex" style={{ marginBottom: '13px' }}>
                                        <span className="preview-subject" style={{ fontSize: '1.2rem' }}>Description:</span>:&nbsp;&nbsp;<span className="text-muted" style={{ fontSize: '1.2rem' }}>{'NA'}</span>
                                    </div>
                                    <div className="d-flex d-md-block d-xl-flex" style={{ marginBottom: '13px' }}>
                                        <span className="preview-subject" style={{ fontSize: '1.2rem' }}>Role:</span>:&nbsp;&nbsp;<span className="text-muted" style={{ fontSize: '1.2rem' }}>{props.role}</span>
                                    </div>
                                    <div className="d-flex d-md-block d-xl-flex" style={{ marginBottom: '13px' }}>
                                        <span className="preview-subject" style={{ fontSize: '1.2rem' }}>Deadline:</span>:&nbsp;&nbsp;<span className="text-muted" style={{ fontSize: '1.2rem' }}>{props.deadline}</span>
                                    </div>
                                    <div className="d-flex d-md-block d-xl-flex" style={{ marginBottom: '13px' }}>
                                        <span className="preview-subject" style={{ fontSize: '1.2rem' }}>Eligibility:</span>:&nbsp;&nbsp;<span className="text-muted" style={{ fontSize: '1.2rem' }}>{props.eligibility}</span>
                                    </div>
                                    <div className="d-flex d-md-block d-xl-flex" style={{ marginBottom: '13px' }}>
                                        <span className="preview-subject" style={{ fontSize: '1.2rem' }}>CTC:</span>:&nbsp;&nbsp;<span className="text-muted" style={{ fontSize: '1.2rem' }}>{props.ctc}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button variant="success">Apply</Button>
            </div>
        </div>
    </div>
}

export default JobCart