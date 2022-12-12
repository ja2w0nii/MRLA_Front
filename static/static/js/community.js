

// 전체 페이지 로딩이 완료될 때까지 기다림====================================================221207 이태은
window.addEventListener('load', function() {
	
	// 실제 페이지 로드의 지연을 시뮬레이트하기 위한 setTimeout
	setTimeout(lazyLoad, 1000);
	
});

function lazyLoad() {
	var card_images = document.querySelectorAll('.card-image');
	
	// 각 카드 이미지를 반복
	card_images.forEach(function(card_image) {
		var image_url = card_image.getAttribute('data-image-full');
		var content_image = card_image.querySelector('img');
		
		// 콘텐츠 이미지의 src를 변경하여 새로운 고해상도 사진을 로드
		content_image.src = image_url;
		
		// 새 사진 로드가 완료되면 로드 이벤트를 수신
		content_image.addEventListener('load', function() {
			// 보이는 배경 이미지를 완전히 다운로드된 새 사진으로 교체
			card_image.style.backgroundImage = 'url(' + image_url + ')';
			// 흐림 필터를 제거하는 클래스를 추가하여 이미지 변경을 부드럽게 전환
			card_image.className = card_image.className + ' is-loaded';
		});
		
	});
	
}



// 모달창 관련=============================================================== 221208 이태은

//  업로드 영역 모달창 시작====================================


var upload_modals = document.getElementsByClassName("post-upload-modal-container");// 모달창 띄우는 자바스크립트 시작
 
var upload_btns = document.getElementsByClassName("post-upload-button"); // Modal을 띄우는 클래스 이름을 가져옵니다.

var upload_spanes = document.getElementsByClassName("post-upload-modal-close");  // Modal을 닫는 close 클래스를 가져옵니다.
var upload_funcs = [];


function Modal(num) {  // Modal을 띄우고 닫는 클릭 이벤트를 정의한 함수
    return function () {
        // 해당 클래스의 내용을 클릭하면 Modal을 띄웁니다.
        upload_btns[num].onclick = function () {
            upload_modals[num].style.display = "block";
            console.log(num);
        };

        // <span> 태그(X 버튼)를 클릭하면 Modal이 닫습니다.
        upload_spanes[num].onclick = function () {
            upload_modals[num].style.display = "none";
        };
    };
}

// 원하는 Modal 수만큼 Modal 함수를 호출해서 funcs 함수에 정의합니다.
for (var i = 0; i < upload_btns.length; i++) {
    upload_funcs[i] = Modal(i);
}

// 원하는 Modal 수만큼 funcs 함수를 호출합니다.
for (var j = 0; j < upload_btns.length; j++) {
    upload_funcs[j]();
}

// Modal 영역 밖을 클릭하면 Modal을 닫습니다.
window.onclick = function (event) {
    if (event.target.className == "post-upload-modal-container") {
        event.target.style.display = "none";
    }
};




// 게시물 작성 모달창에서의 이미지 미리보기 스크립트 221208 이태은
const fileDOM = document.querySelector('#file');
const previews = document.querySelectorAll('.image-box');

fileDOM.addEventListener('change', () => {
  const reader = new FileReader();
  reader.onload = ({ target }) => {
    // 이미지 미리보기 출력
    previews[0].src = target.result;
  };
  reader.readAsDataURL(fileDOM.files[0]);
});

// 텍스트 수 제한 textarea
$('.text_box textarea').keyup(function(){
    var content = $(this).val();
    $('.text_box .count span').html(content.length);
    if (content.length > 200){
      alert("최대 200자까지 입력 가능합니다.");
      $(this).val(content.substring(0, 200));
      $('.text_box .count span').html(200);
    }
  });


//   태그 관련 스트립트 ============================================== 221211 이태은
$(document)
.ready(function () {
  var tag = {};
  var counter = 0;

  // 태그를 추가한다.
  function addTag(value) {
    tag[counter] = value; // 태그를 Object 안에 추가
    counter++; // counter 증가 삭제를 위한 del-btn 의 고유 id 가 된다.
  }
 
  // 최종적으로 서버에 넘길때 tag 안에 있는 값을 array type 으로 만들어서 넘긴다.
  function marginTag() {
    return Object.values(tag)
      .filter(function (word) {
        return word !== "";
      });
  }

  $("#tag")
    .on("keyup", function (e) {

      var self = $(this);
      console.log("keypress");

      // input 에 focus 되있을 때 엔터 및 스페이스바 입력시 구동
      if (e.key === "Enter" || e.keyCode == 32) {

        var tagValue = self.val(); // 값 가져오기

        // 값이 없으면 동작 안합니다.
        if (tagValue !== "") {

          // 같은 태그가 있는지 검사한다. 있다면 해당값이 array 로 return 된다.
          var result = Object.values(tag)
            .filter(function (word) {
              return word === tagValue;
            })

          // 태그 중복 검사
          if (result.length == 0) {
            $("#tag-list")
              .append("<li class='tag-item'>" + tagValue + "<span class='del-btn' idx='" + counter + "'>x</span></li>");
            addTag(tagValue);
            self.val("");
          } else {
            alert("태그값이 중복됩니다.");
          }
        }
        e.preventDefault(); // SpaceBar 시 빈공간이 생기지 않도록 방지
      }
    });

  // 삭제 버튼
  // 삭제 버튼은 비동기적 생성이므로 document 최초 생성시가 아닌 검색을 통해 이벤트를 구현시킨다.
  $(document)
    .on("click", ".del-btn", function (e) {
      var index = $(this)
        .attr("idx");
      tag[index] = "";
      $(this)
        .parent()
        .remove();
    });
})
// 업로드 모달창 끝==========================================================================================================================


// 게시물 상세보기 모달창 관련====================================================================================================================221212이태은

var detail_modals = document.getElementsByClassName("post-detail-modal-container");// 모달창 띄우는 자바스크립트 시작
 
var detail_btns = document.getElementsByClassName("card"); // Modal을 띄우는 클래스 이름을 가져옵니다.

var detail_spanes = document.getElementsByClassName("post-detail-modal-close");  // Modal을 닫는 close 클래스를 가져옵니다.
var detail_funcs = [];


function DetailModal(num) {  // Modal을 띄우고 닫는 클릭 이벤트를 정의한 함수
    return function () {
        // 해당 클래스의 내용을 클릭하면 Modal을 띄웁니다.
        detail_btns[num].onclick = function () {
            detail_modals[num].style.display = "block";
            console.log(num);
        };

        // <span> 태그(X 버튼)를 클릭하면 Modal이 닫습니다.
        detail_spanes[num].onclick = function () {
            detail_modals[num].style.display = "none";
        };
    };
}

// 원하는 Modal 수만큼 Modal 함수를 호출해서 funcs 함수에 정의합니다.
for (var i = 0; i < detail_btns.length; i++) {
    detail_funcs[i] = DetailModal(i);
}

// 원하는 Modal 수만큼 funcs 함수를 호출합니다.
for (var j = 0; j < detail_btns.length; j++) {
    detail_funcs[j]();
}

// Modal 영역 밖을 클릭하면 Modal을 닫습니다.
window.onclick = function (event) {
    if (event.target.className == "post-detail-modal-container") {
        event.target.style.display = "none";
    }
};
