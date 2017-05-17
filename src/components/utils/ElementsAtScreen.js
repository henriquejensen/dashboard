import React from "react";
import { LOADING_GIF } from "../../constants/utils";

export const PrintScreen = () => {
    return (
        <i className="fa fa-print no-print my-print-screen" onClick={window.print} aria-hidden="true"></i>
    )
}

export const LoadingScreen = () => {
    return (
        <div className="imgSearching"><img src={LOADING_GIF} /></div>
    )
}