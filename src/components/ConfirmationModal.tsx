import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  isPost: boolean; // Nouvelle prop pour indiquer si c'est un post ou un commentaire
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isPost,
}) => {
  const confirmationText = isPost
    ? "Are you sure you want to delete this post?"
    : "Are you sure you want to delete this comment?";

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-lg shadow-lg z-10">
            <p className="text-lg mb-4">{confirmationText}</p>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  onConfirm(e);
                  onClose();
                }}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
