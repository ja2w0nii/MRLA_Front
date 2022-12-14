if (!token) {
    window.location.replace(`${frontend_base_url}/signin_signup.html`);
}

// 프로필 드롭다운 가져오기
async function ProfileInfo() {
    login_user = await getName();

    const profile_img_box = document.getElementById("profile_img_box");
    let newImage = document.createElement("img");
    newImage.setAttribute("id", login_user.id)
    newImage.setAttribute("class", "profile_img")
    newImage.src = `${backend_base_url}${login_user.profile_img}`;
    profile_img_box.appendChild(newImage);

    const profile_name_box = document.getElementById("profile_name_box");
    const newNickname = document.createElement("a")
    newNickname.setAttribute("id", login_user.id)
    newNickname.setAttribute("class", "nav-link dropdown-toggle")
    newNickname.setAttribute("href", "#")
    newNickname.setAttribute("role", "button")
    newNickname.setAttribute("data-bs-toggle", "dropdown")
    newNickname.setAttribute("aria-expanded", "false")
    newNickname.innerText = login_user.nickname
    profile_name_box.appendChild(newNickname)

    const profile_dropdown = document.getElementById("profile_dropdown")
    const newItem = document.createElement("li")
    newItem.setAttribute("class", "dropdown-item-box")
    profile_dropdown.appendChild(newItem)

    const newItem_a = document.createElement("a")
    newItem_a.setAttribute("id", login_user.id)
    newItem_a.setAttribute("class", "dropdown-item")
    newItem_a.setAttribute("onclick", "getProfilePage(this.id)")
    newItem_a.innerText = "My 프로필"
    newItem.appendChild(newItem_a)

    const newItem2 = document.createElement("li")
    newItem2.setAttribute("class", "dropdown-item-box")
    profile_dropdown.appendChild(newItem2)

    const newItem_a2 = document.createElement("a")
    newItem_a2.setAttribute("id", login_user.id)
    newItem_a2.setAttribute("class", "dropdown-item")
    newItem_a2.innerText = "로그아웃"
    newItem2.appendChild(newItem_a2)
}
ProfileInfo()

// 마커를 클릭했을 때 해당 장소의 상세 정보를 보여줄 커스텀 오버레이
var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
  contentNode = document.createElement("div"), // 커스텀 오버레이의 컨텐츠 엘리먼트
  markers = [], // 마커를 담을 배열입니다
  currCategory = ""; // 현재 선택된 카테고리를 가지고 있을 변수

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

// 지도를 생성
var map = new kakao.maps.Map(mapContainer, mapOption);

// 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// HTML5의 geolocation으로 사용할 수 있는지 확인
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude, // 위도
      lon = position.coords.longitude; // 경도

    var locPosition = new kakao.maps.LatLng(lat, lon),
      message = '<div style="padding:5px;">여기에 계신가요?</div>';

    // 마커와 인포윈도우를 표시
    displayMarker(locPosition, message);
  });
} else {
  // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용 설정
  var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
    message = "위치를 확인할 수 없습니다.";

  displayMarker(locPosition, message);
}

// 지도에 마커와 인포윈도우를 표시하는 함수
function displayMarker(locPosition, message) {
  // 마커 생성
  var marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  // 인포윈도우에 표시할 내용
  // var iwContent = message,
  //   iwRemoveable = true;

  // // 인포윈도우 생성
  // var infowindow = new kakao.maps.InfoWindow({
  //   content: iwContent,
  //   removable: iwRemoveable,
  // });

  // // 인포윈도우를 마커위에 표시
  // infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경
  map.setCenter(locPosition);
}

// 장소 검색 객체를 생성
var ps = new kakao.maps.services.Places(map);

// 지도에 idle 이벤트를 등록
kakao.maps.event.addListener(map, "idle", searchPlaces);

// 커스텀 오버레이의 컨텐츠 노드에 css class를 추가
contentNode.className = "placeinfo_wrap";

