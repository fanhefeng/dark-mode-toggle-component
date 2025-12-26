// 1. 引入资源 -------------------------------------------------
import iconSvg from "./assets/dark_mode.svg?url"; // ?url 显式要路径
import flashlightWebp from "./assets/flashlight.webp?url";

// 2. 组件类 --------------------------------------------------
class DarkModeToggle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.updateFlashlight = this.updateFlashlight.bind(this);
		this.hasMoved = false;
	}

	static get observedAttributes() {
		return ["primary-color", "dark-mode"];
	}

	connectedCallback() {
		// 单例检查
		if (document.querySelectorAll("dark-mode-toggle").length > 1) {
			console.warn("[dark-mode-toggle] 只能存在一个实例，已自动移除后创建的实例。");
			this.remove();
			return;
		}
		this.render();
		this.initElements();
		this.setupInitialState();
		this.setupEvents();
	}

	initElements() {
		this.outer = this.shadowRoot.querySelector(".outer");
		this.inner = this.shadowRoot.querySelector(".inner");
		this.flashlight = this.shadowRoot.querySelector(".flashlight");
	}

	setupInitialState() {
		if (this.hasAttribute("dark-mode")) {
			document.body.classList.add("dark");
			this.updateDarkMode(null);
		}
	}

	setupEvents() {
		this.outer.addEventListener("click", (e) => {
			document.body.classList.toggle("dark");
			this.updateDarkMode(e);
		});
	}

	initStyle() {
		this.hasMoved = false;
		this.flashlight.style.left = "-9999px";
		this.flashlight.style.top = "-9999px";
		this.flashlight.style.opacity = 0;
		this.inner.style.opacity = 0;
	}

	updateFlashlight(e) {
		if (!e || !document.body.classList.contains("dark")) return;
		const clientX = e.clientX ?? e.touches?.[0]?.clientX;
		const clientY = e.clientY ?? e.touches?.[0]?.clientY;
		const pageX = e.pageX ?? e.touches?.[0]?.pageX;
		const pageY = e.pageY ?? e.touches?.[0]?.pageY;

		if (clientX !== undefined) {
			this.hasMoved = true;
			this.flashlight.style.opacity = 1;
			this.flashlight.style.left = `${clientX - 250}px`;
			this.flashlight.style.top = `${clientY - 250}px`;

			const rect = this.inner.getBoundingClientRect();
			const centerX = rect.left + window.scrollX + 38;
			const centerY = rect.top + window.scrollY + 12;
			const dist = Math.hypot(pageX - centerX, pageY - centerY);
			const opacity = Math.max(0, Math.min(1, (dist - 50) / 150));
			this.inner.style.opacity = opacity;
		}
	}

	updateDarkMode(e) {
		const dark = document.body.classList.contains("dark");
		if (dark) {
			if (e) this.updateFlashlight(e);
			["mousemove", "touchstart", "touchmove", "touchend"].forEach((ev) =>
				document.documentElement.addEventListener(ev, this.updateFlashlight, false)
			);
		} else {
			this.initStyle();
			["mousemove", "touchstart", "touchmove", "touchend"].forEach((ev) =>
				document.documentElement.removeEventListener(ev, this.updateFlashlight, false)
			);
		}
	}

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
      }
      :host-context(body.dark) .outer{ opacity:1; background-position:-26px 0; }
      :host-context(body.dark) .inner{ opacity:0; }
      :host-context(body.dark) .flashlight{
        display:block; box-shadow:0 0 0 9999px #000;
      }
    `;

		// 4. 结构 ----------------------------------------------------
		this.shadowRoot.append(style);
		this.shadowRoot.innerHTML += `
      <div class="outer"><div class="inner"></div></div>
      <img class="flashlight" src="${flashlightWebp}" alt="flashlight" />
    `;
	}
}

// 5. 注册 ------------------------------------------------------
customElements.define("dark-mode-toggle", DarkModeToggle);
