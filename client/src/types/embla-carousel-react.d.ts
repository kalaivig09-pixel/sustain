declare module 'embla-carousel-react' {
  import { ComponentType } from 'react';

  export type EmblaOptionsType = {
    align?: 'start' | 'center' | 'end';
    axis?: 'x' | 'y';
    containScroll?: boolean | 'trimSnaps' | 'keepSnaps';
    direction?: 'ltr' | 'rtl';
    dragFree?: boolean;
    draggable?: boolean;
    inViewThreshold?: number;
    loop?: boolean;
    skipSnaps?: boolean;
    speed?: number;
    startIndex?: number;
  };

  export type EmblaPluginType = (embla: any) => void;
  
  export type EmblaCarouselType = [
    (node: HTMLElement | null) => void,
    EmblaCarouselApi | undefined
  ];

  export interface EmblaCarouselApi {
    canScrollNext(): boolean;
    canScrollPrev(): boolean;
    scrollNext(): void;
    scrollPrev(): void;
    scrollTo(index: number): void;
    selectedScrollSnap(): number;
    scrollProgress(): number;
    off(eventName: string, cb: () => void): void;
    on(eventName: string, cb: (api: EmblaCarouselApi) => void): void;
  }

  export type UseEmblaCarouselType = [
    (node: HTMLElement | null) => void,
    EmblaCarouselApi | undefined
  ];

  const useEmblaCarousel: (
    options?: EmblaOptionsType,
    plugins?: EmblaPluginType[]
  ) => UseEmblaCarouselType;

  export default useEmblaCarousel;
}
