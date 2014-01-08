		$(document).ready(function(){
			// $('#submit_button').on('click', function (e) {
				
			// })
			$('#submit_button').on('click', function(e){
				e.preventDefault();
				$('#sign_in_inputs').fadeToggle();
				$('#sign_in').addClass('sign-in-active');
				$('#submit_button').off('click');
				$('#submit_button').on('click', function () {
					// $(this).parent().form.submit();
					$('#sign_in_form').submit();
					console.dir($(this).parent().form);
					// this.form.submit();
				});
			});

			$('#sign_up').on('click', function(){
				$('#sign_up_form').toggle();
				$('#shadow').toggle();
			});

			$('#shadow').on('click', function(){
				$('#sign_up_form').toggle();
				$('#shadow').toggle();
			});




TRADE.GameData.gamejson = {
	"problem_0" : {
		"Heat": {
			//breaker
			"break1": {"on": true},
			"b1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},
			"b3": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b4": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},

			//relay
			"rc1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc2": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc4": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},
			"rc5": {"Volts": "24h", "Ohms": 2, "Ferads": '', "Device": 'relay2'},

			//capacitor
			"cp1": {"Volts": "l1", "Ohms": '', "Ferads": '22', "Device": 'cap1'},
			"cp2": {"Volts": "l2", "Ohms": '', "Ferads": 'mfd_com', "Device": 'cap2'},

			//fan
			"fan1": {"on": true},
			"f1": {"Volts": "l2", "Ohms": '7', "Ferads": '', "Device": 'fan1'},
			"f2": {"Volts": "l1", "Ohms": '12', "Ferads": '', "Device": 'fan1'},
			"f3": {"Volts": "l1", "Ohms": '20', "Ferads": '', "Device": 'fan1'},

			//sequencer
			"sq1": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq2": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq3": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq4": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq5": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},
			"sq6": {"Volts": "24h", "Ohms": '20', "Ferads": '', "Device": 'seq1'},

			//transformer
			"tr1": {"Volts": "l1", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr2": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr3": {"Volts": "24h", "Ohms": '7', "Ferads": '', "Device": 'trans2'},
			"tr4": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},

			//statstrip
			"ss1": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's1'},
			"ss2": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's2'},
			"ss3": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's3'},
			"ss4": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's4'},
			"ss5": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's5'},

			//heaters
			"heat1": {"on": true},
			"heat2": {"on": true},
			"h1": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h2": {"Volts": "l1", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h3": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},
			"h4": {"Volts": "l1", "Ohms": '11', "Ferads": '', "Device": 'heat2'},

			//wires
			"w1": {"Amps": 42.5},
			"w2": {"Amps": 2.5},
			"w3": {"Amps": 2.5},
			"w4": {"Amps": .5},
			"w5": {"Amps": .5},
			"w6": {"Amps": 20.5},
			"w7": {"Amps": 20.5},
			"w8": {"Amps": 20.5},
			"w9": {"Amps": 20.5},
			"w10": {"Amps": 2.5},

			"w11": {"Amps": 42.5},
			"w12": {"Amps": 2.5},
			"w13": {"Amps": 2.5},
			"w14": {"Amps": 20.5},
			"w15": {"Amps": 20.5},

			"w16": {"Amps": .3},
			"w17": {"Amps": .3},
			"w18": {"Amps": .2},
			"w19": {"Amps": .2},
			"w20": {"Amps": .2},
			"w21": {"Amps": .2}

		},
		"Cool": {
			//breaker
			"break1": {"on": true},
			"b1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},
			"b3": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b4": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},

			//relay
			"rc1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc2": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc4": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},
			"rc5": {"Volts": "24h", "Ohms": 2, "Ferads": '', "Device": 'relay2'},

			//capacitor
			"cp1": {"Volts": "l1", "Ohms": '', "Ferads": '22', "Device": 'cap1'},
			"cp2": {"Volts": "l2", "Ohms": '', "Ferads": 'mfd_com', "Device": 'cap2'},

			//fan
			"fan1": {"on": true},
			"f1": {"Volts": "l2", "Ohms": '7', "Ferads": '', "Device": 'fan1'},
			"f2": {"Volts": "l1", "Ohms": '12', "Ferads": '', "Device": 'fan1'},
			"f3": {"Volts": "l1", "Ohms": '20', "Ferads": '', "Device": 'fan1'},

			//sequencer
			"sq1": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq2": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq3": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq3'},
			"sq4": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq4'},
			"sq5": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},
			"sq6": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},

			//transformer
			"tr1": {"Volts": "l1", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr2": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr3": {"Volts": "24h", "Ohms": '7', "Ferads": '', "Device": 'trans2'},
			"tr4": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},

			//statstrip
			"ss1": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's1'},
			"ss2": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's2'},
			"ss3": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's3'},
			"ss4": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's4'},
			"ss5": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's5'},

			//heaters
			"heat1": {"on": false},
			"heat2": {"on": false},
			"h1": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h2": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h3": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},
			"h4": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},

			//wires
			"w1": {"Amps": 12.5},
			"w2": {"Amps": 2.5},
			"w3": {"Amps": 2.5},
			"w4": {"Amps": .5},
			"w5": {"Amps": .5},
			"w6": {"Amps": 20.5},
			"w7": {"Amps": 0},
			"w8": {"Amps": 0},
			"w9": {"Amps": 0},
			"w10": {"Amps": 2.5},

			"w11": {"Amps": 12.5},
			"w12": {"Amps": 2.5},
			"w13": {"Amps": 2.5},
			"w14": {"Amps": 0},
			"w15": {"Amps": 0},

			"w16": {"Amps": .3},
			"w17": {"Amps": .3},
			"w18": {"Amps": .2},
			"w19": {"Amps": .2},
			"w20": {"Amps": 0},
			"w21": {"Amps": .2}
			

		},
		"Fan": {
			//breaker
			"break1": {"on": true},
			"b1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},
			"b3": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b4": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},

			//relay
			"rc1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc2": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc4": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},
			"rc5": {"Volts": "24h", "Ohms": 2, "Ferads": '', "Device": 'relay2'},

			//capacitor
			"cp1": {"Volts": "l1", "Ohms": '', "Ferads": '22', "Device": 'cap1'},
			"cp2": {"Volts": "l2", "Ohms": '', "Ferads": 'mfd_com', "Device": 'cap2'},

			//fan
			"fan1": {"on": true},
			"f1": {"Volts": "l2", "Ohms": '7', "Ferads": '', "Device": 'fan1'},
			"f2": {"Volts": "l1", "Ohms": '12', "Ferads": '', "Device": 'fan1'},
			"f3": {"Volts": "l1", "Ohms": '20', "Ferads": '', "Device": 'fan1'},

			//sequencer
			"sq1": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq2": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq3": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq3'},
			"sq4": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq4'},
			"sq5": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},
			"sq6": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},

			//transformer
			"tr1": {"Volts": "l1", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr2": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr3": {"Volts": "24h", "Ohms": '7', "Ferads": '', "Device": 'trans2'},
			"tr4": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},

			//statstrip
			"ss1": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's1'},
			"ss2": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's2'},
			"ss3": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's3'},
			"ss4": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's4'},
			"ss5": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's5'},

			//heaters
			"heat1": {"on": false},
			"heat2": {"on": false},
			"h1": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h2": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h3": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},
			"h4": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},

			//wires
			"w1": {"Amps": 12.5},
			"w2": {"Amps": 2.5},
			"w3": {"Amps": 2.5},
			"w4": {"Amps": .5},
			"w5": {"Amps": .5},
			"w6": {"Amps": 20.5},
			"w7": {"Amps": 0},
			"w8": {"Amps": 0},
			"w9": {"Amps": 0},
			"w10": {"Amps": 2.5},

			"w11": {"Amps": 12.5},
			"w12": {"Amps": 2.5},
			"w13": {"Amps": 2.5},
			"w14": {"Amps": 0},
			"w15": {"Amps": 0},

			"w16": {"Amps": .3},
			"w17": {"Amps": .3},
			"w18": {"Amps": .2},
			"w19": {"Amps": .2},
			"w20": {"Amps": 0},
			"w21": {"Amps": .2}

		},
		"Off": {
			//breaker
			"break1": {"on": true},
			"b1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},
			"b3": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b4": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},

			//relay
			"rc1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc4": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},
			"rc5": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},

			//capacitor
			"cp1": {"Volts": "l1", "Ohms": '', "Ferads": '22', "Device": 'cap1'},
			"cp2": {"Volts": "l2", "Ohms": '', "Ferads": 'mfd_com', "Device": 'cap2'},

			//fan
			"fan1": {"on": false},
			"f1": {"Volts": "l2", "Ohms": '7', "Ferads": '', "Device": 'fan1'},
			"f2": {"Volts": "l2", "Ohms": '12', "Ferads": '', "Device": 'fan1'},
			"f3": {"Volts": "l2", "Ohms": '20', "Ferads": '', "Device": 'fan1'},

			//sequencer
			"sq1": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq2": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq3": {"Volts": "l1", "Ohms": '.1', "Ferads": '', "Device": 'seq3'},
			"sq4": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq4'},
			"sq5": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},
			"sq6": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},

			//transformer
			"tr1": {"Volts": "l1", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr2": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr3": {"Volts": "24h", "Ohms": '7', "Ferads": '', "Device": 'trans2'},
			"tr4": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},

			//statstrip
			"ss1": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's1'},
			"ss2": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's2'},
			"ss3": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's3'},
			"ss4": {"Volts": "24h", "Ohms": '', "Ferads": '', "Device": 's4'},
			"ss5": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's5'},

			//heaters
			"heat1": {"on": false},
			"heat2": {"on": false},
			"h1": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h2": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h3": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},
			"h4": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},

			//wires
			"w1": {"Amps": 12.5},
			"w2": {"Amps": 2.5},
			"w3": {"Amps": 2.5},
			"w4": {"Amps": .5},
			"w5": {"Amps": .5},
			"w6": {"Amps": 20.5},
			"w7": {"Amps": 0},
			"w8": {"Amps": 0},
			"w9": {"Amps": 0},
			"w10": {"Amps": 2.5},

			"w11": {"Amps": 12.5},
			"w12": {"Amps": 2.5},
			"w13": {"Amps": 2.5},
			"w14": {"Amps": 0},
			"w15": {"Amps": 0},

			"w16": {"Amps": .3},
			"w17": {"Amps": .3},
			"w18": {"Amps": .2},
			"w19": {"Amps": .2},
			"w20": {"Amps": 0},
			"w21": {"Amps": .2}


		},
		"noswitch": {
			//breaker
			"break1": {"on": false},
			"b1": {"Volts": "l1", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},
			"b3": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break1'},
			"b4": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'break2'},

			//relay
			"rc1": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc2": {"Volts": "l2", "Ohms": .1, "Ferads": '', "Device": 'relay1'},
			"rc4": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},
			"rc5": {"Volts": "24c", "Ohms": 2, "Ferads": '', "Device": 'relay2'},

			//capacitor
			"cp1": {"Volts": "l2", "Ohms": '', "Ferads": '22', "Device": 'cap1'},
			"cp2": {"Volts": "l2", "Ohms": '', "Ferads": 'mfd_com', "Device": 'cap2'},

			//fan
			"fan1": {"on": false},
			"f1": {"Volts": "l2", "Ohms": '7', "Ferads": '', "Device": 'fan1'},
			"f2": {"Volts": "l2", "Ohms": '12', "Ferads": '', "Device": 'fan1'},
			"f3": {"Volts": "l2", "Ohms": '20', "Ferads": '', "Device": 'fan1'},

			//sequencer
			"sq1": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq1'},
			"sq2": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq2'},
			"sq3": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq3'},
			"sq4": {"Volts": "l2", "Ohms": '.1', "Ferads": '', "Device": 'seq4'},
			"sq5": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},
			"sq6": {"Volts": "24c", "Ohms": '20', "Ferads": '', "Device": 'seq1'},

			//transformer
			"tr1": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr2": {"Volts": "l2", "Ohms": '22', "Ferads": '', "Device": 'trans1'},
			"tr3": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},
			"tr4": {"Volts": "24c", "Ohms": '7', "Ferads": '', "Device": 'trans2'},

			//statstrip
			"ss1": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's1'},
			"ss2": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's2'},
			"ss3": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's3'},
			"ss4": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's4'},
			"ss5": {"Volts": "24c", "Ohms": '', "Ferads": '', "Device": 's5'},

			//heaters
			"heat1": {"on": false},
			"heat2": {"on": false},
			"h1": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h2": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat1'},
			"h3": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},
			"h4": {"Volts": "l2", "Ohms": '11', "Ferads": '', "Device": 'heat2'},

			//wires
			"w1": {"Amps": 0},
			"w2": {"Amps": 0},
			"w3": {"Amps": 0},
			"w4": {"Amps": 0},
			"w5": {"Amps": 0},
			"w6": {"Amps": 0},
			"w7": {"Amps": 0},
			"w8": {"Amps": 0},
			"w9": {"Amps": 0},
			"w10": {"Amps": 0},

			"w11": {"Amps": 0},
			"w12": {"Amps": 0},
			"w13": {"Amps": 0},
			"w14": {"Amps": 0},
			"w15": {"Amps": 0},

			"w16": {"Amps": 0},
			"w17": {"Amps": 0},
			"w18": {"Amps": 0},
			"w19": {"Amps": 0},
			"w20": {"Amps": 0},
			"w21": {"Amps": 0}
		}
	}
};


			TRADE.CIRC.Create(720, 850);
			TRADE.CIRC.Set('problem_0', 'Heat');
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

