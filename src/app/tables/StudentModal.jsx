import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const StudentModal = (props) => {
    return (
        <Modal
            size="lg"
            show={props.showStudentModal}
            onHide={() => props.setShowStudentModal()}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Modal of {props.studentModalInfo.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                His usn is {props.studentModalInfo.usn}. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Facere est quidem velit
                quaerat ipsam iure ipsum, veritatis dicta, veniam sit nobis
                eaque magni dolorum nulla vero, quae delectus facilis
                architecto. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Corrupti, corporis nam blanditiis praesentium animi nisi
                numquam. Voluptate, possimus maxime, molestiae ea doloribus et
                pariatur sit soluta aliquid dolorum, rem reiciendis. Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Eum
                voluptates labore distinctio, iure, ratione quod et voluptatem
                recusandae amet sint at laudantium nesciunt facere minus natus
                sapiente. Delectus, rerum! Facere.
            </Modal.Body>
        </Modal>
    );
};

export default StudentModal;
