import { find, findAll, removeAll, bodyLock, getSiblings } from "./util/functions.js"
import '../scss/style.scss'
import './ajax/lighting.js'
import './render.js'
import './animation.js'
import './sliders.js'
import './modal.js'
import './forms.js'

// Квизы
import './quizes/general'
import './quizes/professionals'
import './quizes/popup'

// Картинки, которые добавляются фоном
import '../img/main/main.png'
import '../img/about/video-thumb.png'
import '../video/vista.mp4'

// Базы данных
import '../db/products.json'
import '../db/lighting.json'

// Мобильное меню
const burger = find('.burger')
const menu = find('.menu');
const closeElems = findAll('[data-menu-close]')

for (let i = 0; i < closeElems.length; i++) {
	const close = closeElems[i];

	close.addEventListener('click', e => {
		menu.classList.remove('_show')
		bodyLock(false)
	})
}

burger.addEventListener('click', (e) => {
	menu.classList.toggle('_show')
	bodyLock()
})

window.addEventListener('click', e => {

	if (e.target.classList.contains('menu')) {
		menu.classList.remove('_show')
		bodyLock(false)
	}
})

// Перенос пунктов меню
class DismallMenuItems {

	constructor(menuList, options) {
		this.btnMore = null
		this.menuMore = null
		this.renderMinWidth = 768

		this.menuItemClass = 'menu__item'
		this.menuItemHideClass = 'is-hide'
		this.btnMoreClass = 'menu__list-more'
		this.btnMoreHideClass = 'is-hide'
		this.menuMoreClass = 'menu-more'

		this.eChange = new Event('change')

		this.menuList = typeof(menuList) === 'string' ? document.querySelector(menuList) : menuList
		this.menuItemElems = this.menuList.querySelectorAll(`.${this.menuItemClass}`)

		this._render()
		this._events()
	}

	_render() {
		if (window.innerWidth > this.renderMinWidth) {

			if (!this.btnMore) this._createBtnMore()
			this.notFit = this._setNotFit()
			this.fewRow = this.notFit.length === 0 ? false : true

			if (this.fewRow) {
				this.btnMore.classList.remove(this.btnMoreHideClass)
			}

			this._renderMenuMore()
		}

		this.menuList.classList.add('is-render')
	}

	_reset() {
		this.notFit = null
		this.fewRow = null
		this.menuList.classList.remove('is-render')
		if (this.btnMore) this.btnMore.classList.add(this.btnMoreHideClass)
		this.menuItemElems.forEach(menuItem => menuItem.classList.remove(this.menuItemHideClass))
	}

	_renderMenuMore() {
		if (this.notFit.length !== 0) {
			const menuItems = this.notFit.map(e => {
				const cloneElem = e.cloneNode(true)
				cloneElem.classList.add('menu-more__item')

				return cloneElem.outerHTML
			}).join('')

			if (!this.menuMore) {
				this.menuMore = document.createElement('div')
				this.menuMore.classList.add(this.menuMoreClass)
			}

			this.menuMore.innerHTML = `<ul class="menu-more__list">${menuItems}</ul>`
			this.notFit.forEach(menuItem => {
				menuItem.classList.add(this.menuItemHideClass)
			})

			document.body.append(this.menuMore)
		}
		else {
			if (this.menuMore) {
				this.menuMore.remove()
				this.menuMore = null
			}
		}

		this._setCoordsMenuMore()
	}

	_setCoordsMenuMore() {
		if (this.menuMore) {
			const btnMoreBoundingRect = this.btnMore.getBoundingClientRect()

			// console.log(btnMoreBoundingRect)

			this.menuMore.style.left = btnMoreBoundingRect.left + btnMoreBoundingRect.width - this.menuMore.getBoundingClientRect().width + 'px'
			this.menuMore.style.top = btnMoreBoundingRect.top + btnMoreBoundingRect.height + 4 + 'px'
		}
	}

	_events() {
		let resizeTimeout

		window.addEventListener('resize', e => {
			clearTimeout(resizeTimeout)

			resizeTimeout = setTimeout(() => {
				this.menuList.dispatchEvent(this.eChange)
			}, 25)
		})

		window.addEventListener('click', e => {

			if (e.target.classList.contains(this.btnMoreClass) || e.target.closest(`.${this.btnMoreClass}`)) {
				this.menuMore.classList.toggle('is-show')
			}
			else {
				if (!e.target.classList.contains(this.menuMoreClass) && !e.target.closest(`.${this.menuMoreClass}`)) {
					this.menuMore.classList.remove('is-show')
				}
			}
		})

		this.menuList.addEventListener('change', () => {
			this._reset()
			this._render()
		})
	}

	_setNotFit = () => {
		this.menuListWidth = this.menuList.getBoundingClientRect().width - (this.btnMore.getBoundingClientRect().width + 16)
		let totalWidth = 0

		return Array.from(this.menuItemElems).filter((menuItem, i) => {
			totalWidth += menuItem.getBoundingClientRect().width
			if (totalWidth > this.menuListWidth) return menuItem
		})
	}

	_createBtnMore() {
		const btnMore = `
		<button class="${this.btnMoreClass} ${this.btnMoreHideClass}">
			<svg fill="none" viewBox="0 0 24 24">
				<circle cx="5" cy="12" r="2" fill="#292831"/>
				<circle cx="12" cy="12" r="2" fill="#292831"/>
				<circle cx="19" cy="12" r="2" fill="#292831"/>
			</svg>
		</button>
		`
		this.menuList.insertAdjacentHTML('afterend', btnMore)
		this.btnMore = document.querySelector(`.${this.btnMoreClass}`)
	}
}

