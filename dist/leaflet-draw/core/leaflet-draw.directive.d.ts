import { EventEmitter, OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
export declare class LeafletDrawDirective implements OnChanges, OnInit {
    leafletDirective: LeafletDirectiveWrapper;
    drawControl: L.Control.Draw;
    featureGroup: L.FeatureGroup;
    drawOptions: L.Control.DrawConstructorOptions;
    onCreate: EventEmitter<L.DrawEvents.Created>;
    onDrawStart: EventEmitter<L.DrawEvents.DrawStart>;
    onDrawStop: EventEmitter<L.DrawEvents.DrawStop>;
    onDeleted: EventEmitter<L.DrawEvents.Deleted>;
    onDeleteStart: EventEmitter<L.DrawEvents.DeleteStart>;
    onDeleteStop: EventEmitter<L.DrawEvents.DeleteStop>;
    onEdited: EventEmitter<L.DrawEvents.Edited>;
    onEditStart: EventEmitter<L.DrawEvents.EditStart>;
    onEditStop: EventEmitter<L.DrawEvents.EditStop>;
    constructor(leafletDirective: LeafletDirective);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    initializeDrawOptions(options: L.Control.DrawConstructorOptions): L.Control.DrawConstructorOptions;
}
