import {  Modal } from 'antd';
import IcWarning from '@/assets/icons/IcWarning';
import IcSuccess from '@/assets/icons/IcSuccess';
import IcError from '@/assets/icons/IcError';

export default function ModalAlert({ isModalOpen, alertContent, handleCancel, handleSubmit }) {
    return (
        <Modal
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
            footer={null}
            width={400}
        >
            <div className="flex flex-col items-center rounded-md bg-white">
                {alertContent?.status === "success" && <IcSuccess />}
                {alertContent?.status === "error" && <IcError />}
                {alertContent?.status === "warning" && <IcWarning />}
                <h1 className="text-xl font-bold text-center mt-3">{alertContent?.title}</h1>
                <p className="text-sm text-gray-700 text-center">{alertContent?.content}</p>
                <div className="flex justify-between w-full mt-5 gap-4">
                    <button
                        className="w-full h-[36px] rounded-sm border border-gray-300 text-gray-800 font-semibold"
                        onClick={handleCancel}
                    >
                        Quay lại
                    </button>
                    <button
                        className="w-full h-[36px] rounded-sm bg-[#D02028] text-white font-semibold"
                        onClick={handleSubmit ? handleSubmit : handleCancel}
                    >
                        OK
                    </button>
                </div>
            </div>
        </Modal>
    );
}