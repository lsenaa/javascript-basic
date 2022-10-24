const lowerFolder = document.querySelectorAll(".lower-folder");
if (lowerFolder) {
  lowerFolder.forEach((n) => {
    n.style.display = "none";
  });
}

// ! 위의 코드는 참고만 하시고 수정하지 마세요 ! //

// index.html에는 화면에 보여질 폴더 구조가 이미 완성되어 있으나, click 이벤트와 관련한 기능이 완성되지 않았습니다.
// 브라우저에 보이는 폴더 아이콘 혹은 폴더명을 클릭했을 때, 하위에 존재하는 파일과 폴더가 보여지도록
// index.html 파일을 참고하여 folderList 내부에 있는 각각의 html 태그에 click event를 추가해주세요.

/*
 * "isOpen" class를 지닌 태그는 열린 폴더 아이콘이 적용됩니다.
 * "isOpen" class를 지니지 않은 태그는 닫힌 폴더 아이콘이 적용됩니다.
 * style.display 속성이 "block"인 태그는 화면에 보여집니다.
 * style.display 속성이 "none"인 태그는 화면에서 사라집니다.
 */

// @ addEventListner()를 사용하면 화살표 함수[ () => {} ]의 매개변수로 event를 받아올 수 있습니다.
// @ 해당 event 안에 존재하는 target, 그리고 DOM 요소 선택자에 대해 알아보세요. (부모 노드를 선택하는 방법이 존재합니다!)
// @ click 이벤트를 통해 isOpen class 속성을 추가 혹은 제거해야 하는 태그와 그 방법,
// @ display 속성을 "none" 혹은 "block"으로 변경하는 방법에 대해 잘 생각해 보세요.
// @ "isOpen" class는 'toggle'이라는 class 명을 가진 태그에 추가, 삭제 되어야 합니다.
// @ display 속성은 'lower-folder'라는 class 명을 가진 태그에서 변경되어야 합니다.

const folderList = document.querySelectorAll(".folder");
const completeFolderTree = function (folderList) {
  for (let i = 0; i < folderList.length; i++) {
    folderList[i].addEventListener("click", (event) => {
      // 여기에서 작업하세요.
      // console.log(event.target);
      // console.log(event.target.parentNode);
      // console.log(event.target.parentNode.querySelector(".lower-folder"));

      const isOpenFolder = event.target.parentNode;
      const toggleFolder =
        event.target.parentNode.querySelector(".lower-folder");

      isOpenFolder.addEventListener("click", () => {
        isOpenFolder.classList.add("isOpen");
        toggleFolder.style.display = "block";
      });
    });
  }
};
completeFolderTree(folderList);

// 구현에 성공했다면 advanced 과제에 도전해 보세요!
