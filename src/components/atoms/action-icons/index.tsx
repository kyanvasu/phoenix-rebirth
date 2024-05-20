import React, { useState } from 'react';

interface ActionIconProps {
  icon: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActionIcon: React.FC<ActionIconProps> = ({ icon, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleIconClick = () => {
    setShowMenu(!showMenu);
  };

  const handleEditClick = () => {
    setShowMenu(false);
    if (onEdit) {
      onEdit();
    }
  };

  const handleDeleteClick = () => {
    setShowMenu(false);
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="relative">
      <button onClick={handleIconClick}>
        {icon}
      </button>
      {showMenu && (
        <div className="absolute bg-white border mt-2 z-10">
          <ul>
            {onEdit && <li onClick={handleEditClick} className="cursor-pointer p-2 hover:bg-gray-100">Editar</li>}
            {onDelete && <li onClick={handleDeleteClick} className="cursor-pointer p-2 hover:bg-gray-100">Eliminar</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionIcon;
