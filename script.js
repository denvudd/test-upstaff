class CustomWidget {
  constructor(selector) {
    this.productContainer = document.querySelector(selector);
    this.element = this.createWidget();

    this.injectStyles();
    this.updateWidgetWidth(); 

    window.addEventListener("resize", this.updateWidgetWidth.bind(this)); 
  }

  injectStyles() {
    const styles = `
    .widget-photo {
      width: 100%;
      min-height: 250px;
      background: url('https://d2arh21vgqhs9.cloudfront.net/prod/upload/stories/D1ccJF0TQtP5h4ZFOn5Wrs3PUiywpUtb.jpg');
      background-size: cover;
      background-position: 20% 40%;
      border-radius: 2rem 2rem 0rem 0rem;
    }

    .widget-text {
        padding: 1rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .widget-inner {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100%;
        background: #EFEFEF;
        border-radius: 2rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    .widget-title {
        font-size: 1.5rem;
        font-weight: 700;
    }

    .widget-description {
        font-size: 1rem;
        font-weight: 400;
    }
  `;

    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");

    document.head.appendChild(styleTag);
  }

  createWidgetRootStyles(widget) {
    widget.style.cssText = `
      margin: 1rem 0;
      border-radius: 8px;
      text-align: center;
      flex: 0 0 calc(47%);
      width: calc(47%);
      padding: 0.8rem;
    `;

    return widget;
  }

  createWidgetRootElement() {
    const customDiv = document.createElement("div");
    customDiv.classList.add("custom-div");

    return customDiv;
  }

  createWidgetContent(widget) {
    widget.innerHTML = `
      <div class="widget-inner">
        <div class="widget-photo"></div>
        <div class="widget-text">
          <h3 class="widget-title">New Collection</h3>
          <p class="widget-description">
            Coming soon!
          </p>
        </div>
      </div>
    `;

    return widget;
  }

  createWidget() {
    const rootElem = this.createWidgetRootElement();
    const widgetContent = this.createWidgetContent(rootElem);
    const readyWidget = this.createWidgetRootStyles(widgetContent);

    const fourthProduct =
      this.productContainer.querySelector("li:nth-child(4)");
    this.productContainer.insertBefore(
      readyWidget,
      fourthProduct.nextElementSibling
    );

    return readyWidget;
  }

  updateWidgetWidth() {
    const isMobileView = window.matchMedia("(max-width: 768px)").matches;
    const isTabletView = window.matchMedia("(max-width: 1198px)").matches;

    if (isMobileView) {
      console.log("mobile");
      this.element.style.cssText = `
        width: calc(100%) - 0.25rem;
        flex: 0 0 calc(100% - 0.25rem);
        margin: 0px 0px 3%;
        min-height: 420px;
        height: 100%:
      `;

      return;
    } else if (isTabletView) {
      console.log("tablet");
      this.element.style.cssText = `
        width: calc(64%);
        flex: 0 0 calc(64%);
        margin: 0px 0px 3%;
      `;

      return;
    } else {
      this.element.style.cssText = `
        width: calc(47%);
        flex: 0 0 calc(47%);
        margin: 0px 0px 3%;
      `;

      return;
    }
  }
}

const widget = new CustomWidget(".products .product-items");
