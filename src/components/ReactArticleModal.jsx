import React, { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ReactArticleModal({ article }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleTitleClick = () => {
        // Assuming the gtag function is already included in your project
        window.gtag('event', 'select_content', {
            content_type: 'article',
            item_id: article.card_title
        });

        //onOpen(); // Open the modal after sending the event
    };

    return (
        <div>
            <a href="#" className="image-link" onClick={onOpen}>
                <img className="w-full h-auto rounded-lg mb-4 image-button" src={article.card_img}/>
            </a>
            <h2 className="text-xl font-semibold mb-2" onClick={handleTitleClick}>
                {article.card_title}
            </h2>
            <p className="text-gray-600 mb-2">
                {article.card_line_1}
            </p>
            <p className="text-gray-400">
                {article.card_line_2}
            </p>

            <Modal 
                backdrop="opaque" 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                radius="lg"
                size="3xl"
                placement="center"
                scrollBehavior="inside"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-gray-50 text-gray-600",
                    header: "border-b-[1px] border-gray-300",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "py-5 hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{article.card_title}</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col lg:flex-row">
                                    <div className="flex justify-center w-full lg:w-1/2 mb-4">
                                        <img src={article.modal_img} className="rounded-lg"/>
                                    </div>
                                    <div className="flex flex-col justify-center w-full lg:w-1/2 lg:pl-6">
                                        <h2 className="text-2xl font-semibold mb-4">{article.modal_title}</h2>
                                        <p className="text-gray-700 mb-4">{article.modal_description}</p>
                                        <div className="mb-4">
                                            <span className="text-black-600">支援裝置類型</span>
                                            <span className="bg-purple-200 text-purple-600 rounded-full px-5 py-1 text-sm font-semibold mr-3 mb-2">{article.modal_device}</span>
                                        </div>
                                        <div className="flex justify-center mb-4 mt-4">
                                            <img src={article.modal_barcodeImg} width="120" height="120" className="rounded-lg"/>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
