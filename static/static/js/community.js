

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


var modals = document.getElementsByClassName("post-modal-container");// 모달창 띄우는 자바스크립트 시작
 
var btns = document.getElementsByClassName("post-upload-button"); // Modal을 띄우는 클래스 이름을 가져옵니다.

var spanes = document.getElementsByClassName("post-modal-close");  // Modal을 닫는 close 클래스를 가져옵니다.
var funcs = [];


function Modal(num) {  // Modal을 띄우고 닫는 클릭 이벤트를 정의한 함수
    return function () {
        // 해당 클래스의 내용을 클릭하면 Modal을 띄웁니다.
        btns[num].onclick = function () {
            modals[num].style.display = "block";
            console.log(num);
        };

        // <span> 태그(X 버튼)를 클릭하면 Modal이 닫습니다.
        spanes[num].onclick = function () {
            modals[num].style.display = "none";
        };
    };
}

// 원하는 Modal 수만큼 Modal 함수를 호출해서 funcs 함수에 정의합니다.
for (var i = 0; i < btns.length; i++) {
    funcs[i] = Modal(i);
}

// 원하는 Modal 수만큼 funcs 함수를 호출합니다.
for (var j = 0; j < btns.length; j++) {
    funcs[j]();
}

// Modal 영역 밖을 클릭하면 Modal을 닫습니다.
window.onclick = function (event) {
    if (event.target.className == "post-modal-container") {
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