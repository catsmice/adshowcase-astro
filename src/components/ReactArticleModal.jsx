import React, { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

//            <a href="#" className="image-link" onClick={onOpen}>

function generateUserId() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < 8; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export default function ReactArticleModal({ article }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // Function to handle click events
    const handleModalClick = () => {
        onOpen();

        // Ensure the cookie is set or retrieve it
        let userId = getCookie('userId');
        if (!userId) {
            userId = generateUserId();  // You'd implement this to generate a unique ID
            setCookie('userId', userId, 365);  // Set cookie to expire in 365 days
        }

        // Tracking click via Google Analytics or GTM
        if (window.dataLayer) {
            window.dataLayer.push({
                'user_id': userId
            });

            window.dataLayer.push({
                'event': 'modal_open',
                'article_id': article.id,
                'article_title': article.card_title,
                'user_id': userId
            });
        }
    }

    const handleBarcodeClick = () => {
        // Ensure the cookie is set or retrieve it
        let userId = getCookie('userId');
        if (!userId) {
            userId = generateUserId();  // You'd implement this to generate a unique ID
            setCookie('userId', userId, 365);  // Set cookie to expire in 365 days
        }

        // Push the purchase event to the data layer
        window.dataLayer.push({
            'user_id': userId
        });

        window.dataLayer.push({
            'event': 'purchase',
            'article_id': article.id,
            'article_title': article.card_title,
            'user_id': userId
        });

        // Redirect the user to a specified bit.ly link
        window.location.href = 'https://bit.ly/example-link'; // Replace with your actual bit.ly link
    };

    return (
        <div>
            <a href="#" className="image-link" onClick={handleModalClick}>
                <img className="w-full h-auto rounded-lg mb-4 image-button" src={article.card_img}/>
            </a>
            <h2 className="text-xl font-semibold mb-2">
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
                                            <img src={article.modal_barcodeImg} width="120" height="120" className="rounded-lg" onClick={handleBarcodeClick}/>
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
