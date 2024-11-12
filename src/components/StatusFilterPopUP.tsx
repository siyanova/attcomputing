import { PopUpBg } from "./PopUpBg";

interface StatusPopUpProps {
  isOpen: boolean;
  onClose: () => void;
}
export const StatusPopUp: React.FC<StatusPopUpProps> = ({ isOpen, onClose }) => {
  return (
    <PopUpBg>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="z-50 w-96 bg-white p-4 rounded-lg">
            <div className="flex justify-end">
              <button onClick={onClose}>&times;</button>
            </div>
            <div className="p-2">
              <p>This is a modal window.</p>
            </div>
          </div>
        </div>
      )}
    </PopUpBg>
  );
};
