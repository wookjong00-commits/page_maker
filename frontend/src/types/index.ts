export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  textAlign: 'left' | 'center' | 'right';
}

export interface Animation {
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'none';
  duration: number;
  delay: number;
  easing: string;
}

export type ElementType = 'text' | 'image' | 'button' | 'container';

export interface BaseElement {
  id: string;
  type: ElementType;
  position: Position;
  size: Size;
  zIndex: number;
  animation?: Animation;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  style: TextStyle;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  alt: string;
}

export interface ButtonElement extends BaseElement {
  type: 'button';
  text: string;
  style: TextStyle;
  backgroundColor: string;
  borderRadius: number;
  link?: string;
}

export interface ContainerElement extends BaseElement {
  type: 'container';
  backgroundColor: string;
  borderRadius: number;
  children: string[]; // IDs of child elements
}

export type Element = TextElement | ImageElement | ButtonElement | ContainerElement;

export interface CanvasState {
  width: number;
  height: number;
  backgroundColor: string;
  elements: Element[];
}

export interface ApiConfig {
  provider: 'claude' | 'chatgpt' | 'gemini';
  apiKey: string;
}
