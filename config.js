module.exports = {
	"fileName": "spiral.gcode",
	"startCode": `;FLAVOR:Marlin
;TIME:4756
;Filament used: 2.42744m
;Layer height: 0.2
;MINX:75.826
;MINY:84.487
;MINZ:0.2
;MAXX:137.023
;MAXY:142.988
;MAXZ:26.2
;Generated with Cura_SteamEngine 4.2.1
M82 ;absolute extrusion mode
M104 S190 ;set extruder temperature
M140 S60 ;set bed temperature

M190 S60
M109 S190

M201 X500.00 Y500.00 Z100.00 E5000.00 ;Setup machine max acceleration
M203 X500.00 Y500.00 Z10.00 E50.00 ;Setup machine max feedrate
M204 P500.00 R1000.00 T500.00 ;Setup Print/Retract/Travel acceleration
M205 X8.00 Y8.00 Z0.40 E5.00 ;Setup Jerk
M220 S100 ;Reset Feedrate
M221 S100 ;Reset Flowrate

G28 ;Home

G92 E0 ;Reset Extruder
G1 Z2.0 F3000 ;Move Z Axis up
G1 X10.1 Y20 Z0.28 F5000.0 ;Move to start position
G1 X10.1 Y200.0 Z0.28 F1500.0 E15 ;Draw the first line
G1 X10.4 Y200.0 Z0.28 F5000.0 ;Move to side a little
G1 X10.4 Y20 Z0.28 F1500.0 E30 ;Draw the second line
G92 E0 ;Reset Extruder
G1 Z2.0 F3000 ;Move Z Axis up
M141 S28
G92 E0
G92 E0
G1 F2700 E-5
`,
	"endCode":"; done",
	"offsetX": 100,
	"offsetY": 100,
	"offsetZ": 0.28,
	"offsetE": 30,
	"diameter": 4,
	"layers": 3,
	"extrusion": 0.04,
	"resolution": 15,
	"spiralDistance": 0.4,
	"layerHeight": 0.2,
	"zHopHeight": 0.4,
	"zHopRetractAmount": 100,
}
