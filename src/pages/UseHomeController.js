import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';

const initialRows = [
    {
      id: '1',
      productFilter: {
        productCollection: 'Products',
        contains: 'Contains',
        anarkalis: 'Anarkalis'
      },
      variants: [
        { id: '1', content: 'Variant 1', image: null },
        { id: '2', content: 'Variant 2', image: null }
      ],
    }
  ];

function UseHomeController() {
const [rows, setRows] = useState(initialRows);

  const addRow = () => {
    setRows([...rows, {
      id: `${rows.length + 1}`,
      productFilter: {
        productCollection: 'Product Collection',
        contains: 'Contains',
        anarkalis: 'Anarkalis'
      },
      variants: [
        { id: '1', content: 'Variant 1', image: null },
      ]
    }]);
  };

  const addVariantColumn = (rowId, file) => {
    setRows(rows.map(row =>
      row.id === rowId ? {
        ...row,
        variants: [...row.variants, {
          id: `${Date.now()}`,
          content: `Variant ${row.variants.length + 1}`,
          image: file
        }]
      } : row
    ));
  };

  const editVariantContent = (rowId, variantId, newContent) => {
    setRows(rows.map(row =>
      row.id === rowId ? {
        ...row,
        variants: row.variants.map(variant =>
          variant.id === variantId ? { ...variant, content: newContent } : variant
        )
      } : row
    ));
  };

  const deleteVariant = (rowId, variantId) => {
    setRows(rows.map(row =>
      row.id === rowId ? {
        ...row,
        variants: row.variants.filter(variant => variant.id !== variantId)
      } : row
    ));
  };

  const deleteRow = (rowId) => {
    setRows(rows.filter(row => row.id !== rowId));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newRows = Array.from(rows);
    const [movedRow] = newRows.splice(result.source.index, 1);
    newRows.splice(result.destination.index, 0, movedRow);

    setRows(newRows);
  };

  const onButtonClick = () => {
    toast.success('Performed successfully',
      {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        draggable: true,
      }
  );
  };
  return {
    rows,
    addRow,
    addVariantColumn,
    editVariantContent,
    deleteVariant,
    deleteRow,
    onButtonClick,
    onDragEnd,
  }
}

export default UseHomeController