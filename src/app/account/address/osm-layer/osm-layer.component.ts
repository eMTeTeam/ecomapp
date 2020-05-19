import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { marker } from "leaflet";
import * as leaflet from "leaflet";

@Component({
  selector: "app-osm-layer",
  templateUrl: "./osm-layer.component.html",
  styleUrls: ["./osm-layer.component.scss"]
})
export class OsmLayerComponent implements OnInit {
  map: any;
  newMarker: any;

  constructor(public modalController: ModalController) {}
  ngOnInit(): void {}

  ionViewDidEnter() {
    this.loadMap();
  }
  confirmLocation() {
    let latLong = this.newMarker.getLatLng();
    console.log(latLong);
    this.modalController.dismiss(latLong);
  }

  loadMap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet
      .tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attributions:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
      })
      .addTo(this.map);
    this.map
      .locate({
        setView: true,
        maxZoom: 15
      })
      .on("locationfound", e => {
        this.newMarker = marker([e.latitude, e.longitude], {
          draggable: true
        }).addTo(this.map);
        this.newMarker.bindPopup("You are located here!").openPopup();
      })
      .on("locationerror", err => {
        alert(err.message);
      });
  }
}
