import React, { useState } from 'react';
import { usePutCategory } from '../../../../hooks/api/Categories/usePutCategory';
import { ICategoryResponse } from '../../../../services/api/Categories/getCategories';
import { Pencil } from '../../../../shared/Icons';
import Trashcan from '../../../../shared/Icons/Trashcan/Trashcan';
import Modal from '../../../../shared/Modal/Modal';

type Props = {
  category: ICategoryResponse;
  refetchCategories: () => void;
};

const CategoryItem: React.FC<Props> = ({ category, refetchCategories }) => {
  const handleEditSuccess = () => {
    setShowEditModal(false);
  };

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [name, setName] = useState<string>(category.name ? category.name : '');

  const { mutate: updateSubmit } = usePutCategory({
    onSuccess: handleEditSuccess,
  });

  const handleEditCancel = () => {
    setShowEditModal(false);
  };

  const handleEditApprove = () => {
    updateSubmit({
      id: category.id,
      putData: {
        name: name,
        isEnabled: true,
      },
    });
    setShowEditModal(false);
    refetchCategories();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteApprove = () => {
    updateSubmit({
      id: category.id,
      putData: {
        name: name,
        isEnabled: false,
      },
    });
    setShowDeleteModal(false);
    refetchCategories();
  };

  const handleTrashcanClick = () => {
    setShowDeleteModal(true);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  return (
    <>
      <span className="category__name">
        {category.name}
        <button className="category__btn" onClick={handleEditClick}>
          <Pencil />
        </button>
        <button className="category__btn" onClick={handleTrashcanClick}>
          <Trashcan />
        </button>
      </span>
      {showEditModal && (
        <Modal
          handleApprove={handleEditApprove}
          handleCancel={handleEditCancel}
          title="Izmeni kategoriju"
          key={category.id}
        >
          <input
            type="text"
            className="category__input category__input--modal"
            value={name}
            onChange={handleOnChange}
          />
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          title="Brisanje kategorije"
          handleApprove={handleDeleteApprove}
          handleCancel={handleDeleteCancel}
          content="Da li ste sigurni da zelite da obrisete kategoriju?"
        />
      )}
    </>
  );
};

export default CategoryItem;
