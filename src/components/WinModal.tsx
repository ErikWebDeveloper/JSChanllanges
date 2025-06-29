import Celebration from "./Confetti";
import { geniusGIF } from "../constants/gifs";
import { useState, useEffect } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function WinModal({ show, onClose }: Props) {
  if (!show) return null;
  const [randomGIF, setRandomGIF] = useState<number>(0);

  useEffect(() => {
    // Seleccionar un GIF aleatorio cuando el componente se monta
    const randomIndex = Math.floor(Math.random() * geniusGIF.length);
    setRandomGIF(randomIndex);
  }, []); // El array vacío asegura que solo se ejecute una vez

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
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">¡Enhorabuena! 🎉</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body text-center py-4 position-relative">
              <div className="confetti-container position-absolute top-0 start-0 w-100 h-100 overflow-hidden"></div>
              <h4 className="position-relative">¡Has ganado!</h4>
              <img
                src={geniusGIF[randomGIF]}
                width={200}
                className="img-thumbnail border-0 p-0 rounded-circle"
                alt="Celebration"
              />
              <p className="mt-3 position-relative">
                🎉 Felicidades por tu logro 🎉
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={onClose}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
