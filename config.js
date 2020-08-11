module.exports = {
	"fileName" : "spiral.gcode",
	
	"startCode":`;FLAVOR:Marlin
					;Ender 3 Custom Start G-code
M104 S200 			;set extruder temp
M140 S55  			;set bed temp
M190 S55  			;wait for bed temp (bed will expand so wait for Z homing)
G28              	;Home
G29              	;Mesh bed level Z
G1 X0 Y0 F3000    	;Move nozzle to 0,0
M109 S200 			;Wait for extruder temp
;G1 Z7.0 F3000   	;Move the head up a bit
G92 E0           	;Reset Extruder
G1 F200 E6       	;Extrude a bit
G92 E0            	;Reset Extruder
G1 Z0 F3000       	;Move nozzle down to 0
G1 X0 Y15 Z0 F3000	;Move to start position
M117 Printing...
M141 S28
G92 E0
G1 F2700 E-5`,

	"endCode"  :`	;Ender 3 Custom End G-code
G91               	;Use Relative Coordinates
G1 F3000 E-3 Z5    	;Pull filement in a bit (Feedrate = speed) AND move up
G90               	;Use Absolute Coordinates
G1 X0 Y230 F3000  	;prepare for part removal, Move to X-0 and Y-max
M106 S0           	;turn off cooling fan
M104 S0           	;turn off extruder
M140 S0            	;turn off bed
M220 S100          	;Reset Speed factor override percentage to default (100%)
M221 S100          	;Reset Extrude factor override percentage to default (100%)
M117 Print done!
G4 P1             	;Wait for 1 sec
G1 X234 F1000      	;Automatic shut down
M84                 ;disable stepper motors
`,

	"offsetX"  : 115,
	"offsetY"  : 115,
	"offsetZ"  : 0.18,
	"offsetE"  : 0,
	"diameter" : 133.1,
	"layers"   : 10,
	"extrusion": 0.036,
	"resolution": 150,
	"spiralDistance": 0.4,
	"layerHeight": 0.2,
	"zHopHeight": 1,
	"zHopRetractAmount": 6.5,
	"flipLayers": false,
}
