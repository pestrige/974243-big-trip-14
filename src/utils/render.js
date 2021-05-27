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

// замена элемента
export const replace = (oldChild, newChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }
  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }
  const parent = oldChild.parentElement;
  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const renderTooltip = (target, text) => {
  const TOP_SPACING = 15;
  const tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerText = text;
  document.body.append(tooltipElem);

  const coords = target.getBoundingClientRect();
  let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) {
    left = 0;
  }
  let top = coords.top - tooltipElem.offsetHeight - TOP_SPACING;
  if (top < 0) {
    top = coords.top + target.offsetHeight + TOP_SPACING;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';

  setTimeout(() => {
    tooltipElem.remove();
  }, 3000);
};

