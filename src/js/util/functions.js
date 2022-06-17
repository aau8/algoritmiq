// Служебные переменные
const body = document.querySelector('body');

// Служебные функции
export function find(selector) {
	return document.querySelector(selector)
}

export function findAll(selectors) {
	return document.querySelectorAll(selectors)
}

// Удаляет у всех элементов items класс itemClass
export function removeAll(items,itemClass) {
    if (typeof items == 'string') {
      items = document.querySelectorAll(items)
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      item.classList.remove(itemClass)
    }
}

export function bodyLock(con) {
    if (con === true) {
        body.classList.add('_lock');
    } else if (con === false) {
        body.classList.remove('_lock');
    } else if (con === undefined) {
		if (!body.classList.contains('_lock')) {
			body.classList.add('_lock');
		}
		else {
			body.classList.remove('_lock')
		}
	} else {
		console.error('Неопределенный аргумент у функции bodyLock()')
	}
}

// Получаем все соседние элементы
export function getSiblings(elem) {
  var siblings = [];
  var sibling = elem;
  while (sibling.previousSibling) {
      sibling = sibling.previousSibling;
      sibling.nodeType == 1 && siblings.push(sibling);
  }

  sibling = elem;
  while (sibling.nextSibling) {
      sibling = sibling.nextSibling;
      sibling.nodeType == 1 && siblings.push(sibling);
  }

  return siblings;
}

export default {
  find,
  findAll,
  removeAll,
  bodyLock,
  getSiblings
}