#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const config = require("./config.js");

let fileContent = config.startCode;
fileContent += "\n";

const radius = config.diameter/2;
const spiralDistance = config.spiralDistance;
const spirals = radius / spiralDistance;
const rotations = spirals + 1; //plus one outer circle
const rotationSegments = config.resolution * rotations;
const spiralSegments = config.resolution * spirals;
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
	for(let i=0; i<rotationSegments; i++){
		const iRotations01 = i/rotationSegments;
		const iSpirals01 = Math.min(1, i/spiralSegments);
		let centerDist = iSpirals01 * radius;
		const rotationIndex = Math.floor(iRotations01 * rotations);
		const lastRotation = rotationIndex == rotations - 1;
		let iLastRotation = 0;
		if(lastRotation){
			iLastRotation = iRotations01 * rotations - spirals;
		}
		centerDist += iLastRotation * spiralDistance * 0.5;
		const theta = iRotations01 * Math.PI * 2 * rotations;
		const x = Math.cos(theta) * centerDist + config.offsetX;
		const y = Math.sin(theta) * centerDist + config.offsetY;

		const deltaX = x - prevX;
		const deltaY = y - prevY;
		const travelDist = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
		e += travelDist * config.extrusion * (1 - iLastRotation);

		prevX = x;
		prevY = y;

		fileContent += `G1 X${x} Y${y} Z${z} E${e}\n`;
	}

	e -= config.zHopRetractAmount;
	const zHopHeight = z + config.zHopHeight;
	fileContent += `G1 X${prevX} Y${prevY} Z${zHopHeight} E${e}\n`;
	fileContent += `G1 X${config.offsetX} Y${config.offsetY} Z${zHopHeight} E${e}\n`;
	e += config.zHopRetractAmount;
}

fileContent += "\n";
fileContent += config.endCode;

const outPath = path.resolve(__dirname, config.fileName);
fs.writeFileSync(outPath, fileContent);
console.log("written to "+outPath);
