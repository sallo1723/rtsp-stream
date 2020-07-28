const HID = require('node-hid');
const EventEmitter = require('events').EventEmitter;
const Vendors = require('../xbox-control/xboxone');
const util = require('util');

function GameController(type) {
    this._controlType = type;
    this._vendor = Vendors[type];
    EventEmitter.call(this);
}

GameController.prototype = {
    _hid: null,
    _vendor: null,
    _FirstEventFlag: 1,
    connect: function(){

        var vendor = this._vendor;
        var controlType = this._controlType;

        try{
            this._hid = new HID.HID( vendor.vendorId, vendor.productId);
        } catch(err){
            this.emit('error', err);
            return;
        }

        console.log('Game controller ' + controlType + ' connected.');

        var hid = this._hid;
        var self = this;

        hid.on('data', (data) => {
            
            var newState = vendor.update(data,this._FirstEventFlag);
            var oldState = vendor.prev;
            this._FirstEventFlag = 0;
            var ControlInfo;

            self.emit('newState', newState);

            for (var s in newState) {
                
                var os = oldState[s];
                var ns = newState[s];

                if (os !== ns){
                    ControlInfo = vendor.vectorConstructor(newState,s);
                    //console.log(ControlInfo);
                    self.emit('ControlChange', ControlInfo);
                    vendor.prev[s] = ns;
                }
            }
        });

        return this;

    },
    close: function(){

        console.log('Close function...');
        if (this._hid) {
            this._hid.close();
            this._hid = null;
        }
      
        this.emit('close');
      
        return this;
    }
};

module.exports = GameController;
util.inherits(GameController, EventEmitter);