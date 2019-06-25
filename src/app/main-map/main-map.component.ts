import { ImagesService } from './../images/images.service';
import { Image } from '../images/image.model';

import { Component, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, Input, Output } from '@angular/core';
import {Subscription} from 'rxjs';

// tslint:disable-next-line:max-line-length
import {

  StreetViewControlOptions,
  ZoomControlOptions,
  MapTypeStyle,
  LatLngBoundsLiteral,
  LatLngBounds,
  ScaleControlOptions,
  MapTypeControlOptions,
  PanControlOptions,
  RotateControlOptions,
  FullscreenControlOptions,
  LatLng,
  LatLngLiteral,
  MapTypeId

   } from '@agm/core/services/google-maps-types';


import {MouseEvent} from '@agm/core/map-types';
import {GoogleMapsAPIWrapper} from '@agm/core/services/google-maps-api-wrapper';
import {InfoWindowManager} from '@agm/core/services/managers/info-window-manager';
import {MarkerManager} from '@agm/core/services/managers/marker-manager';
import {FitBoundsService} from '@agm/core/services/fit-bounds';

// import {CircleManager} from '@agm/core/services/managers/circle-manager';
// import {RectangleManager} from '@agm/core/services/managers/rectangle-manager';
// import {PolygonManager} from '@agm/core/services/managers/polygon-manager';
// import {PolylineManager} from '@agm/core/services/managers/polyline-manager';
// import {KmlLayerManager} from '@agm/core/services/managers/kml-layer-manager';
// import {DataLayerManager} from '@agm/core/services/managers/data-layer-manager';

declare var google: any;



