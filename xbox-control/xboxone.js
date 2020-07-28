module.exports = {
    "XboxOne": {
      "vendorId": 1118,
      "productId": 765,
      "state": {
        "button:A": 0,
        "button:B": 0,
        "button:X": 0,
        "button:Y": 0,
  
        "button:LB": 0,
        "button:LT": 0,
        "button:RB": 0,
        "button:RT": 0,
  
        "JOYL:X": 0,
        "JOYL:Y": 0,

        "JOYR:X": 0,
        "JOYR:Y": 0,
  
        "button:Up": 0,
        "button:Right": 0,
        "button:Down": 0,
        "button:Left": 0,
  
        "button:Menu": 0,
        "button:Select": 0
      },
      "prev": {
        "button:A": 0,
        "button:B": 0,
        "button:X": 0,
        "button:Y": 0,
  
        "button:LB": 0,
        "button:LT": 0,
        "button:RB": 0,
        "button:RT": 0,
  
        "JOYL:X": 0,
        "JOYL:Y": 0,

        "JOYR:X": 0,
        "JOYR:Y": 0,
  
        "button:Up": 0,
        "button:Right": 0,
        "button:Down": 0,
        "button:Left": 0,
  
        "button:Menu": 0,
        "button:Select": 0
      },
      "update": function(data, flag) {

        var state = this.state;
        var prev = this.prev;
  
        state['button:A'] = data[14] >> 0 & 1;
        state['button:B'] = data[14] >> 1 & 1;
        state['button:X'] = data[14] >> 2 & 1;
        state['button:Y'] = data[14] >> 3 & 1;

        state['button:LB'] = data[14] >> 4 & 1;
        state['button:LT'] = data[10];
        state['button:RB'] = data[14] >> 5 & 1;
        state['button:RT'] = data[12];

        state['JOYL:X'] = data[2];
        state['JOYL:Y'] = data[4];

        state['JOYR:X'] = data[6];
        state['JOYR:Y'] = data[8];

        state['button:Up']    = ~(data[13] >> 2 & 1) & ~(data[13] >> 1 & 1) & (data[13] >> 0 & 1);
        state['button:Right'] = ~(data[13] >> 2 & 1) & (data[13] >> 1 & 1) & (data[13] >> 0 & 1);
        state['button:Down']  = (data[13] >> 2 & 1) & ~(data[13] >> 1 & 1) & (data[13] >> 0 & 1);
        state['button:Left']  = (data[13] >> 2 & 1) & (data[13] >> 1 & 1) & (data[13] >> 0 & 1);

        state['button:Menu']   = data[14] >> 7 & 1;
        state['button:Select'] = data[14] >> 6 & 1;
        
        if(flag){
        prev['JOYL:X'] = data[2];
        prev['JOYL:Y'] = data[4];

        prev['JOYR:X'] = data[6];
        prev['JOYR:Y'] = data[8];
        }
        
        return state;
      },
      "vectorConstructor": function(state, s) {
        
        var vector = new Array(20);
        var ControlInfo = {arrayString: '', array: vector, buttonActivated: s};

        ControlInfo.arrayString += '255';
        for (var i in state){
          ControlInfo.arrayString += state[i].toString();
        }
        ControlInfo.arrayString += '253';

        vector[0] = 0xff;

        vector[1]  = state['button:A'];
        vector[2]  = state['button:B'];
        vector[3]  = state['button:X'];
        vector[4]  = state['button:Y'];

        vector[5]  = state['button:LB'];
        vector[6]  = state['button:LT'];
        vector[7]  = state['button:RB'];
        vector[8]  = state['button:RT'];

        vector[9]  = state['JOYL:X'];
        vector[10] = state['JOYL:Y'];

        vector[11] = state['JOYR:X'];
        vector[12] = state['JOYR:Y'];

        vector[13] = state['button:Up'];
        vector[14] = state['button:Right'];
        vector[15] = state['button:Down'];
        vector[16] = state['button:Left'];

        vector[17] = state['button:Menu'];
        vector[18] = state['button:Select'];

        vector[19] = 0xfd;

        return ControlInfo;
      }
    }
};