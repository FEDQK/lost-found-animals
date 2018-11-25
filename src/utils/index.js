function getNewPositionMarker(positionMarker) {
  return {
    lat: () => positionMarker.lat,
    lng: () => positionMarker.lng,
  };
}

function checkTypePositionMarker(positionMarker) {
  return (
    typeof positionMarker.lat === 'function' &&
    typeof positionMarker.lng === 'function'
  );
}

function getDistanceBetween(gmapApi, positionA, positionB) {
  return gmapApi.maps.geometry.spherical.computeDistanceBetween(
    checkTypePositionMarker(positionA)
      ? positionA
      : getNewPositionMarker(positionA),
    checkTypePositionMarker(positionB)
      ? positionB
      : getNewPositionMarker(positionB),
  );
}

function checkIncludesMarkerInRadius(gmapApi, positionA, positionB, radius) {
  return (
    getDistanceBetween(gmapApi, positionA, positionB) / 1000 <= Number(radius)
  );
}

function compareDateCreate(a, b) {
  if (new Date(a.dateCreate) > new Date(b.dateCreate)) {
    return -1;
  }
  if (new Date(a.dateCreate) < new Date(b.dateCreate)) {
    return 1;
  }
  return 0;
}

export default { checkIncludesMarkerInRadius, compareDateCreate };
