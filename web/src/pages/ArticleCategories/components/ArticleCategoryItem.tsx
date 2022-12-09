import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { usePutArticleCategory } from '../../../hooks/api/articles/usePutArticleCategory';
import { IAdminArticleCategory } from '../../../services/api/articles/getAdminArticles';
import { Pencil } from '../../../shared/Icons';
import Trashcan from '../../../shared/Icons/Trashcan/Trashcan';
import Unarchive from '../../../shared/Icons/Unarchive/Unarchive';
import Modal from '../../../shared/Modal/Modal';

type Props = {
  category: IAdminArticleCategory;
};

const CategoryItem: React.FC<Props> = ({ category }) => {
  const queryClient = useQueryClient();

  const handleEditSuccess = () => {
    queryClient.refetchQueries(['getArticleCategories']);
    setShowEditModal(false);
  };

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [name, setName] = useState<string>(category.name ? category.name : '');

  const { mutate: updateSubmit } = usePutArticleCategory({
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
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleToggleArchiveApprove = () => {
    updateSubmit({
      id: category.id,
      putData: {
        name: name,
        isEnabled: !category.isEnabled,
      },
    });
    setShowDeleteModal(false);
  };

  const handleTrashcanClick = () => {
    setShowDeleteModal(true);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  return (
    <>
      <span
        className={`category__name ${category.isEnabled ? '' : 'disabled'}`}
      >
        {category.name}
        <button className="category__btn" onClick={handleEditClick}>
          <Pencil />
        </button>
        <button className="category__btn" onClick={handleTrashcanClick}>
          {category.isEnabled ? <Trashcan /> : <Unarchive />}
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
          title="Arhiviranje kategorije"
          handleApprove={handleToggleArchiveApprove}
          handleCancel={handleDeleteCancel}
          content={
            category.isEnabled
              ? 'Da li ste sigurni da zelite da arhivirate kategoriju?'
              : 'Da li ste sigurni da zelite aktivirati kategoriju?'
          }
        />
      )}
    </>
  );
};

export default CategoryItem;
