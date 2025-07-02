import Celebration from "@/components/Confetti";
import { useNavigate } from "react-router-dom";

interface Props {
  show: boolean;
  onClose: () => void;
  nextChallenge: string | null;
}

export default function WinModal({ show, onClose, nextChallenge }: Props) {
  const navigate = useNavigate();
  if (!show) return null;

  const handleNavigate = () => {
    onClose();
    navigate(`/challenges/${nextChallenge}`);
  };

  return (
    <>
      {/* Fondo oscuro */}
      <div className="modal-backdrop show" style={{ zIndex: 1040 }}></div>
      {show && (
        <div style={{ zIndex: 1060 }}>
          <Celebration />
        </div>
      )}
      {/* Modal */}
      <div
        className="modal show d-block"
        tabIndex={-1}
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/*<div className="modal-header bg-success text-white">
              <h5 className="modal-title">¡Enhorabuena! </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>*/}
            <div className="modal-body text-center py-4 position-relative pb-3">
              <div className="confetti-container position-absolute top-0 start-0 w-100 h-100 overflow-hidden"></div>
              <h4 className="position-relative">🎉 ¡Reto completado! 🎉</h4>
              {/*<img
                src={geniusGIF[randomGIF]}
                width={200}
                className="img-thumbnail border-0 p-0 rounded-circle"
                alt="Celebration"
              />*/}
              <p className="mt-3 position-relative">
                ¡Eres un auténtico mago de JavaScript!
                {nextChallenge && "Sigue practicando y prueba otro reto."}
              </p>
            </div>
            <div className="modal-footer border-0 d-flex align-items-center justify-content-center pt-0">
              <button className="btn btn-secondary" onClick={onClose}>
                Cerrar
              </button>
              {nextChallenge && (
                <button className="btn btn-success" onClick={handleNavigate}>
                  Continuar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