@Component({
  selector: 'app-main-map',
  providers: [
    GoogleMapsAPIWrapper, MarkerManager, InfoWindowManager, FitBoundsService,
    // CircleManager, RectangleManager, PolylineManager, PolygonManager, KmlLayerManager, DataLayerManager
  ],
  //  host: {
  //   // todo: deprecated - we will remove it with the next version
  //   '[class.sebm-google-map-container]': 'true'
  // },
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit, OnChanges, OnDestroy {


  title = 'Tryypio Main Map';
  locationChosen = false;
  isLoading = false;
  images: Image[] = [];
  location: Object;
  // iconUrl = 'http://maps.google.com/mapfiles/kml/shapes/square_16px.png';
  iconUrl = 'http://localhost:3000/images/square_16px.png';
  marker: Marker;
  markers: Marker[];

  // InfoWindow params
  maxHeight = '400px';
  maxWidth = '400px';
  openOnMarkerClick = true;
  closeWhenOthersOpen = true;
  closeOnMapClick = true;
  showCloseButton = false;
  panOnOpen = false;
  pointer = '20px';
  placement = top;

  // thailand - krabi beach
  @Input() lat = 8.106433;
  @Input() lng = 98.700729;

  @Input() zoom = 8;
  @Input() minZoom: number;
  @Input() maxZoom: number;
  @Input('mapDraggable') draggable: boolean = true;
  @Input() disableDoubleClickZoom: boolean = false;
  @Input() disableDefaultUI: boolean = false;
  @Input() scrollwheel: boolean = true;
  @Input() backgroundColor: string;
  @Input() draggableCursor: string;
  @Input() draggingCursor: string;
  @Input() keyboardShortcuts: boolean = true;
  @Input() zoomControl: boolean = true;
  @Input() zoomControlOptions: ZoomControlOptions;
  @Input() styles: MapTypeStyle[] = [];
  @Input() usePanning: boolean = true;
  @Input() streetViewControl: boolean = true;
  @Input() streetViewControlOptions: StreetViewControlOptions;
  @Input() fitBounds: LatLngBoundsLiteral|LatLngBounds|boolean = false;
  @Input() scaleControl: boolean = true;
  @Input() scaleControlOptions: ScaleControlOptions;
  @Input() mapTypeControl = true;
  @Input() mapTypeControlOptions: MapTypeControlOptions;
  @Input() panControl = true;
  @Input() panControlOptions: PanControlOptions;
  @Input() rotateControl: boolean = true;
  @Input() rotateControlOptions: RotateControlOptions;
  @Input() fullscreenControl: boolean  = true;
  @Input() fullscreenControlOptions: FullscreenControlOptions;
  @Input() mapTypeId: 'roadmap'|'hybrid'|'satellite'|'terrain'|string = 'terrain';
  // mapTypeId = 'terrain';
  @Input() clickableIcons: boolean = true;
   @Input() gestureHandling: 'cooperative'|'greedy'|'none'|'auto' = 'auto';

  private _observableSubscriptions: Subscription[] = [];
  private _fitBoundsSubscription: Subscription;
  private imagesSub: Subscription;

  // emitted when the user clicks on the map (but not when they click on a marker or infoWindow).
  @Output() mapClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  // emitted when the user right-clicks on the map (but not when they click on a marker or infoWindow).
  @Output() mapRightClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  // emitted when the user double-clicks on the map (but not when they click on a marker or infoWindow).
  @Output() mapDblClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  // fired when the map center changes.
  @Output() centerChange: EventEmitter<LatLngLiteral> = new EventEmitter<LatLngLiteral>();

  //  fired when the viewport bounds have changed.
  @Output() boundsChange: EventEmitter<LatLngBounds> = new EventEmitter<LatLngBounds>();

  //  fired when the mapTypeId property changes.
  @Output() mapTypeIdChange: EventEmitter<MapTypeId> = new EventEmitter<MapTypeId>();

  // fired when the map becomes idle after panning or zooming.
  @Output() idle: EventEmitter<void> = new EventEmitter<void>();

  //  fired when the zoom level has changed.
   @Output() zoomChange: EventEmitter<number> = new EventEmitter<number>();

  //  fired when the google map is fully initialized.
  //  You get the google.maps.Map instance as a result of this EventEmitter.

  @Output() mapReady: EventEmitter<any> = new EventEmitter<any>();



  // tslint:disable-next-line:max-line-length
  constructor(private imagesService: ImagesService, private _elem: ElementRef, private _mapsWrapper: GoogleMapsAPIWrapper, protected _fitBoundsService: FitBoundsService) {}

  ngOnInit() {

    this.isLoading = true;

    this.imagesService.getAllImages();

    this.imagesSub = this.imagesService
      .getAllImagesUpdateListener()

      .subscribe((imageData: {images: Image[]}) => {
        // console.log('260 m-m.c.ts ngOnInit imageData = ', imageData );
        this.isLoading = false;
        this.images = imageData.images;
        // console.log('264 m-m.c.ts this.images = ', this.images );
        this.createMarkers(this.images);
      });

  }

  // createMarkers(images) {
  //   for (let i = 0; i < images.length; i++) {
  //     var marker = new GoogleMapsMarker

  //     this.markers.push(marker);
  //   }

  // }

  createMarkers(images) {
    for (let i = 0; i < images.length; i++ ) {

      var newMarker = {
        name: images[i].title,
        lat: images[i].lat,
        lng: images[i].lng,
        draggable: false
      };
      this.markers.push(newMarker);
    }
  }

  mapClicked($event: any) {
    var newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    };
    this.markers.push(newMarker);
  }

  markerDragEnd(marker: any, $event: any) {
    console.log('Drag End ', marker, $event);

    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    };
    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;
  }

  markerClicked(marker: Marker, index: number) {
    console.log('Clicked marker: ' + marker.name + ' at index ' + index);
  }

  onChoseLocation(event) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;

    // allows display of marker when true
    this.locationChosen = true;
  }

  ngOnDestroy() {
    console.log('');

  }

    /* @internal */
  ngOnChanges(changes: SimpleChanges) {
    console.log('');
  }


}

interface Marker {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
