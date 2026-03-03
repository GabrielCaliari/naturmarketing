"use client";

import { useEffect } from "react";

import * as S from "./styles";

// Declarações globais para jQuery e GSAP
declare const $: {
  (selector: string): {
    addClass: (className: string) => void;
    removeClass: (className: string) => void;
    on: (event: string, handler: () => void) => void;
  };
};

declare const gsap: {
  to: (target: object, duration: number, vars: {
    repeat?: number;
    onRepeat?: () => void;
  }) => void;
  set: (target: unknown, vars: { css: { left: number; top: number } }) => void;
};

const Cursor = () => {
  const animate = () => {
    // Verifica se jQuery e GSAP estão disponíveis
    if (typeof $ === 'undefined' || typeof gsap === 'undefined') {
      console.warn('jQuery ou GSAP não estão disponíveis');
      return;
    }

    const cursor = $(".cursor");
    const follower = $(".cursor-follower");

    let posX = 0,
      posY = 0;

    let mouseX = 0,
      mouseY = 0;

    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: function () {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        gsap.set(follower, {
          css: {
            left: posX - 12,
            top: posY - 12,
          },
        });

        gsap.set(cursor, {
          css: {
            left: mouseX,
            top: mouseY,
          },
        });
      },
    });

    const setupEventListeners = () => {
      $("button, a, form").on("mouseenter", function () {
        cursor.addClass("active");
        follower.addClass("active");
      });
      $("button, a, form").on("mouseleave", function () {
        cursor.removeClass("active");
        follower.removeClass("active");
      });
    };

    if (document.readyState === 'complete') {
      setupEventListeners();
    } else {
      window.addEventListener('load', setupEventListeners);
    }

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <>
      <S.CursorWrapper className="cursor"></S.CursorWrapper>
      <div className="cursor-follower"></div>
    </>
  );
};

export { Cursor };
