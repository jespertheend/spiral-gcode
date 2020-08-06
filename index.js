#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const config = require("./config.js");

let fileContent = config.startCode;
fileContent += "\n";

const radius = config.diameter/2;
const spirals = radius / config.spiralDistance;
const segments = config.resolution * spirals;
const layers = config.layers;

fileContent += `;LAYER_COUNT:${layers}\n`;
let e = config.offsetE;

for(let layer=0; layer<layers; layer++){
	const z = layer * config.layerHeight + config.offsetZ;
	let prevX = config.offsetX;
	let prevY = config.offsetY;
	fileContent += `;LAYER:${layer}\n`;
	fileContent += `;TYPE:SKIN\n`;
	fileContent += `G0 X${config.offsetX} Y${config.offsetY} Z${z}\n`;
	for(let i=0; i<segments; i++){
		const i01 = i/segments;
		const theta = i01 * Math.PI * 2 * spirals;
		const centerDist = i01 * radius;
		const x = Math.cos(theta) * centerDist + config.offsetX;
		const y = Math.sin(theta) * centerDist + config.offsetY;

		const deltaX = x - prevX;
		const deltaY = y - prevY;
		const travelDist = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
		e += travelDist * config.extrusion;

		prevX = x;
		prevY = y;

		fileContent += `G1 X${x} Y${y} Z${z} E${e}\n`;
	}
}

fileContent += "\n";
fileContent += config.endCode;

const outPath = path.resolve(__dirname, config.fileName);
fs.writeFileSync(outPath, fileContent);
console.log("written to "+outPath);
