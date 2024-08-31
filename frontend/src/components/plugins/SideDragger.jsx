import React, { useEffect, useState } from "react";
import "./style.scss";
import DomRender from "../plugins/DomRender";

const SideDragger = ({
  open,
  onClose,
  background,
  width,
  style,
  className,
  blurOverlay,
  overlayBackground,
  dragPosition,
  children,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [animContent, setAnimContent] = useState(false);
  const getDragPosition = () => {
    if (dragPosition === "right") {
      if (animContent) {
        return {
          visibility: "visible",
          background: background ? background : "#fff",
          width: width ? width : "400px",
          right: 0,
          ...style,
        };
      } else {
        return {
          visibility: "visible",
          background: background ? background : "#fff",
          width: width ? width : "400px",
          right: "-10000px",
          ...style,
        };
      }
    } else if (dragPosition === "left") {
      if (animContent) {
        return {
          visibility: "visible",
          background: background ? background : "#fff",
          width: width ? width : "400px",
          left: 0,
          ...style,
        };
      } else {
        return {
          visibility: "visible",
          background: background ? background : "#fff",
          width: width ? width : "400px",
          left: "-1000px",
          ...style,
        };
      }
    } else {
      if (animContent) {
        return {
          visibility: "visible",
          background: background ? background : "#fff",
          width: width ? width : "400px",
          left: 0,
          ...style,
        };
      } else {
        return {
          visibility: "visible",
          background: background ? background : "#fff",
          width: width ? width : "400px",
          left: "-1000px",
          ...style,
        };
      }
    }
  };
  useEffect(() => {
    const sideDraggerElement = document.querySelector(".side-dragger");
    let root = document.querySelector("#root");
    if (sideDraggerElement) {
      root.classList.add("cmac-overlay");
      if (blurOverlay === false || blurOverlay === "false") {
        root.classList.remove("cmac-blur-overlay");
      } else {
        root.classList.add("cmac-blur-overlay");
      }
    } else {
      root.classList.remove("cmac-overlay");
      root.classList.remove("cmac-blur-overlay");
    }
  }, [showContent, blurOverlay]);
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setShowContent(true);
        setTimeout(() => {
          setAnimContent(true);
        }, 50);
      }, 50);
    } else {
      setTimeout(() => {
        setAnimContent(false);
        setTimeout(() => {
          setShowContent(false);
        }, 500);
      }, 1);
    }
  }, [open]);
  if (!showContent) {
    return;
  }
  return (
    <DomRender>
      <div
        className={`side-dragger ${!animContent && "slow-fade-out"}`}
        style={{
          justifyContent:
            dragPosition === "right"
              ? "flex-end"
              : dragPosition === "left"
              ? "flex-start"
              : "flex-start",
          backgroundColor: overlayBackground
            ? overlayBackground
            : "rgba(0, 0, 0, 0.5)",
        }}
        onClick={(e) => {onClose && onClose(); e.stopPropagation()}}
      >
        <div
          style={getDragPosition()}
          className={`dragger-content ${className ? className : false}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </DomRender>
  );
};

export default SideDragger;