// 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을 때
// 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드 등록
addEventHandle(contentNode, "mousedown", kakao.maps.event.preventMap);
addEventHandle(contentNode, "touchstart", kakao.maps.event.preventMap);

// 커스텀 오버레이 컨텐츠 설정
placeOverlay.setContent(contentNode);

// 각 카테고리에 클릭 이벤트를 등록
addCategoryClickEvent();

// 엘리먼트에 이벤트 핸들러를 등록하는 함수
function addEventHandle(target, type, callback) {
  if (target.addEventListener) {
    target.addEventListener(type, callback);
  } else {
    target.attachEvent("on" + type, callback);
  }
}

// 카테고리 검색을 요청하는 함수
function searchPlaces() {
  if (!currCategory) {
    return;
  }
  // 커스텀 오버레이를 숨깁니다
  placeOverlay.setMap(null);
  // 지도에 표시되고 있는 마커 제거
  removeMarker();

  ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
}

// 장소검색이 완료됐을 때 호출되는 콜백함수
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    displayPlaces(data);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    pass;
  } else if (status === kakao.maps.services.Status.ERROR) {
    pass;
  }
}

// 지도에 마커를 표출하는 함수
function displayPlaces(places) {
  // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
  var order = document.getElementById(currCategory).getAttribute("data-order");

  for (var i = 0; i < places.length; i++) {
    // 마커를 생성하고 지도에 표시
    var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

    // 마커와 검색결과 항목을 클릭 했을 때 장소정보를 표출하도록 클릭 이벤트 등록
    (function (marker, place) {
      kakao.maps.event.addListener(marker, "click", function () {
        displayPlaceInfo(place);
      });
    })(marker, places[i]);
  }
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수
function addMarker(position, order) {
  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png",
    imageSize = new kakao.maps.Size(27, 28),
    imgOptions = {
      spriteSize: new kakao.maps.Size(72, 208),
      spriteOrigin: new kakao.maps.Point(46, order * 36),
      offset: new kakao.maps.Point(11, 28),
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    marker = new kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

  marker.setMap(map);
  markers.push(marker);

  return marker;
}

// 지도 위에 표시되고 있는 마커 모두 제거
function removeMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수
function displayPlaceInfo(place) {
  var content =
    '<div class="placeinfo">' +
    '<a class="title" href="' +
    place.place_url +
    '" target="_blank" title="' +
    place.place_name +
    '">' +
    place.place_name +
    "</a>";

  if (place.road_address_name) {
    content +=
      '<span title="' +
      place.road_address_name +
      '">' +
      place.road_address_name +
      "</span>" +
      '<span class="jibun" title="' +
      place.address_name +
      '">(지번 : ' +
      place.address_name +
      ")</span>";
  } else {
    content += '<span title="' + place.address_name + '">' + place.address_name + "</span>";
  }

  content += '<span class="tel">' + place.phone + "</span>" + "</div>" + '<div class="after"></div>';

  contentNode.innerHTML = content;
  placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
  placeOverlay.setMap(map);
}

// 각 카테고리에 클릭 이벤트 등록
function addCategoryClickEvent() {
  var category = document.getElementById("category"),
    children = category.children;

  for (var i = 0; i < children.length; i++) {
    children[i].onclick = onClickCategory;
  }
}

// 카테고리를 클릭했을 때 호출되는 함수
function onClickCategory() {
  var id = this.id,
    className = this.className;

  placeOverlay.setMap(null);

  if (className === "on") {
    currCategory = "";
    changeCategoryClass();
    removeMarker();
  } else {
    currCategory = id;
    changeCategoryClass(this);
    searchPlaces();
  }
}

// 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수
function changeCategoryClass(el) {
  var category = document.getElementById("category"),
    children = category.children,
    i;

  for (i = 0; i < children.length; i++) {
    children[i].className = "";
  }

  if (el) {
    el.className = "on";
  }
}
