import { useState, useRef } from 'react';
import { Card, Modal, Button, Form } from 'react-bootstrap';
import PlusCircleIcon from '../images/icons/PlusCircleIcon';
import EditIcon from '../images/icons/EditIcon';
import DeleteIcon from '../images/icons/DeleteIcon';
import 'bootstrap/dist/css/bootstrap.min.css';
import images from '../images/images';

export default function Variant({ data, onAddVariant, onDeleteVariant, onEditVariant, showModal, handleCloseModal, setShowModal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [newContent, setNewContent] = useState(data.content);
  const fileInputRef = useRef(null);

  const handleAddVariant = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAddVariant(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(null);
      setShowModal(false);
    } else {
      alert('Please select a file to upload');
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePlusIconClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveEdit = () => {
    onEditVariant(data.id, newContent);
    setIsEditing(false);
  };

  return (
    <>
      <div className="manageVariant mx-3">
        <div className="card w-100">
          <Card>
            <div className="card-img-container"
              style={{
                padding: '10px 10px 0px 10px',
                height: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Card.Img
                variant="top"
                src={images[`kurti${data.id}`] || data.image}
                alt="Card image"
                style={{ height: '100%', width: 'auto', objectFit: 'cover' }}
              />
              <div className="card-img-overlay">
                <div onClick={() => setIsEditing(true)} className="icon-button">
                  <EditIcon />
                </div>
                <div onClick={onDeleteVariant} className="icon-button">
                  <DeleteIcon />
                </div>
              </div>
            </div>
            <Card.Body>
              <Card.Text className="text-center">
                {isEditing ? (
                  <input
                    type="text"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    onBlur={handleSaveEdit}
                    autoFocus
                    style={{ width: '160px', border: 'none' }}
                  />
                ) : (
                  data.content
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* Modal for adding an image */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton style={{ border: 'none', padding: '10px 20px 0px 20px', fontSize: '16px' }}>
            <Modal.Title>Add Variant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <div
                  variant="outline-primary"
                  onClick={handlePlusIconClick}
                  className='upload'
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100px',
                    border: '1px dashed #ced4da'
                  }}
                >
                  <PlusCircleIcon />
                </div>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" onClick={handleAddVariant}>
              + Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
