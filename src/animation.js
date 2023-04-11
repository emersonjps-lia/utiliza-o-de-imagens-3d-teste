import setup from "./setup-v3";

import texts from "./texts.json";
import { options, createObjects } from "./objects";
import {
  configureObject,
  configureObject2,
  configureContainer,
  removeContainer,
} from "./functions";
import { _isUndefined } from "gsap/gsap-core";

//MAIN
(function main() {
  setup(options, (app, resources) => {
    /* MAIN TIMELINE */
    const mainTimeline = () => {
      const timeline = gsap.timeline();
      // timeline.add(intro(app, resources));
      timeline.add(footer(app, resources, texts));

      return timeline;
    };

    /* CREATE ITEMS SCOPE */
    const allObjects = createObjects(app, resources);

    // desestruturação dos objetos vindo do './objects.js'
    const {} = allObjects;

    // calling mainTimeline
    mainTimeline();
  });
})();