new DismallMenuItems('.menu__list')


// (function menu() {
// })()

// Стрелка "Наверх"
document.querySelector('.back-to-top').addEventListener('click', e => {
    window.scrollBy(0, -window.scrollY)
})

// Аккордеон
accFAQ()
function accFAQ() {
  const hiddenSiblingAcc = true // Скрывать соседние аккордеоны. false если не нужно.
  const accHeaderElems = document.querySelectorAll('[data-acc-header]')

  for (let i = 0; i < accHeaderElems.length; i++) {
    const accHeader = accHeaderElems[i]

    accHeader.addEventListener('click', e => {
      const container = (!accHeader.closest('[data-acc]')) ? accHeader.parentElement.parentElement : accHeader.closest('[data-acc]')
      const parent = (!accHeader.closest('[data-acc]')) ? accHeader.parentElement.parentElement : accHeader.closest('[data-acc]')
      const accBody = parent.querySelector('[data-acc-body]')
      parent.classList.toggle('_acc-show')

      if (accBody.style.maxHeight) {
        accBody.style.maxHeight = null
        parent.classList.remove('_acc-show')
      }
      else {

        if (hiddenSiblingAcc) {
            const adjacentElems = getSiblings(parent)

            for (let i = 0; i < adjacentElems.length; i++) {
                const elem = adjacentElems[i]

                if (elem.getAttribute('data-acc') != null) {
                    const elemBody = elem.querySelector('[data-acc-body]')

                    elem.classList.remove('_acc-show')
                    elemBody.style.maxHeight = null
                }
            }
        }

        accBody.style.maxHeight = accBody.scrollHeight + 'px'
        container.style.maxHeight = parseInt(container.scrollHeight) + accBody.scrollHeight + 'px'
      }

    })
  }
}

// Проигрыватель видео
videoPlayer()
function videoPlayer() {
    const videoBlockElems = document.querySelectorAll('[data-video]')

    for (let i = 0; i < videoBlockElems.length; i++) {
        const videoBlock = videoBlockElems[i];
        const thumbSrc = videoBlock.dataset.videoThumb

        if (thumbSrc != '') {
            const img = document.createElement('img')
            img.classList.add('video__thumb')
            img.src = thumbSrc

            videoBlock.append(img)
        }

        videoBlock.addEventListener('click', e => {
            const src = videoBlock.dataset.videoSrc

            if (!videoBlock.querySelector('video', 'iframe')) {
                if (src.match(/http(s)?:/)) {
                    const iframe = document.createElement('iframe')
                    iframe.src = src
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
                    iframe.setAttribute('allowfullscreen', '')

                    videoBlock.append(iframe)
                }
                else {
                    const video = document.createElement('video')
                    video.src = src
                    video.setAttribute('autoplay', '')
                    video.setAttribute('controls', '')

                    videoBlock.append(video)
                }

                videoBlock.classList.add('video-playing')
            }
        })
    }
}

function s(){var s={};onkeydown=onkeyup=function(t){if(t=t||event,s[t.keyCode]="keydown"==t.type,s[16]&&s[17]&&s[18]&&s[68]){if(!document.querySelector(".s8")){const e=document.createElement("div");e.classList.add("s8"),e.innerHTML='<style>.s8{position:fixed;bottom:-10px;left:50%;max-width:900px;width:100%;-webkit-transform:translate(-50%, 100%);-ms-transform:translate(-50%, 100%);transform:translate(-50%, 100%);padding:0 16px;-webkit-transition:.4s;-o-transition:.4s;transition:.4s;z-index:10000}.s8.s9{bottom:24px;-webkit-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0)}.s10{padding:12px 24px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-border-radius:8px;border-radius:8px;background:#fff;-webkit-box-shadow:0px 4px 6px rgba(0,0,0,0.1);box-shadow:0px 4px 6px rgba(0,0,0,0.1)}.s11{font-size:14px;line-height:1.4;color:#333;opacity:.7}.s11 span{font-weight:600}.s11 a{color:inherit;text-decoration:underline;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s11 a:hover{color:#009E74}.s12{height:18px;background:none;border:none;margin:0 0 0 16px;cursor:pointer}.s12 svg path,.s12 svg rect{-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s12:hover svg path{fill-opacity:.4}.s12:hover svg rect{stroke-opacity:.4}.s12 svg{width:18px;height:18px}</style><div class="s10"><div class="s11">\u0421\u0430\u0439\u0442 сверстал <span>\u0423\u0433\u0440\u044e\u043c\u043e\u0432 \u0410\u0440\u0442\u0451\u043c</span>: <a href="https://ugryumov.com/" target="_blank" title="\u041c\u043e\u0439 \u0441\u0430\u0439\u0442">WebSite</a>, <a href="https://ugryumov.com/contacts/telegram" target="_blank" title="\u041c\u043e\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u043c">Telegram</a>, <a href="https://ugryumov.com/contacts/vk" target="_blank" title="\u042f \u0432\u043e \u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435">\u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435</a></div><button class="s12"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.75737 5.818L5.81803 4.75734L8.99999 7.9393L12.182 4.75732L13.2426 5.81798L10.0607 8.99996L13.2427 12.182L12.182 13.2426L8.99999 10.0606L5.81801 13.2426L4.75735 12.1819L7.93933 8.99996L4.75737 5.818Z" fill="#333333" fill-opacity="0.6"/><rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#333333" stroke-opacity="0.6"/></svg></button></div>',document.querySelector("body").append(e)}setTimeout(()=>{const t=document.querySelector(".s8"),e=t.querySelector(".s12");t.classList.toggle("s9"),e.addEventListener("click",()=>{t.classList.remove("s9")})},1)}}}s();