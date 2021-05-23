import AbstractView from '../view/abstract.js';
import { RenderPosition } from '../const.js';

// создание DOM элемента
export const createDomElement = (template) => {
  const templateContainer = document.createElement('template');
  templateContainer.innerHTML = template;
  return templateContainer.content.firstElementChild;
};

// рендер компонента
export const render = (container, element, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.START:
      container.prepend(element);
      break;
    case RenderPosition.END:
    default:
      container.append(element);
  }
};

// удаление компонента
export const remove = (component) => {
  if (component === null) {
    return;
  }
  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove components only');
  }

  component.getElement().remove();
  component.removeElement();
};
