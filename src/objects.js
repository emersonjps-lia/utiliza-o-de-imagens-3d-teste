import texts from "./texts.json";
import {
  configureObject,
  configureObject2,
  configureContainer,
  removeContainer,
} from "./functions";

const options = {
  width: window.screen.width,
  height: window.screen.height,
  backgroundColor: 0x7193bc,
  targetSelector: "#animation",
  fontFamilies: ["Roboto", "DS-DIGI"],
  resources: {
    buttonFullScrenn:
      "https://liaser.s3.sa-east-1.amazonaws.com/praticas/_general/tela%2Bcheia.png",
      main: 
        "https://liaser.s3.sa-east-1.amazonaws.com/praticas/_general/teste_template_base/main.png",
      object1: 
        "https://liaser.s3.sa-east-1.amazonaws.com/praticas/_general/teste_template_base/object1.png",
      object2: 
        "https://liaser.s3.sa-east-1.amazonaws.com/praticas/_general/teste_template_base/object2.png",
  },
};

// load openning resources
if (introOptions) {
  Object.keys(introOptions.resources).forEach((id) => {
    options.resources[id] = introOptions.resources[id];
  });
}

// load footer resources
if (footerOptions) {
  Object.keys(footerOptions.resources).forEach((id) => {
    options.resources[id] = footerOptions.resources[id];
  });
}

const createObjects = (app, resources) => {
  let allObjects = {};

  // Ajusta a visualização de acordo com a proporção da tela e a fixa de 800px por 600px
  app.stage.x = window.screen.width / 2 - 400;
  app.stage.y = window.screen.height / 2 - 300;

  /* Storing user's device details in a variable*/
  let details = navigator.userAgent;

  /* Creating a regular expression 
        containing some mobile devices keywords 
        to search it in details string*/
  let regexp = /android|iphone|kindle|ipad/i;

  /* Using test() method to search regexp in details
        it returns boolean value*/
  let isMobileDevice = regexp.test(details);

  if (isMobileDevice) {
    console.log("Mobile");

    const buttonFullScrenn = new PIXI.Sprite(
      resources.buttonFullScrenn.texture
    );
    configureObject2(app, buttonFullScrenn, 0.5, 400, 200, true, true);
    buttonFullScrenn.zIndex = 100;
    buttonFullScrenn.on("pointerdown", async () => {
      if (
        !document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        let flag = false;

        // current working methods
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          flag = true;
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
          flag = true;
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
          flag = true;
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
          flag = true;
        }

        if (flag) buttonFullScrenn.visible = false;
      }
    });

    let value = 0.5;
    app.stage.scale.x = value;
    app.stage.scale.y = value;

    app.stage.x = window.screen.width / 2 - 200;
    app.stage.y = window.screen.height / 2 - 140;
  } else {
    console.log("Desktop");

    if (
      window.screen.width >= 1280 &&
      window.screen.height >= 720 &&
      window.screen.width < 1920 &&
      window.screen.height < 1080
    ) {
      let value = 0.95;
      app.stage.scale.x = value;
      app.stage.scale.y = value;

      app.stage.x = window.screen.width / 2 - 385;
      app.stage.y = window.screen.height / 2 - 260;
    } else if (
      window.screen.width >= 1920 &&
      window.screen.height >= 1080 &&
      window.screen.width < 2048
    ) {
      let value = 1.4;
      app.stage.scale.x = value;
      app.stage.scale.y = value;

      app.stage.x = window.screen.width / 2 - 560;
      app.stage.y = window.screen.height / 2 - 390;
    } else if (window.screen.width >= 2048 && window.screen.height >= 1080) {
      let value = 1.45;
      app.stage.scale.x = value;
      app.stage.scale.y = value;

      app.stage.x = window.screen.width / 2 - 600;
      app.stage.y = window.screen.height / 2 - 390;
    }
  }
  //------------------------------------------------------------------------------------------

  function checkArea(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }


  const fundo = new PIXI.Sprite(resources.main.texture);
  configureObject2(app, fundo, 0.9, 400, 300, false, true)

  const object1 = new PIXI.Sprite(resources.object1.texture);
  configureObject2(app, object1, 0.6, 750, 370, true, true)

  const object2 = new PIXI.Sprite(resources.object2.texture);
  configureObject2(app, object2, 0.6, 850, 250, true, true);

  const ctnObjects = new PIXI.Container();
  configureObject(app, ctnObjects, 0, 0, 400, 300);

  let arrayTintFocus = [
    object1,
    object2,
  ]

  arrayTintFocus.forEach(el => {
    el.on('pointerover', ()=> {
      el.tint = '0x90EE90';
    })
    .on('pointerout', ()=> {
      el.tint = '0xffffff';
    })
    .on("pointerdown", onDragStart)
    .on("pointerup", onDragEnd)
    .on("pointerupoutside", onDragEnd)
    .on("pointermove", onDragMove)
  });



  function onDragStart(event) {
    this.data = event.data;
    this.dragging = true;
  }

  function onDragEnd() {
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
  }

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
      if(this.x > -1000 && this.x < 300) this.angle = -20;
      if(this.x > 301 && this.x < 500) this.angle = -10;
      if(this.x > 501 && this.x < 1000) this.angle = 0;  
    }
  }

  return allObjects;
};

export { options, createObjects };