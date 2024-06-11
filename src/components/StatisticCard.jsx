import { useState } from "react";

export default function Box({ title, icon: Icon, color, total }) {
    let colors;
    switch (color) {
        case "blue":
            colors = {
                background: "#1E88E5",
                backgroundIcon: "#1565C0",
                circle1: "#1A77D2",
                circle2: "#1565C0",
            };
            break;
        case "green":
            colors = {
                background: "#4CAF50",
                backgroundIcon: "#388E3C",
                circle1: "#43A047",
                circle2: "#388E3C",
            };
            break;
        case "purple":
            colors = {
                background: "#5E35B1",
                backgroundIcon: "#4527A0",
                circle1: "#522EA8",
                circle2: "#4527A0",
            };
            break;
        case "orange":
            colors = {
                background: "#FF9800",
                backgroundIcon: "#F57C00",
                circle1: "#FB8C00",
                circle2: "#F57C00",
            };
            break;
        case "yellow":
            colors = {
                background: "#FFEB3B",
                backgroundIcon: "#FBC02D",
                circle1: "#FFD54F",
                circle2: "#FBC02D",
            };
            break;
        case "red":
            colors = {
                background: "#F44336",
                backgroundIcon: "#D32F2F",
                circle1: "#E53935",
                circle2: "#D32F2F",
            };
            break;
        default:
            colors = {
                background: "#FFC107",
                backgroundIcon: "#FFA000",
                circle1: "#FFB300",
                circle2: "#FFA000",
            };
            break;
    }

    return (
        <div className="relative h-40 overflow-hidden rounded-md px-4 py-6" style={{ backgroundColor: colors.background }}>
            <div className="flex flex-col">
                <div className="p-2 w-10 rounded-md" style={{ backgroundColor: colors.backgroundIcon }}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="pt-2">
                    <span className="text-3xl font-semibold text-white">
                        {total}
                    </span>
                </div>
                <div className="">
                    <span className="text-base font-semibold text-white opacity-70">
                        {title}
                    </span>
                </div>
            </div>
            <div className="absolute w-36 h-36 rounded-full" style={{ backgroundColor: colors.circle1, top: '-4rem', right: '0' }}></div>
            <div className="absolute w-40 h-40 rounded-full" style={{ backgroundColor: colors.circle2, top: '-3rem', right: '-5rem' }}></div>
        </div>
    );
}
