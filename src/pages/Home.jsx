import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Row from '../components/Row';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PlusCircleIcon from '../images/icons/PlusCircleIcon';
import UseHomeController from './UseHomeController';

export default function Home() {
  const {
    rows,
    addRow,
    addVariantColumn,
    editVariantContent,
    deleteVariant,
    deleteRow,
    onButtonClick,
    onDragEnd,
  } = UseHomeController();
  
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header onButtonClick={() => onButtonClick()} />
        <div className="content-body">
          <div className="btn" onClick={addRow}>
            <PlusCircleIcon />
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {rows.map((row, index) => {
                    const hasVariants = row.variants.length > 0;

                    return hasVariants ? (
                      <Draggable key={row.id} draggableId={row.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${snapshot.isDragging ? 'dragging' : ''}`}
                          >
                            <Row
                              index={index}
                              data={row}
                              onAddVariant={(file) => addVariantColumn(row.id, file)}
                              onDeleteVariant={(variantId) => deleteVariant(row.id, variantId)}
                              onDeleteRow={() => deleteRow(row.id)}
                              onEditVariant={(variantId, newContent) => editVariantContent(row.id, variantId, newContent)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ) : null
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
