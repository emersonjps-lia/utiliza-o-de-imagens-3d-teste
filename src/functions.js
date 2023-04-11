//generates random numbers
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

const randomFloatNumber = (min, max) =>
  (Math.random() * (max - min) + min).toFixed(2);

const size = (app, obj, width, height) => {
  if (typeof obj == "object") {
    obj.pivot.set(obj.width / 2, obj.height / 2);
    obj.width = width;
    obj.height = height;
  } else if (typeof obj == "array") {
    obj = width;
    obj = height;
  }
  app.stage.addChild(obj);
};

const position = (app, obj, x, y) => {
  if (typeof obj == "object") {
    obj.pivot.set(obj.width / 2, obj.height / 2);
    obj.x = x;
    obj.y = y;
  } else if (typeof obj == "array") {
    obj = x;
    obj = y;
  }
  app.stage.addChild(obj);
};

const configureContainer = (
  app,
  object,
  x,
  y,
  moveItem = false,
  visible = true
) => {
  position(app, object, x, y);
  if (moveItem) {
    object.interactive = true;
    object.buttonMode = true;
  }
  object.visible = visible;

  app.stage.addChild(object);
};

const configureObject = (
  app,
  object,
  width,
  height,
  x,
  y,
  moveItem = false,
  visible = true
) => {
  position(app, object, x, y);
  size(app, object, width, height);
  if (moveItem) {
    object.interactive = true;
    object.buttonMode = true;
  }
  object.visible = visible;

  app.stage.addChild(object);
};

const configureObject2 = (
  app,
  object,
  scale,
  x,
  y,
  moveItem = false,
  visible = true
) => {
  position(app, object, x, y);
  object.scale.set(scale);

  if (moveItem) {
    object.interactive = true;
    object.buttonMode = true;
  }
  object.visible = visible;

  app.stage.addChild(object);
};

const removeContainer = (container, object) => {
  app.stage.addChild(container.removeChildAt(container.getChildIndex(object)));
};

class ConfigureText extends PIXI.Text {
  constructor(app, text, x, y, visible = true) {
    super(text);
    this.x = x;
    this.y = y;
    this.visible = visible;
    this.anchor.set(0.5);
    this.style = {
      fontFamily: "Tahoma",
      fontSize: 14,
      lineHeight: 17,
      fill: 0xffffff,
      align: "left",
    };

    app.stage.addChild(this);
  }
}

function resizeScreen(app, width, height) {
  app.renderer.resize(app.renderer.width * 1.25, app.renderer.height * 1.25);
  app.stage.scale.set(width / 800, height / 600);
}

export {
  resizeScreen,
  size,
  randomNumber,
  randomFloatNumber,
  configureContainer,
  configureObject,
  configureObject2,
  removeContainer,
  ConfigureText,
};