import {Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-draw';

import {LeafletDirective, LeafletDirectiveWrapper} from '@asymmetrik/ngx-leaflet';


@Directive({
	selector: '[leafletDraw]'
})
export class LeafletDrawDirective
	implements OnChanges, OnInit {

	leafletDirective: LeafletDirectiveWrapper;

	drawControl: L.Control.Draw;
	featureGroup: L.FeatureGroup;

	@Input('leafletDrawOptions') drawOptions: L.Control.DrawConstructorOptions = null;

	@Output() onCreate: EventEmitter<L.DrawEvents.Created> = new EventEmitter<L.DrawEvents.Created>();
	@Output() onDrawStart: EventEmitter<L.DrawEvents.DrawStart> = new EventEmitter<L.DrawEvents.DrawStart>();
	@Output() onDrawStop: EventEmitter<L.DrawEvents.DrawStop> = new EventEmitter<L.DrawEvents.DrawStop>();

	@Output() onDeleted: EventEmitter<L.DrawEvents.Deleted> = new EventEmitter<L.DrawEvents.Deleted>();
	@Output() onDeleteStart: EventEmitter<L.DrawEvents.DeleteStart> = new EventEmitter<L.DrawEvents.DeleteStart>();
	@Output() onDeleteStop: EventEmitter<L.DrawEvents.DeleteStop> = new EventEmitter<L.DrawEvents.DeleteStop>();

	@Output() onEdited: EventEmitter<L.DrawEvents.Edited> = new EventEmitter<L.DrawEvents.Edited>();
	@Output() onEditStart: EventEmitter<L.DrawEvents.EditStart> = new EventEmitter<L.DrawEvents.EditStart>();
	@Output() onEditStop: EventEmitter<L.DrawEvents.EditStop> = new EventEmitter<L.DrawEvents.EditStop>();

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
	}

	ngOnInit() {
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
			this.leafletDirective.getMap().on(L.Draw.Event.CREATED, (e: any) => {
				const layer = (e as L.DrawEvents.Created).layer;
				this.featureGroup.addLayer(layer);
			});
		}
		else {
			this.leafletDirective.getMap().on(L.Draw.Event.CREATED, (e: any) => {
				this.onCreate.emit(e);
			});
		}
		if (this.onDrawStart.observers.length !== 0) {
			this.leafletDirective
				.getMap()
				.on(L.Draw.Event.DRAWSTART, (e: any) => {
					this.onDrawStart.emit(e);
				});
		}
		if (this.onDrawStop.observers.length !== 0) {
			this.leafletDirective
				.getMap()
				.on(L.Draw.Event.DRAWSTOP, (e: any) => {
					this.onDrawStop.emit(e);
				});
		}

		/*Edit*/
		if (this.onEdited.observers.length !== 0) {
			this.leafletDirective
				.getMap()
				.on(L.Draw.Event.EDITED, (e: any) => {
					this.onEdited.emit(e);
				});
		}
		if (this.onEditStart.observers.length !== 0) {
			this.leafletDirective
				.getMap()
				.on(L.Draw.Event.EDITSTART, (e: any) => {
					this.onEditStart.emit(e);
				});
		}
		if (this.onEditStop.observers.length !== 0) {
			this.leafletDirective
				.getMap()
				.on(L.Draw.Event.EDITSTOP, (e: any) => {
					this.onEditStop.emit(e);
				});
		}

		/*Delete*/
		if (this.onDeleted.observers.length !== 0) {
			this.leafletDirective
				.getMap()
				.on(L.Draw.Event.DELETED, (e: any) => {
					this.onDeleted.emit(e);
				});
		}
		if (this.onDeleteStart.observers.length !== 0) {
			this.leafletDirective
				.getMap()
				.on(L.Draw.Event.DELETESTART, (e: any) => {
					this.onDeleteStart.emit(e);
				});
		}
		if (this.onDeleteStop.observers.length !== 0) {
			this.leafletDirective
				.getMap()
				.on(L.Draw.Event.DELETESTOP, (e: any) => {
					this.onDeleteStop.emit(e);
				});
		}
	}

	ngOnDestroy() {
		this.leafletDirective.getMap().removeControl(this.drawControl);
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
		// No changes being handled currently
	}

	initializeDrawOptions(options: L.Control.DrawConstructorOptions) {

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
	}
}
