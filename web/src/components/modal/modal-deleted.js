import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ModalDeleted = ({
  isShowModal,
  toggleModal,
  children,
  title,
  cancelText,
  showCancel = true,
  clickCancel,
  hiddenFooter
}) => {
  return (
    <Modal isOpen={isShowModal} toggle={toggleModal}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>

      {!hiddenFooter && (
        <ModalFooter className="justify-content-center">
          {showCancel && (
            <Button color="secondary" onClick={clickCancel || toggleModal}>
              {cancelText || "Hủy bỏ"}
            </Button>
          )}
        </ModalFooter>
      )}
    </Modal>
  );
};

export default ModalDeleted;
