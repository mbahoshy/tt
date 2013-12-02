		$(document).ready(function(){
			$('#sign_in').on('click', function(){
				$('#sign_in_form').fadeToggle();
			});

			$('#sign_up').on('click', function(){
				$('#sign_up_form').fadeToggle();
				$('#shadow').fadeToggle();
			});

			$('#shadow').on('click', function(){
				$('#sign_up_form').fadeToggle();
				$('#shadow').fadeToggle();
			});


			TRADE.CIRC.Create(720, 850);
			TRADE.CIRC.Set('problem_01', 'Heat');
			//TRADE.CIRC.SPSTSwitch('spst1', 's0', 's1', 30, 10, 'noswitch');
			//TRADE.CIRC.Fan('fan1', 150, 50, 'f1', 'f2', 'f3');
			TRADE.CIRC.AddBreaker('break1', 35, 20, 'b1', 'b2', 'b3', 'b4', 'noswitch');
			TRADE.CIRC.Relay('relay1', 50, 270, 'rc1', 'rc2', 'rc3', 'rc4', 'rc5');
			TRADE.CIRC.Heater('heat1', 240, 20, 'h1', 'h2');
			TRADE.CIRC.Heater('heat2', 240, 90, 'h3', 'h4');
			TRADE.CIRC.StatStrip5('statstrip', 670, 20, 'ss1', 'ss2', 'ss3', 'ss4', 'ss5');
			TRADE.CIRC.Transformer('trans1', 515, 270, 'tr1', 'tr2', 'tr3', 'tr4');
			TRADE.CIRC.Fan('fan1', 220, 460, 'f1', 'f2', 'f3');
			TRADE.CIRC.Capacitor('cap1', 35, 490, 'cp1', 'cp2', 15);
			TRADE.CIRC.Divider(420, 720);
			TRADE.CIRC.Sequencer('seq1', 320, 175, 'sq1', 'sq2', 'sq3', 'sq4', 'sq5', 'sq6');
			//TRADE.CIRC.StatStrip5('stat1', 120, 10, 'q1', 'q2', 'q3', 'q4', 'q5');
			//TRADE.CIRC.Capacitor('cap1', 200, 40, 'e1', 'e2', '30');
			TRADE.CIRC.AddThermostat('Heat');
			TRADE.CIRC.DrawWire('w1', '#626262', 5, [35, -15, 35, 0]);
			TRADE.CIRC.DrawWire('w2', '#626262', 3, [35, 100, 18, 150, 18, 272, 34, 272]);
			TRADE.CIRC.DrawWire('w3', '#626262', 3, [155, 272, 240, 320, 240, 480]);
			TRADE.CIRC.DrawWire('w4', '#626262', 3, [35, 100, 0, 150, 0, 440, 55, 480]);
			TRADE.CIRC.DrawWire('w5', '#626262', 3, [75, 470, 120, 470, 200, 540]);
			TRADE.CIRC.DrawWire('w6', '#626262', 3, [35, 100, 60, 155, 320, 155]);
			TRADE.CIRC.DrawWire('w7', '#626262', 3, [400, 155, 460, 155, 460, 125, 450, 110]);
			TRADE.CIRC.DrawWire('w8', '#626262', 3, [60, 155, 60, 205, 320, 205]);
			TRADE.CIRC.DrawWire('w9', '#626262', 3, [400, 205, 480, 205, 480, 60, 450, 35]);
			TRADE.CIRC.DrawWire('w10', '#626262', 3, [35, 100, 35, 240, 160, 240, 230, 280, 500, 280]);

			TRADE.CIRC.DrawWire('w11', 'yellow', 3, [82, -15, 82, 0]);
			TRADE.CIRC.DrawWire('w12', 'yellow', 3, [82, 100, 82, 180, 260, 180, 260, 345, 290, 440]);
			TRADE.CIRC.DrawWire('w13', 'yellow', 3, [260, 345, 490, 345]);
			TRADE.CIRC.DrawWire('w14', 'yellow', 3, [82, 115, 120, 115, 220, 105]);
			TRADE.CIRC.DrawWire('w15', 'yellow', 3, [120, 115, 120, 30, 220, 30]);

			TRADE.CIRC.DrawWire('w16', 'brown', 2, [600, 340, 635, 340, 635, 170, 660, 170]);
			TRADE.CIRC.DrawWire('w17', 'red', 2, [600, 285, 620, 285, 620, 25, 660, 25]);
			TRADE.CIRC.DrawWire('w18', 'green', 2, [660, 130, 600, 130, 600, 240, 500, 240, 300, 360, 160, 360]);
			TRADE.CIRC.DrawWire('w19', 'brown', 2, [47, 360, 47, 380, 605, 380, 605, 350]);
			TRADE.CIRC.DrawWire('w20', '#B3CAFF', 2, [660, 97, 600, 97, 465, 240, 420, 240]);
			TRADE.CIRC.DrawWire('w21', 'brown', 2, [300, 240, 300, 380]);
		});