import * as window from './window'
import HTMLElement from './HTMLElement'
import HTMLVideoElement from './HTMLVideoElement'
import Image from './Image'
import Audio from './Audio'
import Canvas from './Canvas'
import './EventIniter/index'

const events: any = {}

const document = {
  readyState: 'complete',
  visibilityState: 'visible',
  documentElement: window,
  hidden: false,
  style: {},
  location: window.location,
  ontouchstart: null,
  ontouchmove: null,
  ontouchend: null,

  head: new HTMLElement('head'),
  body: new HTMLElement('body'),

  createElement(tagName: string) {
    if (tagName === 'canvas') {
      return new (Canvas as any)()
    } else if (tagName === 'audio') {
      return new Audio()
    } else if (tagName === 'img') {
      return new (Image as any)()
    } else if (tagName === 'video') {
      return new HTMLVideoElement()
    }

    return new HTMLElement(tagName)
  },

  createElementNS(nameSpace: string, tagName: string) {
    return this.createElement(tagName);
  },

  getElementById(id: string) {
    if (id === window.canvas.id) {
      return window.canvas
    }
    return null
  },

  getElementsByTagName(tagName: string) {
    if (tagName === 'head') {
      return [document.head]
    } else if (tagName === 'body') {
      return [document.body]
    } else if (tagName === 'canvas') {
      return [window.canvas]
    }
    return []
  },

  getElementsByName(tagName: string) {
    if (tagName === 'head') {
      return [document.head]
    } else if (tagName === 'body') {
      return [document.body]
    } else if (tagName === 'canvas') {
      return [window.canvas]
    }
    return []
  },

  querySelector(query: string) {
    if (query === 'head') {
      return document.head
    } else if (query === 'body') {
      return document.body
    } else if (query === 'canvas') {
      return window.canvas
    } else if (query === `#${window.canvas.id}`) {
      return window.canvas
    }
    return null
  },

  querySelectorAll(query: string) {
    if (query === 'head') {
      return [document.head]
    } else if (query === 'body') {
      return [document.body]
    } else if (query === 'canvas') {
      return [window.canvas]
    }
    return []
  },

  addEventListener(type: string, listener: string) {
    if (!events[type]) {
      events[type] = []
    }
    events[type].push(listener)
  },

  removeEventListener(type: string, listener: Function) {
    const listeners = events[type]

    if (listeners && listeners.length > 0) {
      for (let i = listeners.length; i--; i > 0) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1)
          break
        }
      }
    }
  },

  dispatchEvent(event: any) {
    const listeners = events[event.type]

    if (listeners) {
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](event)
      }
    }
  }
}

export default document
