import React, { useState } from 'react';
import Variant from './Variant';
import DragIcon from '../images/icons/DragIcon';
import DeleteIcon from '../images/icons/DeleteIcon';
import PlusCircleIcon from '../images/icons/PlusCircleIcon';
import EllipsisIcon from '../images/icons/EllipsisIcon';

export default function Row({ index, data, onAddVariant, onDeleteVariant, onDeleteRow, onEditVariant }) {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div className="row-item row mb-3 d-flex">
      <div className="row mb-3 position-relative">
        <div className="d-flex mb-2">
          <div className="col-md-1 text-center">
            <strong></strong>
          </div>
          <div className="col-md-4 text-center">
            <strong>Product Filter</strong>
          </div>
          <div className="col-md-7 mx-2 d-flex">
            <div className="d-flex mx-2">
              <strong>Primary</strong>
              <div className="d-flex align-items-center">
                <EllipsisIcon />
              </div>
            </div>
          </div>
          {index !== 0 && <div className="text-end">
            <div onClick={() => onDeleteRow(index)} className="" style={{ top: '10px', right: '10px', cursor: 'pointer' }}>
              <DeleteIcon />
            </div>
          </div>}
        </div>

        <div className="col-md-1 d-flex align-items-center column">
          <span className='fontWeight'>{index + 1}</span>
          <span className="mr-2">
            <DragIcon />
          </span>
        </div>
        <div className="col-md-4 d-flex align-items-center column">
          <div className='button managebg'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}>
            <button className="mb-1 btn btn-sm text-dark mx-1 btncolor">
              {data.productFilter.productCollection}
            </button>
            <button className="mb-1 btn btn-sm text-dark mx-1 btncolorgreen">
              {data.productFilter.contains}
            </button>
            <button className="mb-1 btn btn-sm text-dark mx-1 btncolor">
              {data.productFilter.anarkalis}
            </button>
          </div>
        </div>
        <div className="col-md-7 d-flex overflow-auto column">
          {data.variants.map((variant) => (
            <div className="column d-flex align-items-center justify-content-center mx-2" key={variant.id}>
              <div className="variant-list d-flex">
                <Variant
                  key={variant.id}
                  data={variant}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  onAddVariant={onAddVariant}
                  onDeleteVariant={() => onDeleteVariant(variant.id)}
                  onEditVariant={(id, newContent) => onEditVariant(variant.id, newContent)}
                />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
                <PlusCircleIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
