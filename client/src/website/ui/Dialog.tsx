import { createPortal } from "react-dom";

interface Props {
    children?: React.ReactNode
    onClose?: () => void
}

export default function Dialog({ onClose, children }: Props) {
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose && onClose();
    }
    return createPortal(
        <div className="fixed inset-0 bg-opacity-90 flex items-center justify-center backdrop-blur-lg" onClick={handleClose}>
            <div className="bg-black bg-opacity-70 rounded-lg shadow-lg p-8 w-96 flex flex-col gap-4">
                {children}
            </div>
        </div>,
        document.body // Render modal here
    );
}