// 1. 引入资源 -------------------------------------------------
import iconSvg from "./assets/dark_mode.svg?url"; // ?url 显式要路径
import flashlightWebp from "./assets/flashlight.webp?url";

// 2. 组件类 --------------------------------------------------
class DarkModeToggle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		// 绑定所有需要在事件处理中调用的函数
		this.updateFlashlight = this.updateFlashlight.bind(this);
		this.updateDarkMode = this.updateDarkMode.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.hasMoved = false;

		// 检查是否已经存在单例实例
		if (DarkModeToggle.instanceExists) {
			console.warn(
				"[dark-mode-toggle] Only one instance of this component is allowed. The new instance has been removed. Please ensure only one <dark-mode-toggle> element is used in your document."
			);
			this.remove();
			return;
		}
		DarkModeToggle.instanceExists = true; // 设置单例标志

		this.eventListeners = []; // 存储事件监听器
	}

	// 设置观察的属性
	static get observedAttributes() {
		return ["primary-color", "dark-mode"];
	}

	connectedCallback() {
		this.render();
		this.initElements();
		this.setupInitialState();
		this.setupEvents();
	}

	// 初始化 DOM 元素
	initElements() {
		this.outer = this.shadowRoot.querySelector(".outer");
		this.inner = this.shadowRoot.querySelector(".inner");
		this.flashlight = this.shadowRoot.querySelector(".flashlight");
	}

	// 设置初始状态
	setupInitialState() {
		if (this.hasAttribute("dark-mode")) {
			document.body.classList.add("dark");
			this.updateDarkMode(null);
		}
	}

	// 设置事件监听器
	setupEvents() {
		if (!this.outer) return; // 防止未初始化时添加事件
		this.outer.addEventListener("click", this.handleClick);
		this.eventListeners.push({
			element: this.outer,
			event: "click",
			handler: this.handleClick,
		});
	}

	// 处理点击事件
	handleClick(e) {
		document.body.classList.toggle("dark");
		this.updateDarkMode(e);
	}

	// 移除所有事件监听器
	removeEventListeners() {
		this.eventListeners.forEach(({ element, event, handler }) => {
			element.removeEventListener(event, handler);
		});
		this.eventListeners = [];
	}

	// 重置样式
	initStyle() {
		this.hasMoved = false;
		this.flashlight.style.left = "-9999px";
		this.flashlight.style.top = "-9999px";
		this.flashlight.style.opacity = 0;
		this.inner.style.opacity = 0;
	}

	// 更新手电筒位置和透明度
	updateFlashlight(e) {
		if (!e || !document.body.classList.contains("dark")) return;

		const clientX = e.clientX ?? e.touches?.[0]?.clientX;
		const clientY = e.clientY ?? e.touches?.[0]?.clientY;

		if (clientX !== undefined) {
			this.hasMoved = true;
			this.flashlight.style.opacity = 1;
			this.flashlight.style.left = `${clientX - 250}px`;
			this.flashlight.style.top = `${clientY - 250}px`;

			const rect = this.inner.getBoundingClientRect();
			const centerX = rect.left + window.scrollX + 38;
			const centerY = rect.top + window.scrollY + 12;
			const dist = Math.hypot(clientX - centerX, clientY - centerY);
			const opacity = Math.max(0, Math.min(1, (dist - 50) / 150));
			this.inner.style.opacity = opacity;
		}
	}

	// 更新暗黑模式
	updateDarkMode(e) {
		const dark = document.body.classList.contains("dark");
		if (dark) {
			if (e) this.updateFlashlight(e);
			this.addMoveListeners();
		} else {
			this.removeMoveListeners();
			this.initStyle();
		}
	}

	// 添加移动事件监听器
	addMoveListeners() {
		["mousemove", "touchstart", "touchmove", "touchend"].forEach((ev) =>
			document.documentElement.addEventListener(ev, this.updateFlashlight, false)
		);
	}

	// 移除移动事件监听器
	removeMoveListeners() {
		["mousemove", "touchstart", "touchmove", "touchend"].forEach((ev) =>
			document.documentElement.removeEventListener(ev, this.updateFlashlight, false)
		);
	}

	// 渲染组件
	render() {
		const primary = this.getAttribute("primary-color") || "#6155f5";

		// 3. 动态样式 ------------------------------------------------
		const style = document.createElement("style");
		style.textContent = `
      :host{ --local-primary:${primary}; }
      .outer{
        display:flex; opacity:.3; width:26px; height:26px; border-radius:50%;
        background-image:url("${iconSvg}"); background-size:52px 52px; background-position:0 0;
        transition:background-position-x .1s; cursor:pointer; position:relative;
      }
      .outer:hover{ opacity:1; }
      .inner{
        width:26px; height:26px; border-radius:50%; cursor:pointer;
        background-image:url("${iconSvg}"); background-size:52px 52px; background-position:-26px -26px;
        background-color:var(--local-primary); box-shadow:0 0 10px 1.5px var(--local-primary);
        z-index:20; opacity:0; position:absolute;
      }
      .flashlight{
        opacity:0; position:fixed; left:-9999px; top:-9999px;
        width:500px; height:500px; pointer-events:none; z-index:10;
        transition:opacity .75s cubic-bezier(.4,.36,0,1);
        will-change: opacity, left, top;
      }
      :host-context(body.dark) .outer{ opacity:1; background-position:-26px 0; }
      :host-context(body.dark) .inner{ opacity:0; }
      :host-context(body.dark) .flashlight{
        display:block; box-shadow:0 0 0 9999px #000;
      }
    `;

		// 4. 结构 ----------------------------------------------------
		this.shadowRoot.append(style);

		const outerDiv = document.createElement("div");
		outerDiv.classList.add("outer");
		const innerDiv = document.createElement("div");
		innerDiv.classList.add("inner");

		const flashlightImg = document.createElement("img");
		flashlightImg.classList.add("flashlight");
		flashlightImg.src = flashlightWebp;
		flashlightImg.alt = "flashlight";

		outerDiv.appendChild(innerDiv);
		this.shadowRoot.appendChild(outerDiv);
		this.shadowRoot.appendChild(flashlightImg);
	}

	// 确保组件从文档中移除时清理所有事件
	disconnectedCallback() {
		// 移除所有事件监听器
		this.removeEventListeners();

		// 清除单例标志
		DarkModeToggle.instanceExists = false;

		// 移除全局事件监听器
		this.removeMoveListeners();
	}
}

// 5. 注册 ------------------------------------------------------
customElements.define("dark-mode-toggle", DarkModeToggle);
