"use client";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";

export default function MapView() {
    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            width: "100vw", 
            height: "80vh", 
            backgroundColor: "#f0f0f0", 
            overflow: "hidden"
        }}>
            <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={5}
                wheel={{ step: 0.1 }}
                doubleClick={{ disabled: true }}
            >
                <TransformComponent>
                    <Image 
                        src="/map.png" 
                        alt="倉庫マップ" 
                        style={{ 
                            maxWidth: "1000%",
                            maxHeight: "1000%",
                            objectFit: "contain"
                        }} 
                        width={1000}
                        height={1000}
                    />
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}
