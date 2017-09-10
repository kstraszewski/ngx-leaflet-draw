import { Directive, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
var LeafletDrawDirective = /** @class */ (function () {
    function LeafletDrawDirective(leafletDirective) {
        this.drawOptions = null;
        this.onCreate = new EventEmitter();
        this.onDrawStart = new EventEmitter();
        this.onDrawStop = new EventEmitter();
        this.onDeleted = new EventEmitter();
        this.onDeleteStart = new EventEmitter();
        this.onDeleteStop = new EventEmitter();
        this.onEdited = new EventEmitter();
        this.onEditStart = new EventEmitter();
        this.onEditStop = new EventEmitter();
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletDrawDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.leafletDirective.init();
        // Initialize the draw options (in case they weren't provided)
        this.drawOptions = this.initializeDrawOptions(this.drawOptions);
        // Create the control
        this.drawControl = new L.Control.Draw(this.drawOptions);
        // Pull out the feature group for convenience
        this.featureGroup = this.drawOptions.edit.featureGroup;
        // Add the control to the map
        this.leafletDirective.getMap().addControl(this.drawControl);
        // Register the main handler for events coming from the draw plugin
        /*Create*/
        if (this.onCreate.observers.length === 0) {
            this.leafletDirective.getMap().on(L.Draw.Event.CREATED, function (e) {
                var layer = e.layer;
                _this.featureGroup.addLayer(layer);
            });
        }
        else {
            this.leafletDirective.getMap().on(L.Draw.Event.CREATED, function (e) {
                _this.onCreate.emit(e);
            });
        }
        if (this.onDrawStart.observers.length !== 0) {
            this.leafletDirective
                .getMap()
                .on(L.Draw.Event.DRAWSTART, function (e) {
                _this.onDrawStart.emit(e);
            });
        }
        if (this.onDrawStop.observers.length !== 0) {
            this.leafletDirective
                .getMap()
                .on(L.Draw.Event.DRAWSTOP, function (e) {
                _this.onDrawStop.emit(e);
            });
        }
        /*Edit*/
        if (this.onEdited.observers.length !== 0) {
            this.leafletDirective
                .getMap()
                .on(L.Draw.Event.EDITED, function (e) {
                _this.onEdited.emit(e);
            });
        }
        if (this.onEditStart.observers.length !== 0) {
            this.leafletDirective
                .getMap()
                .on(L.Draw.Event.EDITSTART, function (e) {
                _this.onEditStart.emit(e);
            });
        }
        if (this.onEditStop.observers.length !== 0) {
            this.leafletDirective
                .getMap()
                .on(L.Draw.Event.EDITSTOP, function (e) {
                _this.onEditStop.emit(e);
            });
        }
        /*Delete*/
        if (this.onDeleted.observers.length !== 0) {
            this.leafletDirective
                .getMap()
                .on(L.Draw.Event.DELETED, function (e) {
                _this.onDeleted.emit(e);
            });
        }
        if (this.onDeleteStart.observers.length !== 0) {
            this.leafletDirective
                .getMap()
                .on(L.Draw.Event.DELETESTART, function (e) {
                _this.onDeleteStart.emit(e);
            });
        }
        if (this.onDeleteStop.observers.length !== 0) {
            this.leafletDirective
                .getMap()
                .on(L.Draw.Event.DELETESTOP, function (e) {
                _this.onDeleteStop.emit(e);
            });
        }
    };
    LeafletDrawDirective.prototype.ngOnDestroy = function () {
        this.leafletDirective.getMap().removeControl(this.drawControl);
    };
    LeafletDrawDirective.prototype.ngOnChanges = function (changes) {
        // No changes being handled currently
    };
    LeafletDrawDirective.prototype.initializeDrawOptions = function (options) {
        // Ensure the options have a featureGroup
        if (null == options) {
            options = {
                edit: null
            };
        }
        if (null == options.edit) {
            options.edit = {
                featureGroup: null
            };
        }
        if (null == options.edit.featureGroup) {
            // No feature group was provided, so we're going to add it ourselves
            options.edit.featureGroup = L.featureGroup();
            this.leafletDirective.getMap().addLayer(options.edit.featureGroup);
        }
        return options;
    };
    LeafletDrawDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[leafletDraw]'
                },] },
    ];
    /** @nocollapse */
    LeafletDrawDirective.ctorParameters = function () { return [
        { type: LeafletDirective, },
    ]; };
    LeafletDrawDirective.propDecorators = {
        'drawOptions': [{ type: Input, args: ['leafletDrawOptions',] },],
        'onCreate': [{ type: Output },],
        'onDrawStart': [{ type: Output },],
        'onDrawStop': [{ type: Output },],
        'onDeleted': [{ type: Output },],
        'onDeleteStart': [{ type: Output },],
        'onDeleteStop': [{ type: Output },],
        'onEdited': [{ type: Output },],
        'onEditStart': [{ type: Output },],
        'onEditStop': [{ type: Output },],
    };
    return LeafletDrawDirective;
}());
export { LeafletDrawDirective };
//# sourceMappingURL=leaflet-draw.directive.js.map