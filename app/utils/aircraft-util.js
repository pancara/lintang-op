export default  {

  setAircraftMainImage(aircraft) {
    for (var j = 0; j < aircraft.images.length; j++) {
      let image = aircraft.images[j];
      if (image.isMainImage) {
        aircraft.mainImage = image;
        break;
      }
    }
  }

};
